import { useState } from 'react';

function Square({ value, onSquareClick }) {

  return (
    <>
      <button onClick={onSquareClick} className='square'>
        {value}
      </button>
    </>
  );
}

export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice()
    // if(xIsNext) {
    //   nextSquares[i] = 'X'
    // } else {
    //   nextSquares[i] = 'O'
    // }
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  let status = ''

  if (winner) {
    status = winner + ' is a winner'
  } else {
    status = `Now is "${xIsNext ? "X" : "O"}" Turn`
  }

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <>
      <div>
        <h1>{status}</h1>
        {winner && <button onClick={handleRefresh}>Play Again!</button>}
      </div>
      <div className='board'>
        <Square value={ squares[0] } onSquareClick={ () => handleClick(0) } />
        <Square value={ squares[1] } onSquareClick={ () => handleClick(1) } />
        <Square value={ squares[2] } onSquareClick={ () => handleClick(2) } />
        <Square value={ squares[3] } onSquareClick={ () => handleClick(3) } />
        <Square value={ squares[4] } onSquareClick={ () => handleClick(4) } />
        <Square value={ squares[5] } onSquareClick={ () => handleClick(5) } />
        <Square value={ squares[6] } onSquareClick={ () => handleClick(6) } />
        <Square value={ squares[7] } onSquareClick={ () => handleClick(7) } />
        <Square value={ squares[8] } onSquareClick={ () => handleClick(8) } />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    // const a = lines[i][0]
    // const b = lines[i][1]
    // const c = lines[i][2]
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[c]) {
      return squares[a]
    }
  }
  return false
}
