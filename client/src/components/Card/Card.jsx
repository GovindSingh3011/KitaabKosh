/* eslint-disable react/prop-types */
import { useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit({ id, title, author, description, isPublic });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {view === "list" ? (
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
              onClick={openModal}
              className="rounded bg-red-500 px-3 py-1 text-background transition duration-300 hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <div className="h-min w-72 rounded-lg bg-background p-6 shadow-md">
          <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>

          <p className="mb-1 text-sm text-gray-600">
            <span className="font-semibold">Author:</span> {author}
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
                onClick={openModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
