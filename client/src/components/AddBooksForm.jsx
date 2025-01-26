import { useState } from "react";

const AddBooksForm = () => {
  const initialFormData = {
    title: "",
    author: "",
    description: "",
    publishDate: "",
    isPublic: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted!");
    setFormData(initialFormData); // Clear the form data
    setIsOpen(false);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-[#98793E] px-4 py-2 text-white shadow hover:bg-[#745c30]"
      >
        Add New Book
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Add Book Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                  placeholder="Enter title"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                  placeholder="Enter description"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Publish Date
                </label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2 text-transform: uppercase"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">Public</label>
                <label className="relative inline-block h-6 w-12">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="peer h-0 w-0 opacity-0"
                  />
                  <span className="absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full bg-gray-300 transition-all duration-300 peer-checked:bg-blue-500"></span>
                  <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-6"></span>
                </label>
              </div>

              <div className="flex justify-between pt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBooksForm;
