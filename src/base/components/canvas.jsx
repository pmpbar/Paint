import React, { Component } from 'react';
import p5 from 'p5';
import { actionValidator, toolValidator, colorValidator } from 'base/redux/validators';

export default class Canvas extends Component {
  static propTypes = {
    tool: toolValidator.isRequired,
    stroke: colorValidator.isRequired,
    fill: colorValidator.isRequired,
    setTool: actionValidator.isRequired,
    setIPC: actionValidator.isRequired,
  }
  constructor(props) {
    super(props);

    this.drawing = [];
    this.history = [];
    this.currentPath = [];
    this.isDrawing = false;
  }

  componentDidMount() {
    const { ipcRenderer } = window.require('electron');
    this.handleOSEvents(ipcRenderer);
    this.props.setIPC(ipcRenderer);

    /* document.addEventListener('pointerlockchange', (e) => {
      console.log(e);
    }, false); */

    this.p5 = new p5((p) => {
      p.setup = () => {
        this.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        this.canvas.mousePressed(this.startPath);
        this.canvas.mouseReleased(this.endPath);

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };
      p.draw = () => {
        this.p5.background(255);
        if (this.isDrawing) {
          const { tool } = this.props;
          switch (tool) {
            case 'line':
              this.drawLine();
              break;
            case 'circle':
              this.drawCircle();
              break;
            case 'rectangle':
              this.drawRectangle();
              break;
            default:
              break;
          }
        }
        this.p5.strokeWeight(4);
        for (let i = 0; i < this.drawing.length; i += 1) {
          const path = this.drawing[i];
          this.p5.stroke(path.stroke);
          this.p5.noFill();
          if (path.fill) {
            this.p5.fill(path.fill);
          }
          this.p5.beginShape();
          switch (path.type) {
            case 'line':
              for (let j = 0; j < path.data.length; j += 1) {
                this.p5.vertex(path.data[j].x, path.data[j].y);
              }
              break;
            case 'circle':
              const { x, y, r1, r2 } = path.data;
              this.p5.ellipse(x, y, r1, r2);
              break;
            default:
              break;
          }
          this.p5.endShape();
        }
      };
    }, this.wrapper);
  }

  drawLine = () => {
    const point = {
      x: this.p5.mouseX,
      y: this.p5.mouseY,
    };
    if (this.currentPath.data.length < 2) {
      this.currentPath.data.push(point);
    } else {
      const lastPoint = this.currentPath.data[this.currentPath.data.length - 1];
      if ((point.x !== lastPoint.x) || (point.y !== lastPoint.y)) {
        this.currentPath.data.push(point);
      }
    }
  }
  drawCircle = () => {
    if (this.currentPath.data.x) {
      const origin = { x: this.currentPath.data.x, y: this.currentPath.data.y };
      const x = this.p5.mouseX;
      const y = this.p5.mouseY;
      const radius = Math.sqrt(((origin.x - x) ** 2) + ((origin.y - y) ** 2));
      this.currentPath.data.r1 = radius;
      this.currentPath.data.r2 = radius;
    } else {
      this.currentPath.data = {
        x: this.p5.mouseX,
        y: this.p5.mouseY,
        r1: 1,
        r2: 1,
      };
    }
  }
  drawRectangle = () => {
    if (this.currentPath.data.x) {
      const origin = { x: this.currentPath.data.x, y: this.currentPath.data.y };
      const x = this.p5.mouseX;
      const y = this.p5.mouseY;
      const radius = Math.sqrt(((origin.x - x) ** 2) + ((origin.y - y) ** 2));
      this.currentPath.data.r1 = radius;
      this.currentPath.data.r2 = radius;
    } else {
      this.currentPath.data = {
        x: this.p5.mouseX,
        y: this.p5.mouseY,
        r1: 1,
        r2: 1,
      };
    }
  }

  startPath = () => {
    this.isDrawing = true;
    const { tool, stroke, fill } = this.props;
    this.currentPath = {
      type: tool,
      data: [],
      stroke,
      fill,
    };
    this.drawing.push(this.currentPath);
    // this.wrapper.requestPointerLock();
    // document.exitPointerLock();
  }

  endPath = () => {
    this.isDrawing = false;
  }

  executeDSC = (cmd) => {
    let tmp;
    switch (cmd) {
      case 'undo':
        if (this.drawing.length > 0) {
          tmp = this.drawing.pop();
          this.history.push(tmp);
        }
        break;
      case 'redo':
        if (this.history.length > 0) {
          tmp = this.history.pop();
          this.drawing.push(tmp);
        }
        break;
      default:
        break;
    }
  }

  handleOSEvents = (ipc) => {
    ipc.on('redux-sync', (e, update) => {
      console.log(update);
      if (update.cmd === 'setStroke') {
        this.props.setStroke(update.data);
      }
    });
    ipc.on('change-tool', (e, tool) => {
      this.props.setTool(tool);
    });
    ipc.on('draw-stack-cmd', (e, cmd) => {
      this.executeDSC(cmd);
    });
    ipc.on('file-cmd', (e, req) => {
      switch (req.cmd) {
        case 'new':
          document.title = `Paint - Untitled`;
          this.drawing = [];
          this.history = [];
          break;
        case 'save':
          ipc.send('file-cmd-res', {
            cmd: req.cmd,
            file: req.file,
            data: {
              drawing: this.drawing,
              history: this.history,
            },
          });
          break;
        case 'open':
          document.title = `Paint - ${req.file.split('.')[0]}`;
          this.drawing = req.data.drawing;
          this.history = req.data.history;
          break;
        case 'export':
          this.p5.save();
          break;
        default:
          break;
      }
    });
  }

  render() {
    return <div className="canvas" ref={(wrapper) => { this.wrapper = wrapper; }} />;
  }
}
