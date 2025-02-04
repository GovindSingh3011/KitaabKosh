const API_URL = "http://localhost:3000/api";

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  return isMultipart
    ? {
        Authorization: token ? `Bearer ${token}` : "",
      }
    : {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred");
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}, ${e.message}`);
    }
  }
  return response.json();
};

export const getPublicBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books/public`);
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to fetch public books: " + error.message);
  }
};

export const getMyBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books/my-books`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to fetch your books: " + error.message);
  }
};

export const createBook = async (formData) => {
  try {
    const isFormData = formData instanceof FormData;

    const body = isFormData ? formData : JSON.stringify(formData);

    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: getHeaders(isFormData),
      body: body,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to create book: " + error.message);
  }
};

export const updateBook = async (id, formData) => {
  try {
    const isFormData = formData instanceof FormData;

    const body = isFormData ? formData : JSON.stringify(formData);

    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      headers: getHeaders(isFormData),
      body: body,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to update book: " + error.message);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Failed to delete book: " + error.message);
  }
};

export const getBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to fetch book: " + error.message);
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to sign in: " + error.message);
  }
};

export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Failed to sign up: " + error.message);
  }
};
