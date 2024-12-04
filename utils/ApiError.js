// Define a custom error class `ApiError` that extends the built-in `Error` class
class ApiError extends Error { 

    // Constructor is called when a new instance of `ApiError` is created
    constructor(
        statusCode,                // The HTTP status code representing the type of error (e.g., 404, 500)
        message = "Something went wrong", // Default error message if none is provided
        errors = [],               // An array to hold additional error details, defaults to an empty array
        stack = ""                 // Optional stack trace for debugging, defaults to an empty string
    ) {
        // Call the parent `Error` class constructor with the `message` argument
        super(message);

        // Assign the HTTP status code to the `statusCode` property
        this.statusCode = statusCode;

        // A placeholder for additional data related to the error, initialized to `null`
        this.data = null;

        // Assign the error message to the `message` property (already set by `super`, but explicitly reassigned here)
        this.message = message;

        // A flag indicating the success of the operation, always `false` for errors
        this.success = false;

        // Assign any additional error details to the `errors` property
        this.errors = errors;

        // If a custom stack trace is provided, use it
        if (stack) {
            this.stack = stack;
        } else {
            // Otherwise, generate a stack trace, excluding this constructor from the trace
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Export the `ApiError` class so it can be used in other files
export { ApiError };
