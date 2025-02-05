import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import AddBooksForm from "../components/AddBooksForm";
import { getMyBooks, deleteBook, updateBook } from "../lib/queries";
import { toast } from "sonner";

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return <div>loading</div>;
  }

  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="p-4">
        <div className="mb-4 flex justify-end">
          <AddBooksForm onBookAdded={handleBookAdded} />
        </div>
        {cards.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">No books found. Add some books!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {cards.map((card) => (
              <Card
                key={card.id}
                {...card}
                onEdit={() => handleEdit(card)}
                onDelete={() => handleDelete(card.id)}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
