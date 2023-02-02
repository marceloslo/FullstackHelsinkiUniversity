
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
  <p>
    {props.part} {props.exercises}
  </p>
  )
}

const Content = (props) => {
  console.log(props)
  const [parts1,parts2,parts3] = props.parts
  return (
    <>
      <Part part={parts1.name} exercises={parts1.exercises}/>
      <Part part={parts2.name} exercises={parts2.exercises}/>
      <Part part={parts3.name} exercises={parts3.exercises}/>
    </>
  )
}

const Total = (props) => {
  const [parts1,parts2,parts3] = props.parts
  return (
    <p>Number of exercises {parts1.exercises + parts2.exercises + parts3.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App