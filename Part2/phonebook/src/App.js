import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [fil, setNewFilter] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  },[])

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