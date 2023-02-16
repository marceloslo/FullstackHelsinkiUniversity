const Error = ({ message }) => {
    if (message === null) {
      return null
    }
    console.log(message)
    return (
        <div className="error">
          {message}
        </div>
    )
}

export default Error