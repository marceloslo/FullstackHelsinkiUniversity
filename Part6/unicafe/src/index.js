import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from "./reducer"
import { createStore } from "redux"

const store = createStore(counterReducer)
const root = ReactDOM.createRoot(document.getElementById('root'))

const Button = (props) =>{
    return <button onClick={props.onClick}>{props.name}</button>
}

const App = () => {
    // save clicks of each button to its own state

    return (
      <div>
        <Button onClick={()=>{store.dispatch({type:'GOOD'})}} name="Good"/>
        <Button onClick={()=>{store.dispatch({type:'OK'})}} name="Ok"/>
        <Button onClick={()=>{store.dispatch({type:'BAD'})}} name="Bad"/>
        <Button onClick={()=>{store.dispatch({type:'ZERO'})}} name="Reset Stats"/>
        <div>Good: {store.getState().good}</div>
        <div>Ok: {store.getState().ok}</div>
        <div>Bad: {store.getState().bad}</div>
      </div>
    )
}

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
