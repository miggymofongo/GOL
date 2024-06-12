var song;
var slider;
var isPlaying = false
  

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}



let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
 createCanvas(600, 400);
 
 song = loadSound("sneaky.mp3", loaded);
 const playButton = document.getElementById('playButton');
 playButton.addEventListener('click', toggleMusic);
 slider = createSlider(0, 1, 0.5, 0.01);
 
 function toggleMusic() {
  if (!isPlaying) {
    song.play();
    isPlaying = true;
    playButton.textContent = "Pause Music";
  } else {
    song.stop();
    isPlaying = false;
    playButton.textContent = "Play Music";
  }  
};

 cols = width / resolution;
 rows = height / resolution;

 grid = make2DArray(cols, rows);
 for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j] = floor(random(2));
  }  
 };
 
 
 function loaded(){
  
  song.play();
 
 }

}




function draw() {
  background(0);
  song.setVolume(slider.value());

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // compute next based on grid because draw is looping
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
// count live neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i ,j); 

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1; //rule #1
      } else if (state == 1 && (neighbors < 2 || neighbors > 3 )) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }

}

grid = next; 

}

function countNeighbors(grid, x, y) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum; 
}
