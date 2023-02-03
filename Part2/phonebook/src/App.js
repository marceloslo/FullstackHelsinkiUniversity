import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [fil, setNewFilter] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(persons => setPersons(persons))
  },[])

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName,number: newNumber}
    const existingPerson = persons.find(person => person.name===newName)
    if(existingPerson !== undefined){
      personService
      .update(existingPerson.id,newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        setNewName('')
        setNewNumber('')
      })
      return
    }

    personService
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const updateName = (event) =>{
    setNewName(event.target.value)
  }
  const updateNumber = (event) =>{
    setNewNumber(event.target.value)
  }
  const updateFilter = (event) =>{
    setNewFilter(event.target.value)
  }

  const displayPersons = persons.filter(person => person.name.toLowerCase().includes(fil.toLowerCase()))

  const deletePerson = (id) =>{
    const personToDelete = persons.find(person => person.id===id)
    const confirm = window.confirm(`delete ${personToDelete.name}?`)
    if(confirm)
    {
      personService.remove(id).then(response => setPersons(persons.filter(person => person.id !== id)))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={fil} onChange={updateFilter}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} 
        namevalue={newName} onChangeName={updateName} 
        numbervalue={newNumber} onChangeNumber={updateNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={displayPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App