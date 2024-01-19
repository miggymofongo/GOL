/**  waddup!! this is a game of life simulation comprised of 5 functionss 
 that can be ran in the terminal
 with the nodejs runtime. just run node game.js and watch the funny
 looking shapes. 




 we declare a function createGrid that takes in width and height dimensions and 
 returns a new 2D Array called grid with length (height), representing the
 number of rows in the grid. it uses a for loop
 to randomly initialize each cell ' i ' to either zero or one (alive or dead.)
 
  The for loop iterates over each value of i and increments it until the value of
 the height dimension that we give it when we call startGame at the bottom.
 
 i call the .fill and .map methods on the new Array, randomly filling it with
 either a zero or a one. */
 

function createGrid(width, height) {
    let grid = new Array(height);
    for (let i = 0; i < height; i++) {
        grid[i] = new Array(width).fill(0).map(() => Math.floor(Math.random() * 2));
    }
    return grid;
}



/** 
here grid is fed in as a parameter to a function drawGrid that console.logs
 the grid onto the terminal. 
 the "forEach" method called on the Array 'grid' from the code above iterates 
 over each element "row" of the Array 'grid', console.logging a block or space to 
 visualize the grid on the terminal. 1 is represented by a block character '█' and 0 
 is represented by a space. 
 .map method is called on each row to create a new array and .join concatenates (or mushes
 together) each element in the array (in this case each row) and returns a new string (which
 is just a ' ' or '█'character. )
 
*/  


function drawGrid(grid) {
    grid.forEach(row => {
        console.log(row.map(cell => cell ? '█' : ' ').join(''));
    });
}
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
 this function starts the game by taking in variables width, height, and delay and
 returning a grid, the genesis or first generation of the game of life simulation.

 setInterval is a global method that will take 

*/

function startGame(width, height, delay) {
    let grid = createGrid(width, height);
    setInterval(() => {
        console.clear();
        drawGrid(grid);
        grid = updateGrid(grid);
    }, delay);
}

// Start the game with a grid of 20x20 and update every second
startGame(20, 20, 1000);

