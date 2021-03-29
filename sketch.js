var counter = 0;
var timeLeft = 1500;
var canvas;
var currentImage;
var cursorInsect;
var soundTF;

let day1;
let day2;
let day3;
let day4;
let day5;
let startButtonFont;
let sunDim = 80;
let buttonText;
let rot = 1;
let startbg;
let start;

function preload() {
  day1 = loadImage('dayScene/day1.jpg');
  day2 = loadImage('dayScene/day2.jpg');
  day3 = loadImage('dayScene/day3.jpg');
  day4 = loadImage('dayScene/day4.jpg');
  day5 = loadImage('dayScene/day5.jpg');
  bee = loadImage('dayScene/bee.png');
  bug = loadImage('dayScene/bug.png');
  butterfly = loadImage('dayScene/butterfly.png');
  ladybug = loadImage('dayScene/ladybug.png');
  soundFormats('mp3');
  sound = loadSound('dayScene/music.mp3');
  startButtonFont = loadFont('DashingUnicorn.ttf')
}


function setup() {
  canvas = createCanvas(720, 480);
  frameRate(10);
  currentImage = day1;
  imageMode(CORNERS);
  currentImage.resize(720, 480);
  image(currentImage, 0, 0);
  cursorInsect = bee;
  buttonText = 'Start';
}

function timerCode() {
  var timer = select('#timer')
  timer.html(convertSeconds(timeLeft - counter));

  function timeIt() {
    counter++;
    timer.html(convertSeconds(timeLeft - counter));
    if (counter == timeLeft) {
      clearInterval(interval);
      // this is when the timer is at 00:00
    }

    if (counter == 300) {
      currentImage = day2
      currentImage.resize(720, 480);
      image(currentImage, 0, 0);
    }
    if (counter == 600) {
      currentImage = day3
      currentImage.resize(720, 480);
      image(currentImage, 0, 0);
    }
    if (counter == 900) {
      currentImage = day4
      currentImage.resize(720, 480);
      image(currentImage, 0, 0);
    }
    if (counter == 1200) {
      currentImage = day5
      currentImage.resize(720, 480);
      image(currentImage, 0, 0);
    }
  }

  var interval = setInterval(timeIt, 1000);
}

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2); //nf is number format
}

function draw() {
  imageMode(CORNERS);
  currentImage.resize(720, 480);
  image(currentImage, 0, 0);
  noStroke();
  fill('#CCCCCC');
  startbg = rect(600, 430, 100, 40);
  fill('#FF828B');
  start = rect(595, 425, 100, 40); //start timer button
  fill('#FFFFFF');
  textFont(startButtonFont, 35);
  text(buttonText, 612, 456);
  textFont(startButtonFont, 22);
  text('left - bee', 20, 35)
  text('up - butterfly', 20, 53)
  text('down - bug', 20, 71)
  text('right - ladybug', 20, 89)
  text('m - mute/play music', 20, 107)
  fill('#FFFF9E');
  ellipse(620, 80, sunDim, sunDim); //sun
  stroke('#FFFFFF');
  strokeWeight(4);
  line(mouseX, mouseY, pmouseX, pmouseY);
  imageMode(CENTER);
  image(cursorInsect, mouseX, mouseY, 60, 60);
}

function mousePressed() {
  if (mouseX > 595 && mouseY > 425) {
    if (buttonText == 'Start') { //clicking on start
      timerCode();
      sound.loop();
      soundTF = 'True';
      buttonText = '';
      startbg = rect(0, 0, 0, 0);
      start = rect(0, 0, 0, 0);
    } 
  }
  if (mouseX > 580 && mouseY < 100) {
    if (sunDim == 80) {
      sunDim = 120;
    } else {
      sunDim = 80;
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    cursorInsect = bee;
  }
  if (keyCode === UP_ARROW) {
    cursorInsect = butterfly;
  }
  if (keyCode === DOWN_ARROW) {
    cursorInsect = bug;
  }
  if (keyCode === RIGHT_ARROW) {
    cursorInsect = ladybug;
  }
  if (keyCode === 77) {
    if (soundTF == 'True') {
      sound.stop();
      soundTF = 'False';
    } else {
      sound.loop();
      soundTF = 'True';
    }
  }
}