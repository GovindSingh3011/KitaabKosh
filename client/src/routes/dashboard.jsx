import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";

export default function Dashboard() {
  const [cards, setCards] = useState([
    // this is an example of a card object
    {
      id: 1,
      title: "Title",
      author: "Author Name",
      releaseDate: "2025-01-19",
      description: "This is an example description.",
      price: 300,
    },
    {
      id: 2,
      title: "Title",
      author: "Author Name",
      releaseDate: "2025-01-19",
      description: "This is an example description.",
      price: 300,
    },
    {
      id: 3,
      title: "Title",
      author: "Author Name",
      releaseDate: "2025-01-19",
      description: "This is an example description.",
      price: 300,
    },
  ]);

  const handleEdit = (card) => {
    alert(`Edit clicked for ${card.title}`);
    // Add your logic here to handle editing.
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="flex flex-wrap justify-center gap-5">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
