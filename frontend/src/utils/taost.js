/**
 * Utility function to display toast messages using a toast notification system.
 * @param {function} toast - The function responsible for displaying the toast message.
 * @param {string} status - The status of the toast message, such as "success", "warning", or "error".
 * @param {string} description - The description or content of the toast message.
 */
export const setToast = (toast, status, description) => {
    // Call the `toast` function with the provided parameters
    toast({
        // Set the description of the toast message
        description,
        // Set the status of the toast message (success, warning, or error)
        status,
        // Set the duration for which the toast message will be displayed (in milliseconds)
        duration: 2000,
        // Allow the toast message to be closable by the user
        isClosable: true,
        // Set the position of the toast message on the screen (top in this case)
        position: 'top'
    });
}
