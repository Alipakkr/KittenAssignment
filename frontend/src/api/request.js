// Importing ErrorReq function from the "./ErrorReq" module for error handling.
import { ErrorReq } from "./ErrorReq";

// Importing Axios library for making HTTP requests.
import axios from "axios";

// Importing constants for HTTP request methods (GET, POST, PUT) from the "./ConstantsReq" module.
import { GET, POST, PUT } from "./ConstantsReq";

// Defining the base URL for the API endpoint.
let hostUrl = 'https://exploding-kitten-backend-xur6.onrender.com';

// Exporting a function named request for making HTTP requests.
export const request = (method, endPoint, reqBody = null) => {
  // Helper function to create a request promise with specified HTTP method.
  const requestPromise = (httpMethod) => {
    return axios.request({
      url: hostUrl + endPoint, // Constructing the full URL by appending the endpoint to the base URL.
      method: httpMethod,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqBody, // Including request body if provided.
    });
  };

  // Switching based on the specified HTTP method.
  switch (method) {
    case POST:
      // Making a POST request and handling response or error using Promise chains.
      return requestPromise(POST)
        .then((response) => response.data) // Extracting data from the response.
        .catch((error) => ErrorReq(error)); // Handling errors using the ErrorReq function.
    case PUT:
      // Making a PUT request and handling response or error using Promise chains.
      return requestPromise(PUT)
        .then((response) => response.data) // Extracting data from the response.
        .catch((error) => ErrorReq(error)); // Handling errors using the ErrorReq function.
    case GET:
      // Making a GET request and handling response or error using Promise chains.
      return requestPromise(GET)
        .then((response) => response.data) // Extracting data from the response.
        .catch((error) => ErrorReq(error)); // Handling errors using the ErrorReq function.
    default:
      // Handling the case where an unsupported HTTP method is provided.
      return "Wrong Call";
  }
};
