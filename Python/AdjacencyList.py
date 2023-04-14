# Implement the AdjacencyList class for undirected, unweighted graphs

class AdjacencyList:
    def __init__(self):
        self.list = {}

    def print_graph(self):
        print("Graph:")
        for vertex in self.list:
            print(vertex, '->', self.list[vertex])

    def add_vertex(self, v):
        if v not in self.list:
            self.list[v] = []

    def add_edge(self, v1, v2):
        self.add_vertex(v1)
        self.add_vertex(v2)
        self.list[v1].append(v2)
        self.list[v2].append(v1)

    def remove_vertex(self, v):
        for vertex in self.list:
            if v in self.list[vertex]:
                self.list[vertex].remove(v)
        del self.list[v]

    def remove_edge(self, v1, v2):
        if v1 in self.list and v2 in self.list:
            self.list[v1].remove(v2)
            self.list[v2].remove(v1)


myGraph = AdjacencyList()

myGraph.add_vertex('0')
myGraph.add_vertex('1')
myGraph.add_vertex('2')
myGraph.add_vertex('3')
myGraph.add_vertex('4')
myGraph.add_vertex('5')
myGraph.add_vertex('6')

myGraph.add_edge('3', '1')
myGraph.add_edge('3', '4')
myGraph.add_edge('4', '2')
myGraph.add_edge('4', '5')
myGraph.add_edge('1', '2')
myGraph.add_edge('1', '0')
myGraph.add_edge('0', '2')
myGraph.add_edge('6', '5')

myGraph.print_graph()
# Output:
# Graph:
# 0 -> ['1', '2']
# 1 -> ['3', '2', '0']
# 2 -> ['4', '1', '0']
# 3 -> ['1', '4']
# 4 -> ['3', '2', '5']
# 5 -> ['4', '6']
# 6 -> ['5']

myGraph.remove_vertex('4')
# myGraph.remove_edge('4', '6')
myGraph.print_graph()
# Graph:
# 0 -> ['1', '2']
# 1 -> ['3', '2', '0']
# 2 -> ['1', '0']
# 3 -> ['1']
# 5 -> ['6']
# 6 -> ['5']
