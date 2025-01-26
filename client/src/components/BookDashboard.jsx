import { useState, useEffect } from "react";
import Card from "./Card/Card";


const BookDashboard = () => {
  const [view, setView] = useState("all");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books from the database
    fetch(`${api}/books`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div>
      <div className="my-4 flex justify-center">
        <button
          className={`mx-2 px-4 py-2 ${view === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setView("all")}
        >
          All Books
        </button>
        <button
          className={`mx-2 px-4 py-2 ${view === "my" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setView("my")}
        >
          My Books
        </button>
      </div>

      <div className="m-10 flex flex-wrap justify-center gap-5">
        {books.map((book) => (
          <Card key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookDashboard;
