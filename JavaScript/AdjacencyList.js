// implement the AdjacencyList class for undirected, unweighted graphs

class AdjacencyList {
  constructor() {
    this.list = {};
  }

  printGraph() {
    console.log('Graph:');
    for (const vertex in this.list) {
      console.log(vertex, '->', this.list[vertex]);
    }
  }

  addVertex(v) {
    // check if vertex is already present
    // intialize the vertex with an empty array, arry will hold the edges
    if (!this.list[v]) {
      this.list[v] = [];
    }
  }

  addEdge(v1, v2) {
    // ads the edge between two vertices
    this.addVertex(v1);
    this.addVertex(v2);
    this.list[v1].push(v2);
    this.list[v2].push(v1);
  }

  removeVertex(v) {
    // check if vertex is present and return otherwise
    if (!this.list[v]) return;
    // remove all the edges from the vertex
    // iterate over the edges and remove the vertex from the list
    for (const neighbour of this.list[v]) {
      // this.list[vertex] = this.list[vertex].filter((ver) => ver !== v);
      this.removeEdge(neighbour, v);
    }
    delete this.list[v];
    // { 0 : []}
  }

  removeEdge(v1, v2) {
    // check if both vertices are present and return otherwise
    if (!this.list[v1] || !this.list[v2]) return;
    // remove the edge between the two vertices
    // filter out the vertex from the list
    this.list[v1] = this.list[v1].filter((vertex) => vertex !== v2);
    this.list[v2] = this.list[v2].filter((vertex) => vertex !== v1);
  }
}

const myGraph = new AdjacencyList();

// Example calls
myGraph.addVertex('0');
myGraph.addVertex('1');
myGraph.addVertex('2');
myGraph.addVertex('3');
myGraph.addVertex('4');
myGraph.addVertex('5');
myGraph.addVertex('6');

myGraph.addEdge('3', '1');
myGraph.addEdge('3', '4');
myGraph.addEdge('4', '2');
myGraph.addEdge('4', '5');
myGraph.addEdge('1', '2');
myGraph.addEdge('1', '0');
myGraph.addEdge('0', '2');
myGraph.addEdge('6', '5');

myGraph.printGraph();

// Graph:
// 0 -> [ '1', '2' ]
// 1 -> [ '3', '2', '0' ]
// 2 -> [ '4', '1', '0' ]
// 3 -> [ '1', '4' ]
// 4 -> [ '3', '2', '5' ]
// 5 -> [ '4', '6' ]
// 6 -> [ '5' ]

// myGraph.removeEdge("0", "2")
myGraph.removeVertex('4');

myGraph.printGraph();
// Graph:
// 0 -> [ '1', '2' ]
// 1 -> [ '3', '2', '0' ]
// 2 -> [ '1', '0' ]
// 3 -> [ '1' ]
// 5 -> [ '6' ]
// 6 -> [ '5' ]
