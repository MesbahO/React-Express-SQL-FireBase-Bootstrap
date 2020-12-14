import React, {useRef, useState} from "react";
import {Card, Form, Button, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, sendMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      sendMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      sendMessage("Check you inbox for a password reset");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Password Reset </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {error && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label> Email </Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button diabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Register now! <Link to="/register">Here</Link>
      </div>
    </>
  );
}