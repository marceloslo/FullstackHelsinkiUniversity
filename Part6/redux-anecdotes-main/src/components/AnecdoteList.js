import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer' 
import { setNotification } from '../reducers/notificationReducer'

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
                  dispatch(vote(anecdote.id,{content:anecdote.content,votes:anecdote.votes+1}))
                  dispatch(setNotification(`You voted ${anecdote.content}`,2))
                  }}>vote</button>
              </div>
            </div>
        )

}

export default AnecdoteList