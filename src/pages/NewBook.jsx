import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation } from "../store/booksApi";
import { Link } from "react-router-dom";
import useRedirect from "../hook/useRedirect";

export default function NewBook() {
  useRedirect('/login');

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [addBook, bookResults] = useAddBookMutation();

  const onSubmit = async (data) => {
    await addBook(data);
    console.log(data);
    reset();
    navigate('/books');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="text-center text-2xl font-bold mb-6">Add New Book</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                name="title"
                {...register("title")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="author"
                className="block text-gray-700 font-bold mb-2"
              >
                Author:
              </label>
              <input
                type="text"
                name="author"
                {...register("author")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Type:
              </label>
              <input
                type="text"
                name="type"
                {...register("type")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                name="description"
                {...register("description")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="image_url"
                className="block text-gray-700 font-bold mb-2"
              >
                Image URL:
              </label>
              <input
                type="text"
                name="image_url"
                {...register("image_url")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <Link to='/books'><span className="underline">Back to books</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
