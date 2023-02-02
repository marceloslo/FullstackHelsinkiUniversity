import { useState } from 'react'

const Button = ({onClick,text}) => <button onClick={onClick}> {text} </button>

const MostVoted = ({points,anecdotes}) =>{
  const findMax = (arr) => {
    let maxIdx = 0
    let max = arr[0]
    for(var i=1;i<arr.length;i++){
      if(arr[i] > max){
        maxIdx=i;
        max=arr[i];
      }
    }
    return maxIdx
  }
  let argMax = findMax(points)
  return(
    <>
      <h1>Anecdote with most votes </h1>
      <div>{anecdotes[argMax]}</div>
      <div>has {points[argMax]} votes.</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points,setPoints] = useState(new Uint8Array(anecdotes.length))

  const [selected, setSelected] = useState(0)

  const vote = (selected) => {
      const newPoints = [...points]
      newPoints[selected]+=1
      setPoints(newPoints)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes.
      </div>
      <Button onClick={() => {setSelected(Math.floor(Math.random()*anecdotes.length))}} text="next anecdote"/>
      <Button onClick={() => vote(selected)} text="vote"/>
      <MostVoted anecdotes={anecdotes} points={points}/>
    </>
  )
}

export default App
