
const Success = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log(message)
  return (
      <div className="success">
        {message}
      </div>
  )
}

export default Success