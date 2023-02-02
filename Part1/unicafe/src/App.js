import { useState } from 'react'

const Button = (props) =>{
  return <button onClick={props.onClick}>{props.name}</button>
}

const StatisticLine = ({text,value}) =>{
  return (
  <tr>
    <td>{text}</td> 
    <td>{value}</td> 
  </tr>
  )
}

const Statistics = ({good,neutral,bad}) =>{
  const sum = good+bad+neutral
  if(sum==0){
    return (
      <>
      <h2>Statistics</h2>
      <div>No feedback given</div>
      </>
    )
  }

  const calcAverage = () => {
    return (good+bad*-1)/sum
  }
  const calcPositivePercentage = () =>{
    return good/sum
  }

  return(
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/> 
          <StatisticLine text="All" value={sum}/> 
          <StatisticLine text="Average" value={calcAverage()}/> 
          <StatisticLine text="Positive" value={calcPositivePercentage()}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={()=>{setGood(good+1)}} name="Good"/>
      <Button onClick={()=>{setNeutral(neutral+1)}} name="Neutral"/>
      <Button onClick={()=>{setBad(bad+1)}} name="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App