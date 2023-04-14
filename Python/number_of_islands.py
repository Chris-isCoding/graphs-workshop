from collections import deque
from typing import List

# RECURSIVE SOLUTION
# using a call stack to keep track of positions to explore
# using a set to keep track of visited positions


def numIslands(grid: List[List[str]]) -> int:
    if not grid:
        return 0

    # abstracted the logic to check if the current position is valid, using closures
    def is_valid(row, col):
        # check if the current position is valid
        if row < 0 or row >= len(grid):
            return False
        if col < 0 or col >= len(grid[0]):
            return False
        if f"{row}:{col}" in visited:
            return False
        if grid[row][col] == "0":
            return False
        return True

    def dfs(x, y):  # depth first search to explore the land
        if not is_valid(x, y):
            return

        # add the current position to the visited set to avoid visiting it again in the future and explore the land around it alternatively we could use a tuple (x, y) instead of a string as its immutable
        visited.add(f"{x}:{y}")
        # explore the land around the current position
        dfs(x - 1, y)  # left
        dfs(x + 1, y)  # right
        dfs(x, y - 1)  # down
        dfs(x, y + 1)  # up

    count = 0
    visited = set()

    for x in range(len(grid)):  # traverse through the rows of the grid
        for y in range(len(grid[x])):  # traverse through the columns of each row
            # check if the current position is valid aka it is a land and it has not been visited before
            if is_valid(x, y):
                count += 1
                # explore the land around the current position
                dfs(x, y)
    # return the number of islands
    return count


grid = [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]

print(numIslands(grid))


# ITERATIVE SOLUTION
# using a stack to keep track of positions to explore instead of a call stack
# using a class to solve the problem as on leetcode
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        count = 0
        visited = set()
        for x in range(len(grid)):
            for y in range(len(grid[x])):
                if grid[x][y] == '1' and (x, y) not in visited:
                    count += 1
                    self._dfs(grid, x, y, visited)
        return count

    # defining a private method to avoid exposing it to the user
    def _dfs(self, grid, x, y, visited):
        stack = [(x, y)]
        while stack:
            x, y = stack.pop()
            if self._is_valid(grid, x, y, visited):
                visited.add((x, y))
                stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    # private method to check if the current position is valid
    def _is_valid(self, grid, row, col, visited):
        # check if the current row is the boundary of the grid
        if row < 0 or row >= len(grid):
            return False

        # check if the column is the boundary of the grid
        if col < 0 or col >= len(grid[0]):
            return False

        # check if the current node is visited
        if (row, col) in visited:
            return False

        # check if the current node is a land
        if grid[row][col] == '0':
            return False

        # if all the conditions are false, return true
        return True


grid = [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]

# initialize an instance of the class and invoke the method numIslands
print(Solution().numIslands(grid))

# BREADTH FIRST SEARCH SOLUTION USING A QUEUE


def numIslands2(grid: List[List[str]]) -> int:
    def bfs(x, y):
        queue = deque([(x, y)])
        while queue:
            x, y = queue.popleft()
            if is_valid(x, y):
                visited.add((x, y))
                queue.extend(
                    [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    def is_valid(row, col):
        if row < 0 or row >= len(grid):
            return False
        if col < 0 or col >= len(grid[0]):
            return False
        if (row, col) in visited:
            return False
        if grid[row][col] == '0':
            return False
        return True

    count = 0
    visited = set()
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == '1' and (x, y) not in visited:
                count += 1
                bfs(x, y)
    return count


print(numIslands2(grid))
