function Toolbar() {
  this.x = 0;
  this.y = 0;
  this.w = 40;
  //this.selectedTool = SQUARE;
  //this.selectedTool = TRIANGLE;
  this.selectedTool = CIRCLE;
  this.selectedColor = 255;

  function equilTriangle(x,y,v) {
    xlen = (v*2)/sqrt(3);
    triangle(x, y-(v/2),
      x-(xlen/2), y+(v/2),
      x+(xlen/2), y+(v/2));
  }

  const shapeTool = new ShapeTool();
  this.show = function() {
    fill(100);
    noStroke();
    strokeWeight(1);
    rect(this.x,this.y,this.w,height);
    shapeTool.show();

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
