module.exports = function solveSudoku(matrix) {
  // алгоритм DFS
  const size = 9;
  const boxSize = 3;
  const findEmpty = () => {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix.length; c++) {
        if (matrix[r][c] === 0) {
          return [r, c];
        }
      }
    }
    return null
  }

  const validate = (num, pos, matrix) => {
    let r = pos[0];
    let c = pos[1];
    
    // проверка строк
    for (let i = 0; i < size; i++) {
      if (matrix[i][c] === num && i != r) {
        return false
      }
    }
    // проверка колонок
    for (let i = 0; i < size; i++) {
      if (matrix[r][i] === num && i != c) {
        return false
      }
    }
    // проверка каждого квадрата 3*3

    const boxRow = Math.floor(r / boxSize) * boxSize;
    const boxColl = Math.floor(c / boxSize) * boxSize;
    for (let i = boxRow; i < boxRow+boxSize; i++) {
      for (let j = boxColl; j < boxColl+boxSize; j++) {
        if (matrix[i][j] === num && i != r && j != c) {
          return false
        }
      }
    }
    return true

  }
  const solve = () => {
    const currentPosition = findEmpty();
    if (currentPosition === null) {
      return true
    }
    for (let i = 1; i < size + 1; i++) {
      const currentNum = i;
      const isValid = validate(currentNum, currentPosition, matrix);
      if (isValid === true) {
        const [x, y] = currentPosition;
        matrix[x][y] = currentNum;
        if (solve()) {
          return true
        }
        matrix[x][y] = 0;
      }
    }
    return false
  }

  solve()
  return matrix

}
