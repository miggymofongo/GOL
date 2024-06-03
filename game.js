/**  
 waddup!! this is a game of life simulation comprised of 5 functions
 that can be ran in the terminal with the nodejs runtime. 
 
 just run node game.js and watch the funny
 looking shapes change form every 1000 milliseconds.

*/

/**  first i am going to import some modules
 *from node.js to help me provide interactivity. 
 
 I'll import readLine to create an interface that 
 that handles the input and output streams  
 
 I'll also import methods for a repl server
 */
const readline = require('readline');
const { start } = require('repl');
// const { create } = require('domain');

/**
 * here i create an interface with readLine and set it to
 * a const 'rl' that handles the input and output streams 
 * 
 */

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

/**
 * 
 * the question method on rl takes a question
 * and the result of a callback that generates
 * a response. i use it to ask the user how 
 * big they want to grid to be and take in
 * a formatted str that is mapped
 * to a "dimensions" array */

rl.question('what grid size do you want (e.g., 20x20)?', (answer) => {
    let dimensions = answer.split('x').map(num => parseInt(num, 10));

/**
 * a conditional checks if the length of what was 
 * entered is 2 and that each element is greater
 * than zero. if it is, then the values at 
 * dimensions[0] and dimensions[1] are included as
 *  parameters in the initialization of the
 * the grid in the startGame function.
 * if it isn't, it will console.log a message saying
 * input format is invalid and exit.
 * 
 * the interface constructor instance then ends 
 * once i use close on rl. 
 * 
 */
    if (dimensions.length === 2 && dimensions.every(num => !isNaN(num) && num > 0)) {
        startGame(dimensions[0], dimensions[1], 1000);
    } else {
        console.log('Invalid input. use the format widthxheight.');
        rl.close();
    }
});


/** this function uses the user inputted
 * width and height from startGame and
 * returns a new 2D array "grid" with 
 * columns for rows (width) and
 * rows for columns (height)

it uses a for loop to randomly initialize 
each cell ' i ' to either zero 
or one (alive or dead) 

As long as the value of i is less than
the height parameter I gave it at startGame,
the .fill and .map methods randomly
fill each element with either a zero or
a one with the expression 
'Math.floor(Math.random() * 2). 
*/
 

function createGrid(width, height) {
    return new Array(height).fill(null).map(() => new Array(width).fill(0).map(() => Math.floor(Math.random() * 2)));
    }
    
/** 
this function maps either a " " or '█' to
each "dead" or "alive" cell to draw a grid
on the terminal with console.log. 

the "forEach" method called on the Array 'grid' 
iterates over each element "row" and console.logs
a block or space to visualize the grid on the 
terminal. 1 is represented by a block character 
'█' and 0 is represented by a space. 

.map method creates a new array for each
row and .join concatenates (or 
mushes together) each element (in 
this case each row) and returns a 
new string (with a ' ' or '█'character. ) 
*/  


function drawGrid(grid) {
    
    console.clear();
    grid.forEach(row => console.log(row.map(cell => cell ? '█' : ' ').join('')));
    console.log("\npress space bar to end simulation");       
    }



/**  
 the 4 rules that dictate the evolution of cells from one generation to the next are
 translated into a function updateGrid, which takes in the array 'grid' and returns the 
 'next generation' in the form of a variable newGrid that is returned after a calling the 
 the .map method on the updated grid, creating a new array. 
 the nested for loop iterates over each cell, returning either a 0 or 1 based 
 on value of aliveNeighbors. if it is less than 2 (rule number #1 underpopulation) or 
 greater than 3 (rule number 3 overpopulation) and returns a newGrid.
 rule 2 is implicit since it's not changing state unless it has either 2 or 3 aliveNeighbors.
 aliveNeighbors is declared as a constant created by resolving a function getAliveNeighbors
 that takes in grid, i, and j (the cell's coordinates).    
*/
function updateGrid(grid) {
    let newGrid = grid.map(arr => [...arr]);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const aliveNeighbors = getAliveNeighbors(grid, i, j);
            const cell = grid[i][j];
            if (cell === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                newGrid[i][j] = 0;
            } else if (cell === 0 && aliveNeighbors === 3) {
                newGrid[i][j] = 1;
            }
        }
    }
    return newGrid;
    
}

/**
 this function will intialize a grid with
 createGrid, which creates a starter grid 
 with the dimensions inputted by the user.
 
 setInterval is a global method that will 
 repeatedly execute console.clear, drawGrid
and updateGrid to create a new generation 
at every delay milliseconds as long as 
gameState is set to 'running',

 it will re-assign grid to the new grid
 with new alive or dead cells 
 based on the 4 rules programed into 
 updateGrid
*/

function startGame(width, height, delay) {
  
    let grid = createGrid(width, height);
    const interval = setInterval(() => {
        drawGrid(grid);
        grid = updateGrid(grid);
    }, delay);

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('keypress', (chunk, key) => {
        ir (key && key.name === 'space') 
            clearInterval(interval);
            console.log('Simulation ended.');
            process.exit();
     
    })};
    /** 
 the function getAliveNeighbors gives us the info we need to apply the 4 rules that
 determine the state of each cell in at positions x, y in the next generation via the 
 updateGrid function. we declare a function getAliveNeighbors that takes in the
 3 variables, 1) the array grid 2) x and 3) y values (cell coordinates) and returns 
 the value of each neighboring cell (dead or alive), providing an 
 updated aliveNeighbors after using a nested for loop to iterate
 over each neighboring cell in reference to coordinate (x,y). i and j are the coordinates 
 for each neighboring position that runs from -1 to 1, covering a 3x3 area
 over the cell currently being iterated on. the condition if (i === 0 && j === 0) continue 
 omits the current cell from being included in aliveNeighbor. 

 to prevent accessing elements outside of the array, the function checks if neighbors
 coordinates are within the boundaries of the grid with the 'xi >= 0 && xi < grid.length
 && yj >= 0  && yj < grid[0].length. if the sum of x & i and y & j is less than the grid
 length, then it counts as in bounds and its state grid[xi][yj] is added to 'aliveNeighbors'. 
*/ 


function getAliveNeighbors(grid, x, y) {
    let aliveNeighbors = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const xi = x + i;
            const yj = y + j;
            if (xi >= 0 && xi < grid.length && yj >= 0 && yj < grid[0].length) {
                aliveNeighbors += grid[xi][yj];
            }
        }
    }
    return aliveNeighbors;
}


process.on('SIGINT', () => {
    process.exit();

});
/**  Start the game with a grid of 20x20 and update every 1000 miliseconds 
 * 
 * 
*/
rl.question();

