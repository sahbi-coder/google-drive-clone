import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link} from "react-router-dom";

function Reset() {
 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { resetPassword,login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFeiledHidden, setPasswordFeildHidden] = useState(true);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setIsLoading(false);
      setPasswordFeildHidden(false)
    
    } catch (e) {
      setError(`failed to send email, pls try again.`);
      setIsLoading(false)
      setPasswordFeildHidden(true)
      console.log(e)
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      await login(emailRef.current.value,passwordRef.current.value);
      setIsLoading(false);
      navigate("/");

    } catch (e) {
      setError(`failed to login`);
      setIsLoading(false)
      setPasswordFeildHidden(true)
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset</h2>

          {error ? <Alert variant="danger">{error}</Alert> : null}
          <Form>
              

            <Form.Group id="email">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
              
            {!passwordFeiledHidden ? <Alert variant="success">enter the password we'sent sent</Alert> : null}
            {!passwordFeiledHidden ? (
              <Form.Group id="password">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
            ) : null}

            <Button
              className="mt-2"
              onClick={passwordFeiledHidden?handleReset:handleLogin}
              disabled={isLoading}
            >
              submit
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          go to <Link to="/auth/login">login?</Link>
        </div>
      </Card>
    </div>
  );
}

export default Reset;
