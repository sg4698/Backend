// Define a class `ApiResponse` to structure API responses
class ApiResponse {
    // Constructor initializes the instance when `new ApiResponse()` is called
    constructor(statusCode, data, message = "Success") {
        // Assign the HTTP status code to the `statusCode` property
        this.statusCode = statusCode;

        // Assign the provided response data to the `data` property
        this.data = data;

        // Assign the provided message, or use the default message "Success"
        this.message = message;

        // Set `success` to `true` if `statusCode` is less than 400 (indicating success), otherwise `false`
        this.success = statusCode < 400;
    }
}

// Export the `ApiResponse` class so it can be used in other files
export { ApiResponse };
