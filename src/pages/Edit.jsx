import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRedirect from "../hook/useRedirect";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../store/booksApi";

const Edit = () => {
  useRedirect("/login");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetSingleBookQuery(id);
  const navigate = useNavigate();

  const [updateBook, updateResult] = useUpdateBookMutation();

  useEffect(() => {
    refetch();
  }, [data]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = {
      title,
      author,
      description,
      image,
    };
    console.log(updateData, id);
    const response = await fetch(`http://localhost:5000/api/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    // await updateBook(id, updateData);
    navigate("/books");
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle(data?.book?.title);
      setDescription(data?.book?.description);
      setAuthor(data?.book?.author);
      setImage(data?.book?.image);

      // Store the data in local storage
      localStorage.setItem("bookData", JSON.stringify(data));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    // Retrieve the data from local storage
    const storedData = JSON.parse(localStorage.getItem("bookData"));

    if (storedData) {
      setTitle(storedData?.book?.title);
      setDescription(storedData?.book?.description);
      setAuthor(storedData?.book?.author);
      setImage(storedData?.book?.image);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 md:mt-16 lg:mt-32">
        <div className="text-[54px]">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching book data</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-green-200 to-yellow-200 py-12 min-h-1200px">
      <h1 className="text-3xl font-bold mb-8">Edit Book</h1>
      <form className="w-1/2" onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-900 font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="bg-gradient-to-br from-green-400 to-yellow-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="bg-gradient-to-br from-green-400 to-yellow-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 font-bold mb-2"
            htmlFor="author"
          >
            Author:
          </label>
          <input
            className="bg-gradient-to-br from-green-400 to-yellow-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-bold mb-2" htmlFor="image">
            Image URL:
          </label>
          <input
            className="bg-gradient-to-br from-green-400 to-yellow-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onSubmit={handleUpdate}
          >
            Submit
          </button>
          <Link to="/books">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Edit;
