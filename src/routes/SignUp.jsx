import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate ,Link} from "react-router-dom";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("password and confirm do not match");
    }
    try {
      setError("");
      setIsLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      setIsLoading(false);
      navigate('/')
    } catch (e) {
      setError(`sign up failed`);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error ? <Alert variant="danger">{error}</Alert> : null}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button
              className="mt-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          already have an acount<Link to='/auth/resetPassword'> forgot pasword?</Link>
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
