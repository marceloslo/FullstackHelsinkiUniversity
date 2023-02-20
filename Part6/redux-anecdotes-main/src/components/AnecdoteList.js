import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer' 
import { changeNotification,hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () =>{
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)))
    const dispatch = useDispatch()

    return anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  dispatch(vote(anecdote.id))
                  dispatch(changeNotification(`You voted ${anecdote.content}`))
                  setTimeout(() => { 
                    dispatch(hideNotification())
                  }, 5000)
                  }}>vote</button>
              </div>
            </div>
        )

}

export default AnecdoteList