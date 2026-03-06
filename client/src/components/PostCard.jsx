import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Comment from "./Comment";
import { Modal, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPost] = useState([]);

  //create comment
  const [commentText, setCommentText] = useState("");
  const [activeText, setActiveText] = useState(null);

  //update post
  const [show, setShow] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [editImage, setEditImage] = useState(null);
  const navigate = useNavigate();

  // get all post

  async function getAllPost() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/v1/post/posts", {
        headers: { token: `Bearer ${token}` },
      });
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  //get single post

  function toggleBox(postId) {
    if (activeText === postId) {
      setActiveText(null);
    } else {
      setActiveText(postId);
    }
  }

  async function createComment(postId) {
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${postId}/comment`,
        { text: commentText },
        { headers: { token: `Bearer ${token}` } }
      );
  
      setPost((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...(post.comments || []), res.data],
              }
            : post
        )
      );
  
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  }
  //update post
  function handleEdit(post) {
    setEditPostId(post._id);
    setEditCaption(post.caption);
    setShow(true);
  }

  async function updatePost() {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("caption", editCaption);

      if (editImage) {
        formData.append("photo", editImage);
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/post/${editPostId}/update-post`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      // ✅ Update FULL post including image
      setPost((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editPostId ? res.data.post : post
        )
      );

      setShow(false);
      setEditImage(null); // reset image
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  //deletepost
  async function deletePost(postId) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/v1/post/${postId}/delete-post`,
        {
          headers: { token: `Bearer ${token}` },
        }
      );

      // ✅ Remove post instantly from UI
      setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error.response?.data);
    }
  }
  //likes

  async function likes(postId) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${postId}/like`,
        {},
        { headers: { token: `Bearer ${token}` } }
      );

      console.log(res.data);

      // Update UI instantly
      setPost((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data.result : post))
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#fafafa",
          minHeight: "100vh",
          paddingTop: "30px",
          display: "flex",
          padding: "2rem",
        }}
      >
        {/* Feed */}
        <Container style={{ marginTop: "30px" }}>
          <Row>
            {posts.map((item) => (
              <Col md={4} key={item._id} className="mb-4">
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    height: "100%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Header Section */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        {item.author.username}
                      </span>
                    </div>
                    <div>
                      <FaEdit
                        style={{
                          cursor: "pointer",
                          color: "#555",
                        }}
                        onClick={() => handleEdit(item)}
                      />
                      <FaTrash
                        style={{
                          cursor: "pointer",
                          color: "red",
                          marginLeft: "10px",
                        }}
                        onClick={() => deletePost(item._id)}
                      />
                    </div>
                  </div>

                  {/* Post Image */}
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Post Body */}
                  <div style={{ padding: "10px" }}>
                    <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                      {item.caption}
                    </p>

                    <div>
                      <button
                        onClick={() => likes(item._id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        ❤️ {item.likes.length}
                      </button>

                      <button
                        onClick={() => toggleBox(item._id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      >
                        💬
                      </button>

                      {/* crete comment */}

                      {/* Show All Comments Always */}
                      <div style={{ marginTop: "10px" }}>
                      {Array.isArray(item.comments) &&
  item.comments.map((c, index) => (
    <div key={c._id || index} style={{ fontSize: "13px" }}>
      <strong>{c.user?.username || "Unknown"}</strong> {c.text}
    </div>
  ))}
</div>

{/* Show Input Box Only When Clicked */}
{activeText === item._id && (
  <div style={{ marginTop: "10px" }}>
    <input
      type="text"
      placeholder="Write comment..."
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      style={{ width: "70%", padding: "5px" }}
    />
    <button
      onClick={() => createComment(item._id)}
      style={{ marginLeft: "5px" }}
    >
      Post
    </button>
  </div>
)}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Change Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updatePost}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default Dashboard;
