// Function to format a success response.
const successResponse = (res, message, data) => {
  // Sending a 200 status code along with a JSON response containing success status, message, and data.
  return res.status(200).send({ success: true, message, data });
};


// Function to format a failure response.
const failureResponse = (res, message, error) => {
  // Determining the status code based on the error status, defaulting to 400 if not provided.
  const statusCode = error && error.status ? error.status : 400;
  // Sending the determined status code along with a JSON response containing success status, message, and error details.
  return res.status(statusCode).send({ success: false, message, error: JSON.stringify(error) });
};

// Exporting the successResponse and failureResponse functions to make them available for use in other parts of the code.
module.exports = { successResponse, failureResponse };
