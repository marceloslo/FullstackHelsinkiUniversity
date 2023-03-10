require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


morgan.token('body', function (request, ) {
  if(request.method==='POST'){
    return JSON.stringify(request.body)}
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req,res)].join(' ')
}))

app.get('/api/persons',(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id',(request,response,next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.get('/info',(request,response) => {
  Person.find({}).then(persons => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
          <p>${new Date()}</p>`)
  })
})

app.delete('/api/persons/:id',(request,response,next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (request,response,next) => {
  const body = request.body
  if (!body.name){
    return response.status(400).json({ error: 'name missing' })
  } else if(!body.number){
    return response.status(400).json({ error: 'number missing' })
  }

  const newPerson = new Person({
    'name' : body.name,
    'number' : body.number,
  })
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request,response,next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError'){
    return response.status(400).send({ error : error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})