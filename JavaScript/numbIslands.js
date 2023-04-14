// Description: Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Solution: We can use DFS to solve this problem. We will iterate over the grid and call DFS on each land node. DFS will mark all the connected nodes as visited. We will increment the count variable by 1 for each DFS call. We will also use a visited set to keep track of visited nodes.
// Time Complexity: O(n * m) where n is the number of rows and m is the number of columns
// Space Complexity: O(n * m) where n is the number of rows and m is the number of columns

// RECURSIVE SOLUTION
function numIslands(grid) {
  // define a count variable and initialize it to 0
  let count = 0;
  // define a visited set to keep track of visited nodes
  const visited = new Set();
  // iterate over the grid
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      // if the current node is not visited and is a land
      if (isValid(grid, x, y, visited)) {
        // increment the count
        count++;
        // call dfs on the current node
        // dfs will mark all the connected nodes if they are land and not visited
        dfs(grid, x, y, visited);
      }
    }
  }
  // return the count
  return count;
}

// define isValid function to check if the current node is valid
// a node is valid if it is not visited and is a land
function isValid(grid, row, col, visited) {
  // check if the current row is the boundary of the grid
  if (row < 0 || row >= grid.length) {
    return false;
  }

  // check if the column is the boundary of the grid
  if (col < 0 || col >= grid[0].length) {
    return false;
  }
  // check if the current node is visited
  if (visited.has(`${row}:${col}`)) {
    return false;
  }
  // check if the current node is a land
  if (grid[row][col] === '0') {
    return false;
  }

  // if all the conditions are false, return true
  return true;
}

function dfs(grid, x, y, visited) {
  // check if the current node is valid
  if (!isValid(grid, x, y, visited)) {
    return;
  }
  // mark the current node as visited
  visited.add(`${x}:${y}`);
  // explore all the neighbours of the current node
  dfs(grid, x - 1, y, visited); // left
  dfs(grid, x + 1, y, visited); // right
  dfs(grid, x, y - 1, visited); // down
  dfs(grid, x, y + 1, visited); // up
}

// ITERATIVE SOLUTION

function numIslands2(grid) {
  let count = 0;
  const visited = new Set();
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      // if the current node is land not visited before we call dfs on it
      // we don't know shape of the land so we need to call dfs on each land node
      // dfs will mark all the connected nodes as visited
      if (grid[x][y] === '1' && !visited.has(`${x}:${y}`)) {
        count++;
        dfs2(x, y, grid, visited);
      }
    }
  }

  return count;
}

function dfs2(x, y, grid, visited) {
  // define a stack and current node to it
  // we will use stack to keep track of the nodes we need to explore
  const stack = [[x, y]];
  while (stack.length) {
    const [row, col] = stack.pop();
    if (isValid2(grid, row, col, visited)) {
      visited.add(`${row}:${col}`);
      stack.push(
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1]
      );
    }
  }
}

function isValid2(grid, row, col, visited) {
  // check if the current row is the boundary of the grid
  if (row < 0 || row >= grid.length) {
    return false;
  }

  // check if the column is the boundary of the grid
  if (col < 0 || col >= grid[0].length) {
    return false;
  }
  // check if the current node is visited
  if (visited.has(`${row}:${col}`)) {
    return false;
  }
  // check if the current node is a land
  if (grid[row][col] === '0') {
    return false;
  }

  // if all the conditions are false, return true
  return true;
}

// ITERATIVE SOLUTION USING QUEUE
// BREATH FIRST SEARCH

function numIslands3(grid) {
  const queue = new Queue();
  const visited = new Set();
  let count = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (isValid3(grid, x, y, visited)) {
        queue.enqueue([x, y]);

        while (!queue.isEmpty) {
          const [row, col] = queue.dequeue();

          // check bottom
          if (isValid3(grid, row - 1, col, visited)) {
            queue.enqueue([row - 1, col]);
          }

          // check top
          if (isValid3(grid, row + 1, col, visited)) {
            queue.enqueue([row + 1, col]);
          }

          // check left
          if (isValid3(grid, row, col - 1, visited)) {
            queue.enqueue([row, col - 1]);
          }

          // check right
          if (isValid3(grid, row, col + 1, visited)) {
            queue.enqueue([row, col + 1]);
          }
        }

        count++;
      }
    }
  }

  return count;
}

function isValid3(grid, row, col, visited) {
  // check if the current row is the boundary of the grid
  if (row < 0 || row >= grid.length) {
    return false;
  }

  // check if the column is the boundary of the grid
  if (col < 0 || col >= grid[0].length) {
    return false;
  }

  // check if the current node is a land
  if (grid[row][col] === '0') {
    return false;
  }

  // check if the current node is visited
  if (visited.has(`${row}:${col}`)) {
    return false;
  }
  // add to visited set
  visited.add(`${row}:${col}`);
  // if all the conditions are false, return true
  return true;
}

// QUEUE CLASS
class Queue {
  constructor() {
    this.head = 0;
    this.tail = 0;
    this.values = {};
  }

  enqueue(value) {
    this.values[this.tail] = value;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty) return undefined;

    const first = this.values[this.head];
    delete this.values[this.head];
    this.head++;

    return first;
  }

  peek() {
    return this.values[this.head];
  }

  get length() {
    return this.tail - this.head;
  }

  get isEmpty() {
    return this.length === 0;
  }
}

// TEST CASES
const grid = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
];

console.log(numIslands(grid));
console.log(numIslands2(grid));
console.log(numIslands3(grid));
