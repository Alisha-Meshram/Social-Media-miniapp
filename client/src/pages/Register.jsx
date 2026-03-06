import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function Registration(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/v1/auth/register", {
        name,
        email,
        password,
        username,
      });

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#fafafa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "#fff",
          padding: "40px 30px",
          border: "1px solid #dbdbdb",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "cursive",
            marginBottom: "25px",
            fontWeight: "bold",
          }}
        >
          SocialApp
        </h2>

        <p style={{ fontSize: "14px", color: "#8e8e8e", marginBottom: "20px" }}>
          Sign up to see photos and videos from your friends.
        </p>

        <Form onSubmit={Registration}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setName(e.target.value)}
              style={{
                backgroundColor: "#fafafa",
                border: "1px solid #dbdbdb",
                padding: "10px",
                fontSize: "14px",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: "#fafafa",
                border: "1px solid #dbdbdb",
                padding: "10px",
                fontSize: "14px",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              style={{
                backgroundColor: "#fafafa",
                border: "1px solid #dbdbdb",
                padding: "10px",
                fontSize: "14px",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: "#fafafa",
                border: "1px solid #dbdbdb",
                padding: "10px",
                fontSize: "14px",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#0095f6",
              border: "none",
              padding: "8px",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            Sign Up
          </Button>
        </Form>

        <div
          style={{
            marginTop: "20px",
            fontSize: "14px",
            borderTop: "1px solid #dbdbdb",
            paddingTop: "15px",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#0095f6",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Log in
          </span>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;