import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const Comment = ({postId}) => {
  const [text, setText] = useState("");
  const navigate=useNavigate()

 async function createComment(e) {
    e.preventDefault();
    try {
        
   const res= await  axios.post(
        `http://localhost:8000/api/v1/post/${postId}/comment`,
        { text },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res)
      alert("comment create successfull ");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-25">
   
      <Form onSubmit={createComment}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="text" value={text}
            placeholder="Enter comment"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Comment;
