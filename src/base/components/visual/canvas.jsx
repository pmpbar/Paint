import React, { Component } from 'react';
import p5 from 'p5';

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.drawing = [];
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
      };

      p.draw = this.draw;
    }, this.wrapper);
  }

  draw = () => {
    if (this.isDrawing) {
      const point = {
        x: this.p5.mouseX,
        y: this.p5.mouseY,
      };
      this.currentPath.push(point);
    }
    this.p5.stroke(0);
    this.p5.strokeWeight(4);
    this.p5.noFill();
    for (let i = 0; i < this.drawing.length; i += 1) {
      const path = this.drawing[i];
      this.p5.beginShape();
      for (let j = 0; j < path.length; j += 1) {
        this.p5.vertex(path[j].x, path[j].y);
      }
      this.p5.endShape();
    }
  }

  startPath = () => {
    this.isDrawing = true;
    this.currentPath = [];
    this.drawing.push(this.currentPath);
  }

  endPath = () => {
    this.isDrawing = false;
  }

  render() {
    return <div ref={(wrapper) => { this.wrapper = wrapper; }} />;
  }
}
