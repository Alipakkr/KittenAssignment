// Importing HTTP status constants from a local file "./httpConstants".
const {
  FORBIDDEN,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  REQUEST_TIMED_OUT,
} = require("./ConstantsReq");

// Exporting a function named ErrorReq, which takes an error object as input.
export const  ErrorReq= (error) => {
  // Switching based on the HTTP status code of the error response.
  switch (error.response ? error.response.status : null) {
    // Handling different HTTP error status codes.
    case FORBIDDEN:
      return "FORBIDDEN";
    case NOT_FOUND:
      return "SERVER IS NOT FOUND ANY REQUEST.";
    case UNAUTHORIZED:
      return "UNAUTHORIZED";
    case BAD_REQUEST:
      return "BAD_REQUEST";
    case INTERNAL_SERVER_ERROR:
      return "INTERNAL_SERVER_ERROR";
    case REQUEST_TIMED_OUT:
      return "REQUEST_TIMED_OUT";
    default:
      // If the status code is not recognized, return the error message from the error object.
      return error.message;
  }
};
