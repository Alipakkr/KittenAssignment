// Function to store data in local storage
export const setItem = (key, data) => {
  // Convert data to JSON string and store it under the given key in local storage
  return localStorage.setItem(key, JSON.stringify(data));
};

// Function to retrieve data from local storage
export const getItem = (key) => {
  // Retrieve data stored under the given key from local storage
  // Parse the JSON string data and return the parsed data
  return JSON.parse(localStorage.getItem(key));
};

// Function to remove data from local storage
export const removeItem = (key) => {
  // Remove the data stored under the given key from local storage
  return localStorage.removeItem(key);
};
