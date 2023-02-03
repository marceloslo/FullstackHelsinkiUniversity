import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [fil, setNewFilter] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName,number: newNumber, id: persons.length+1}
    if(persons.find(person => person.name===newName) === undefined){
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      return
    }
    alert(`${newName} is already added to phonebook`)
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
      <Persons persons={displayPersons}/>
    </div>
  )
}

export default App