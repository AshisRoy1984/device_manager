import Spinner from 'react-bootstrap/Spinner';
const Loader = (props)=> {
    return(
        <div>
          <Spinner 
          as="span"
          className="spinner-border"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" /> 
          &nbsp; {props.text}
        </div>          
    )
}
export default Loader