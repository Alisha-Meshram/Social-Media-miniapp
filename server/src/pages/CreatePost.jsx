import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const navigate=useNavigate()

  async function createPost(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("photo", image);
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/create-post",
        formData,
        {
          headers: {
          
            token: `Bearer ${localStorage.getItem("token")}`,
          
          },
        }
      );
      

      alert("post create successfull");
      setCaption("")

      setImage(null)

      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h3 className="mb-4 text-center">Create Post</h3>

        <Form onSubmit={createPost}>
          {/* Caption */}
          <Form.Group className="mb-3">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter caption"
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              required
            />
          </Form.Group>

          {/* Photo Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>

          {/* Button */}
          <Button variant="primary" type="submit" className="w-100">
            Create Post
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}

export default CreatePost;
