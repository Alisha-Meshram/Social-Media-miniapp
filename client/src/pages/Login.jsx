import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { password, username }
      );

      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Invalid Credentials");
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
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          SocialApp
        </h2>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
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
            }}
          >
            Log In
          </Button>
        </Form>

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#0095f6",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sign up
          </span>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;