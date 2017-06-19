function ShapeTool() {
  this.x = 0;
  this.y = 0;
  this.w = 40;
  this.selectedTool = TRIANGLE;
  this.selectedColor = 255;
  function equilTriangle(x,y,v) {
    xlen = (v*2)/sqrt(3);
    triangle(x, y-(v/2),
      x-(xlen/2), y+(v/2),
      x+(xlen/2), y+(v/2));
  }


  this.show = function() {
    // Set rectMode to CENTER
    rectMode(CENTER);
    fill(0,0,255);
    stroke(0);
    ellipse(this.w/2, 30,this.w/3,this.w/3);
    rect(this.w/2, 60,this.w/3,this.w/3);
    //triangle(this.w/2, 90,this.w/3,105,this.w*2/3,105);
    equilTriangle(this.w/2, 90,15);
    // Set rectMode to CORNER
    rectMode(CORNER);

  }

  this.checkForToolChange = function(mX,mY) {
    if(true){
    }
  }

  this.useTool = function(x,y) {
    fill(this.selectedColor);
    switch(this.selectedTool) {
      case CIRCLE:
        ellipse(x, y, 80, 80);
        break;
      case SQUARE:
        // Set rectMode to CENTER
        rectMode(CENTER);
        rect(x, y, 80, 80);
        // Set rectMode to CORNER
        rectMode(CORNER);
        break;
      case TRIANGLE:
        equilTriangle(x, y, 40);
        break;
    }
  }
}

