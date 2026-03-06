import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/profile",
        {
          headers: { token: `Bearer ${token}` },
        }
      );

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      {profile && (
        <div
          style={{
            width: "400px",
            backgroundColor: "#ffffff",
            padding: "40px 30px",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontWeight: "600",
            }}
          >
            My Profile
          </h3>
  
          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
           
            <h5 style={{ margin: "5px 0", fontWeight: "700" }}>
              Name
            </h5>
            <p style={{ margin: 0, fontSize: "1.2rem", color: "#777" }}>
            {profile.name}
            </p>
          </div>
  
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            
            <h5 style={{ margin: "5px 0", fontWeight: "700" }}>
            Username 
            </h5>
            <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
             {profile.username}
            </p>
          </div>
  
          {/* User ID */}
          <div>
          <h6 style={{ margin: "5px 0", fontWeight: "700" }}>
              User ID
            </h6>
            <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
            {profile._id}   
            </p>
           
          </div>
        </div>
      )}
    </Container>
  </Layout>
  );
};

export default Profile;