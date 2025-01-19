/* eslint-disable react/prop-types */

function Card({
  id,
  title,
  author,
  description,
  isPublic,
  createdAt,
  onEdit,
  onDelete,
}) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit({ id, title, author, description, isPublic });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        <span className="font-semibold">Visibility:</span>{" "}
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs ${
            isPublic
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {isPublic ? "Public" : "Private"}
        </span>
      </p>

      <p className="mb-4 text-sm text-gray-600">
        <span className="font-semibold">Added on:</span> {formattedDate}
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
