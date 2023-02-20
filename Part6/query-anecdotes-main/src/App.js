import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import anecdoteService from './services/anecdotes'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'


const App = () => {
  const result = useQuery('anecdotes', anecdoteService.getAll)
  const voteMutation = useMutation(anecdoteService.update)
  const queryClient =  useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate({...anecdote,votes:anecdote.votes+1},{
      onSuccess: (updatedAnecdote) =>{
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes',anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
        dispatch({type:'SET',payload:`Voted on ${updatedAnecdote.content}`})
        setTimeout(()=>{
          dispatch({type:'RESET'})
        },5000)
      }
    })
  }

  if(result.isLoading){
    return <div> loading data</div>
  }
  if(result.isError){
    return <div>anecdote service not available due to server problems</div>
  }

  const anecdotes = result.data
  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification message={notification}/>
        <AnecdoteForm/>
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
