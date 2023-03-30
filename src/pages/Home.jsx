import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Home() {
  const buttonVariants = {
    hover: { scale: 1.1 },
  };

  
  const user = localStorage.getItem("user");
  const isLoggedIn = user !== null && user !== "null" && user !== "undefined";

  return (
    <div className="bg-gradient-to-br from-green-200 to-yellow-200  min-h-screen">
      <Container className="py-10">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                Welcome to our community library
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-800 mb-8"
            >
              Manage your Library easily. Explore the world of books and
              knowledge with us.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to={isLoggedIn ? `/books` : '/books'}>
                <Button
                  variant="primary"
                  className="px-8 py-- rounded-full"
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  Start Exploring
                </Button>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute inset-x-0 bottom-0 flex justify-center mb-4"
      >
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.65 }}
          src="https://cdn-icons-png.flaticon.com/512/225/225932.png"
          alt="library"
          className="h-32 w-32 mt-[-250px]"
        />
      </motion.div>
    </div>
  );
}
