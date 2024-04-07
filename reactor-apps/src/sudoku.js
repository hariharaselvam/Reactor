import { useState, useEffect } from 'react'
import styles from './sudoku.module.css'

const size = 9
const board = Array.from({length: size}, () => Array(size).fill(0))
const answer = Array.from({length: size}, () => Array(size).fill(0))




// Helper function to check if a number can be placed in a cell
function canPlace (row, col, num) {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false
  }

  // Check 3x3 sub-square
  const boxRowStart = Math.floor(row / 3) * 3
  const boxColStart = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRowStart + i][boxColStart + j] === num) return false
    }
  }
  return true
}

// Backtracking function to solve the puzzle recursively
function solveSudoku (row = 0, col = 0) {
  // If we've reached the end of the board, the puzzle is solved
  if (col === 9) {
    return solveSudoku(row + 1, 0)
  }
  if (row === 9) return true // Puzzle solved

  // If the cell is already filled, move on
  if (board[row][col] !== 0) return solveSudoku(row, col + 1)

  // Try all numbers from 1 to 9
  for (let num = 1; num <= 9; num++) {
    if (canPlace(row, col, num)) {
      board[row][col] = num
      if (solveSudoku(row, col + 1)) return true // Backtrack if successful
      board[row][col] = 0 // Reset the cell if not successful
    }
  }

  return false // No solution found
}

function generateSudoku () {
  // Create an empty 9x9 array
  // const board = Array.from({length: 9}, () => Array(9).fill(0))


  // Generate a solved Sudoku using backtracking
  solveSudoku()

  // Remove some numbers to create a playable puzzle (adjust for difficulty)
  let emptyCells = 40 // Modify this number for desired difficulty
  while (emptyCells > 0) {
    const row = Math.floor(Math.random() * size)
    const col = Math.floor(Math.random() * size)
    if (board[row][col] !== 0) {
      board[row][col] = 0
      emptyCells--
    }
  }

}

/*function OptionItem({ item }) {
  return <option>{item}</option>;
}

function sudokuSelect(inputValue) {
  const handleChange = (event) => {
    console.log(event)
    // if(canPlace(row,col, event)){
    //   answer[row][col] = event
    //   setCell(event)
    // } else {
    //   console.log('Invalid')
    // }
  }
  return (
    <select value={inputValue} className={styles.sudokuCellClass} onChange={handleChange}>
      {[...Array(size+1).keys()].map((num) => (
        <OptionItem item={num} key={num}/>
      ))}
    </select>
  )
}

function sudokuInput(inputValue, color) {
  return (<input type={'number'}
                 className={styles.sudokuCellClass}
                 value={inputValue}
                 min={1}
                 max={9}
                 style={{backgroundColor: color}}
                 disabled={true}/>)
}*/

function sudokuCell (row, col) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cell, setCell] = useState(board[row][col])
  const disabled = board[row][col] !== 0
  const alterIndex = [3, 4, 5]
  const color = (!alterIndex.includes(col) && !alterIndex.includes(row)) || (alterIndex.includes(row) && alterIndex.includes(col)) ? 'blue' : 'pink'
  const handleChange = (event) => {
    const cellValue = event.target.value
    console.log(cellValue)
    console.log(typeof cellValue)
    if(canPlace(row,col, cellValue) && cellValue){
      answer[row][col] = cellValue
      setCell(cellValue.replace(/^0+/, '')[0])
    } else {
      console.log('Invalid')
      setCell(0)
    }
  }
  return (<input type={'number'}
                 className={styles.sudokuCellClass}
                 value={cell}
                 min={1}
                 max={9}
                 style={{backgroundColor: color}}
                 onChange={handleChange}
                 disabled={disabled}/>)
}

function sudokuCols (row = 1) {
  const cols = []
  for (let i = 0; i < size; i++) {
    cols.push(
      <td key={i}>
        {sudokuCell(row, i)}
      </td>
    )
  }
  return cols
}

function sudokuRows () {

  const rows = []
  for (let i = 0; i < size; i++) {
    rows.push(
      <tr key={i}>
        {sudokuCols(i)}
      </tr>
    )
  }
  return rows
}

function sudoku () {
  generateSudoku()
    // Effect to watch for changes to `constantValue`
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('Constant value changed:', answer);
    // You can perform any actions here when `constantValue` changes
  }, [answer]); // Dependency array ensures this effect runs only when `constantValue` changes


  // const matrix = generateSudoku()
  // const solution = matrix
  return (
    <div>
      <h2>SudoKu</h2>
      <table>
        {sudokuRows()}
      </table>
    </div>
  )

}

export default sudoku
