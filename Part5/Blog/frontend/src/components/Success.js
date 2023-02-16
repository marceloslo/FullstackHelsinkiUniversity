import PropTypes from 'prop-types'
const Success = ({ message}) => { 
  if (message === null) { 
    return null
 }

  return (
      <div className='success'>
        { message}
      </div>
  )
}

Success.propTypes = { 
  message: PropTypes.string
}

export default Success