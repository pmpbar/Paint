import React, { Component } from 'react';
import p5 from 'p5';
import { actionValidator, toolValidator, dSCValidator } from 'base/redux/validators';

export default class Canvas extends Component {
  static propTypes = {
    tool: toolValidator.isRequired,
    drawStackCmd: dSCValidator.isRequired,
    setDrawStackCmd: actionValidator.isRequired,
  }
  constructor(props) {
    super(props);

    this.drawing = [];
    this.history = [];
    this.currentPath = [];
    this.isDrawing = false;
  }

  componentDidMount() {
    this.canvasProps = {
      rotation: 0,
    };

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
            default:
              break;
          }
        }
        this.p5.stroke(0);
        this.p5.strokeWeight(4);
        this.p5.noFill();
        for (let i = 0; i < this.drawing.length; i += 1) {
          const path = this.drawing[i];
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.drawStackCmd !== this.props.drawStackCmd) {
      this.executeDSC(nextProps.drawStackCmd);
    }
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

  startPath = () => {
    this.isDrawing = true;
    const { tool } = this.props;
    this.currentPath = {
      type: tool,
      data: [],
    };
    this.drawing.push(this.currentPath);
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
    this.props.setDrawStackCmd('');
  }

  render() {
    return <div ref={(wrapper) => { this.wrapper = wrapper; }} />;
  }
}
