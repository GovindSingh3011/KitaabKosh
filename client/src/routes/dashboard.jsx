import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import AddBooksForm from "../components/AddBooksForm";
import { getMyBooks, deleteBook, updateBook } from "../lib/queries";
import { toast } from "sonner";
import Loader from "../components/ui/Loader";

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("all");
  const [isGridView, setIsGridView] = useState("grid");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const books = await getMyBooks();
      setCards(books);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAdded = (newBook) => {
    setCards((prevCards) => [...prevCards, newBook]);
  };

  const handleEdit = async (card) => {
    try {
      const formData = new FormData();
      formData.append("title", card.title);
      formData.append("author", card.author);
      formData.append("description", card.description);
      formData.append("isPublic", card.isPublic);

      if (card.file) {
        formData.append("file", card.file);
      }

      const updatedBook = await updateBook(card.id, formData);

      setCards((prevCards) =>
        prevCards.map((prevCard) =>
          prevCard.id === card.id ? updatedBook : prevCard,
        ),
      );

      toast.success("Book updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));

      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const toggleView = () => {
    setIsGridView((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="mx-56 my-10">
        <div className="my-4 flex items-center justify-between">
          <div>
            <button
              className={`mx-2 rounded px-4 py-2 ${view === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setView("all")}
            >
              All Books
            </button>
            <button
              className={`mx-2 rounded px-4 py-2 ${view === "my" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setView("my")}
            >
              My Books
            </button>
          </div>

          <div className="flex items-center gap-4">
            <AddBooksForm onBookAdded={handleBookAdded} />
            <button
              onClick={toggleView}
              className="mx-2 rounded bg-gray-200 px-4 py-2 text-black"
            >
              Switch to {isGridView === "grid" ? "List View" : "Grid View"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {cards.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-gray-500">No books found. Add some books!</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-5">
              {isGridView === "grid" ? (
                cards.map((card) => (
                  <Card
                    key={card.id}
                    {...card}
                    onEdit={() => handleEdit(card)}
                    onDelete={() => handleDelete(card.id)}
                    view="grid"
                  />
                ))
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-base text-gray-800 dark:text-gray-400">
                    <thead className="bg-gray-100 uppercase text-black dark:bg-gray-700 dark:text-gray-300">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Author
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Visibility
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Release Date
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cards.map((card) => (
                        <Card
                          key={card.id}
                          {...card}
                          onEdit={() => handleEdit(card)}
                          onDelete={() => handleDelete(card.id)}
                          view="list"
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
