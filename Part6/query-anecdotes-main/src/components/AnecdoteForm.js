import { useMutation, useQueryClient } from 'react-query'
import anecdoteService from '../services/anecdotes'
import { useContext } from "react"
import NotificationContext from '../NotificationContext'

const AnecdoteForm = (props) => {
  const newAnecdoteMutation = useMutation(anecdoteService.createNew)
  const queryClient =  useQueryClient() 
  const [notification, dispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content, {
      onSuccess : (newAnecdote) =>{
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes',anecdotes.concat(newAnecdote))
        dispatch({type:'SET',payload:`Created anecdote ${newAnecdote.content}`})
        setTimeout(()=>{
          dispatch({type:'RESET'})
        },5000)
      },
      onError: () => {
        dispatch({type:'SET',payload:`too short anecdote, must have length 5 or more`})
        setTimeout(()=>{
          dispatch({type:'RESET'})
        },5000)
      }
    } )
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
