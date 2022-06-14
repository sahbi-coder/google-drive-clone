import { Card, Form, Button,Alert } from "react-bootstrap";
import { useRef ,useState} from "react";
import { useAuth} from "../contexts/AuthContext";
import {useNavigate,Link} from 'react-router-dom'

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate()
  const {login,currentUser} = useAuth();
  const [error,setError]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
   
    try{
        setError('')
        setIsLoading(true)
         await login(emailRef.current.value,passwordRef.current.value)
         setIsLoading(false)
         navigate('/')
    }
    catch(e){
       setError(`login failed`)
       setIsLoading(false)
    }

  }
 
 
  
  
  return (
    
      <div>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            
            {error?(<Alert variant='danger'>{error}</Alert>):null}
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
             

              <Button className="mt-2" onClick={handleSubmit} disabled={isLoading}>submit</Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            wanna <Link to='/auth/signup'>signUp?</Link>
          </div>
        </Card>
      </div>
   
  );
}

export default Login;