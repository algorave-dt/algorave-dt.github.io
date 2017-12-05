
var playlist = []; //store all songs here
var index = 0; //which song is playing

var play_pause_button;
var next_button;
var previous_button;

function setup() 
{
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');

  //load each song into the array
  playlist.push(loadSound('assets/songs/anny.wav'));
  // playlist.push(loadSound('assets/songs/haley1.wav'));
  playlist.push(loadSound('assets/songs/haley2.wav'));
  playlist.push(loadSound('assets/songs/omrinuri.mp3'));
  playlist.push(loadSound('assets/songs/vishaal1.wav'));
  playlist.push(loadSound('assets/songs/vishaal2.wav'));

  //turn on the mic for audio-reactive jawn
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  //the scrolls! the scrolls! the buttons! the buttons!
  play_pause_button = createButton('play/puase');
  play_pause_button.position(width*0.06,height*0.8);
  play_pause_button.mousePressed(playPause);

  next_button = createButton('next');
  next_button.position(width*0.125,height*0.8);
  next_button.mousePressed(next);

  previous_button = createButton('previous');
  previous_button.position(width*0.005,height*0.8);
  previous_button.mousePressed(previous);
}

function draw() {
  background(0, 75);
  
  var spectrum = fft.analyze();
  fill(255);
  noStroke();
  
  push();
  translate( width/2.5, height/2 );
  cPoints = 12;
  for( c = 0; c < cPoints; c++ )
  {
    rotate( TWO_PI / cPoints );
    for( i = 0; i < spectrum.length; i++ )
    {
      ellipse( map( i, 0, spectrum.length, 0, width),
               map(spectrum[i], 0, 255, height, 0),
               5, 5 );
    }
  }
  pop();
}

function playPause() {
  console.log('play/pause');
  if ( playlist[index].isPlaying() ) 
  { 
    playlist[index].pause();
  } else {
    playlist[index].play();
  }
}

function next()
{
  if ( playlist[index].isPlaying() ) 
  { 
    playlist[index].pause();
  }

  index = (index+1) % playlist.length;

  playlist[index].play();

  console.log(index);
}

function previous()
{
  if ( playlist[index].isPlaying() ) 
  { 
    playlist[index].pause();
  }

  if(index === 0 )
  {
    index = playlist.length-1;
  }
  else
  {
    index--;
  }

  playlist[index].play();

  console.log(index);
}