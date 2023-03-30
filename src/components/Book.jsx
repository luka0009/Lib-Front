import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation } from "../store/booksApi";

export default function Book({ _id, image, author, title, type, description }) {
  const [showDescription, setShowDescription] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  function handleClick(e) {
    const id = e.target.id;
    navigate(`/edit/${id}`);
  }

  async function handleDelete(e) {
    const id = e.target.id;
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(id);
    }
  }


  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user !== null && user !== "null" && user !== "undefined" && user.token;

  return (
    <div className="m-3 w-[300px] p-2 px-3">
      <Card style={{ width: "18rem" }} className='bg-black text-[lawngreen] border-2 border-white'>
        <Card.Img
          variant="top"
          src={image}
          className="object-contain h-[250px] w-[400px] mt-2"
        />
        <Card.Body>
          <Card.Title className="">
            {author} - {title}
          </Card.Title>
          <Card.Text className="mt-2 px-3 w-full">
            <span className="fw-bold">Description:</span>{" "}
            {showDescription ? (
              <div>
                {description}
                <span
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                  onClick={() => setShowDescription(false)}
                >
                  See less
                </span>
              </div>
            ) : (
              <div>
                {/* {`${description.split(" ").slice(0, 3).join(" ")}...`} */}
                <span
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                  onClick={() => setShowDescription(true)}
                >
                  See more
                </span>
              </div>
            )}
          </Card.Text>
          <div className="flex justify-between items-center">
            <Button id={_id} onClick={handleClick} variant="primary">
              Edit Book
            </Button>
            <Button disabled={!isLoggedIn} onClick={handleDelete} id={_id} variant="danger">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
