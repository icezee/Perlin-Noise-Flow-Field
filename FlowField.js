var inc = 0.1; // The rate of increase (used by variables in draw())
var scl = 40; // How many flow fields in terms of width/height (Play with #)
var cols, rows; // Defines in setup()
var zoff = 0; //Used the update the flow field by the fps (overlaps previous flow field)
var Blackparticles = [];
var Whiteparticles = [];
var flowfield;

function setup() {
  createCanvas(1280, 720);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (var w = 0; w < 500; w++) { // w < # Is the amount of white particles
    Whiteparticles[w] = new WhiteParticle();
  }
  for (var b = 0; b < 500; b++) { // b < # Is the amount of black particles
    Blackparticles[b] = new BlackParticle();
  }

  background(255); // Background color
  fill(0);
  rect(0,0, width, height/2);
}


function draw() {
  var yoff = 0;

  for (var y = 0; y < rows; y++) { //Creates flow field along the Y-axis (1 Row)
    var xoff = 0;
    for (var x = 0; x < cols; x++) { //Loops the flow field along the X-axis covering the screen
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 3; //Play with the last # (Changes volatility)
      var v = p5.Vector.fromAngle(angle);

      v.setMag(.4); // How stricly particles follow flow field
      flowfield[index] = v;
      xoff += inc;
   }
   yoff += inc;

   zoff += 0.001; //The rate of the flowfield updating (Lower number = slow movement)
 }

 for (var w = 0; w < Whiteparticles.length; w++) { //Programs the White particles to utilize the code in WhiteParticle.js
   Whiteparticles[w].follow(flowfield);
   Whiteparticles[w].update();
   Whiteparticles[w].edges();
   Whiteparticles[w].show();
 }
 for (var b = 0; b < Blackparticles.length; b++) { //Programs the Black particles to utilize the code in BlackParticle.js
   Blackparticles[b].follow(flowfield);
   Blackparticles[b].update();
   Blackparticles[b].edges();
   Blackparticles[b].show();
 }
}
