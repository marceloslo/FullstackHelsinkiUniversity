import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    appendAnecdote(state,action){
      //const newAnecdote = asObject(action.payload)
      const newAnecdote = action.payload
      console.log(newAnecdote)
      state.push(newAnecdote)
    },
    voteInternal(state,action){
      const newState = state.map(anecdote => anecdote.id===action.payload ? {...anecdote,votes: anecdote.votes+1}: anecdote)
      console.log(newState)
      return newState.sort((a,b) => b.votes-a.votes)
    },
    setAnecdotes(state,action){
      return action.payload
    }
    
  }
})

export const {appendAnecdote, voteInternal, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a,b) => b.votes - a.votes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) =>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id,updatedAnecdote) =>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.update(id,updatedAnecdote)
    dispatch(voteInternal(id))
  }

}

export default anecdoteSlice.reducer