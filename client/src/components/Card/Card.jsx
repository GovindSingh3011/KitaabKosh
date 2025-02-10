/* eslint-disable react/prop-types */

function Card({
  id,
  title,
  author,
  description,
  isPublic,
  createdAt,
  fileUrl,
  fileName,
  onEdit,
  onDelete,
  view,
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

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (view === "list") {
    return (
      <tr>
        <td className="px-6 py-2">{title}</td>
        <td className="px-6 py-2">{author}</td>
        <td className="px-6 py-2">{description}</td>
        <td className="px-6 py-2">{isPublic ? "Public" : "Private"}</td>
        <td className="px-6 py-2">{formattedDate}</td>
        <td className="px-6 py-2">
          {fileUrl && (
            <button
              className="w-full rounded bg-green-500 px-4 py-1 text-background transition duration-300 hover:bg-green-600"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
          <button
            onClick={handleEdit}
            className="mb-2 mr-2 rounded bg-[#98793E] px-3 py-1 text-background transition duration-300 hover:bg-[#745c30]"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="rounded bg-red-500 px-3 py-1 text-background transition duration-300 hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div className="h-min w-72 rounded-lg bg-background p-6 shadow-md">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>

      <p className="mb-1 text-sm text-gray-600">
        <span className="font-semibold">Author:</span> {author}
      </p>

      <p className="mb-1 text-sm text-gray-600">
        <span className="font-semibold">Author:</span> {}
      </p>

      <p className="mb-1 text-sm text-gray-600">
        <span className="font-semibold">Description:</span>{" "}
        <span className="line-clamp-2">{description}</span>
      </p>

      {fileName && (
        <p className="mb-1 text-sm text-gray-600">
          <span className="font-semibold">File:</span>{" "}
          <span className="line-clamp-1">{fileName}</span>
        </p>
      )}

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

      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
        {fileUrl && (
          <button
            className="w-full rounded bg-green-500 px-4 py-1 text-background transition duration-300 hover:bg-green-600"
            onClick={handleDownload}
          >
            Download
          </button>
        )}
          <button
            className="flex-1 rounded bg-[#98793E] px-4 py-1 text-background transition duration-300 hover:bg-[#745c30]"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="flex-1 rounded bg-red-500 px-4 py-1 text-background transition duration-300 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
