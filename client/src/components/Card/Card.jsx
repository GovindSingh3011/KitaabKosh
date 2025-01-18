/* eslint-disable react/prop-types */

function Card({ id, title, author, releaseDate, description, price, onEdit, onDelete }) {
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

        <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-80">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

            <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Author:</span> {author}
            </p>

            <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Description:</span> {description}
            </p>

            <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Price:</span> ₹{price}
            </p>

            <p className="text-gray-600 text-sm mb-4">
                <span className="font-semibold">Release Date:</span> {releaseDate}
            </p>



            <div className="flex justify-between">
                <button
                    className="bg-[#98793E] text-white py-1 px-4 rounded hover:bg-[#745c30] transition duration-300"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-300"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Card