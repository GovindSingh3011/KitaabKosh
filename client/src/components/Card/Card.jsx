/* eslint-disable react/prop-types */

function Card({
  id,
  title,
  author,
  releaseDate,
  description,
  price,
  onEdit,
  onDelete,
}) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit({ id, title, author, releaseDate, description, price });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete({ id });
    }
  };

  return (
    <div className="h-min rounded-lg bg-background p-6 shadow-md">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>

      <p className="mb-1 text-sm text-gray-600">
        <span className="font-semibold">Author:</span> {author}
      </p>

      <p className="mb-1 text-sm text-gray-600">
        <span className="font-semibold">Description:</span> {description}
      </p>

      <p className="mb-1 text-sm text-gray-600">
        <span className="font-semibold">Price:</span> ₹{price}
      </p>

      <p className="mb-4 text-sm text-gray-600">
        <span className="font-semibold">Release Date:</span> {releaseDate}
      </p>

      <div className="flex justify-between">
        <button
          className="rounded bg-[#98793E] px-4 py-1 text-background transition duration-300 hover:bg-[#745c30]"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="rounded bg-red-500 px-4 py-1 text-background transition duration-300 hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
