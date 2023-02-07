require('dotenv').config()
const express = require("express")
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (request, response) {
    if(request.method==="POST"){
    return JSON.stringify(request.body)}})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req,res)
    ].join(' ')
  }))

app.get('/api/persons',(request,response) =>{
	Person.find({}).then(persons => {
    response.json(persons)
	  })
})

app.get('/api/persons/:id',(request,response) =>{
  Person.findById(request.params.id).then(person => {
    response.send(person)
  }).catch(error =>{
    response.status(404).end()
  })
})

app.get('/info',(request,response) =>{
  Person.find({}).then(persons => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
                    <p>${new Date()}</p>`)
	  })
})

app.delete('/api/persons/:id',(request,response) =>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    if (!body.name){
        return response.status(400).json({ error: 'name missing' })
    } else if(!body.number){
        return response.status(400).json({ error: 'number missing' })
    }

    const newPerson = new Person({
        "name" : body.name,
        "number" : body.number,
    })

    newPerson.save().then(savedPerson =>{
      response.json(newPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})