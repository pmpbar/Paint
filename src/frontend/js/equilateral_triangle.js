function EquilateralTriangle(x,y,v) {
  a = (2*v)/atan(PI/3);
  return triangle(x, y-v/2,x-a,y+v/2,x+a,y+(v/2));
}


