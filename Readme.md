# OTP Based Login System

This is a simple OTP based login system built using Node.js, Express.js, and MongoDB.

## Features

* User registration with email and password
* User login with email and password
* OTP verification for login
* User logout

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` file and add the following environment variables:
	* `MONGODB_URI`: MongoDB connection string
	* `SESSION_SECRET`: Secret key for session management
    * `RESEND_API_KEY`: Resend Api key
    * `NODE_ENV`: production or development

4. Run the server using `npm start`

## Endpoints

### Register User

* `POST /api/auth/register`
	+ Request Body: `{ email, password, userID }`
	+ Response: `{ message: "User registered successfully" }`

### Login User

* `POST /api/auth/login`
	+ Request Body: `{ email, password }`
	+ Response: `{ message: "OTP sent to your email" }`

### Verify OTP

* `POST /api/auth/verify-otp`
	+ Request Body: `{ email, otp }`
	+ Response: `{ message: "OTP verified successfully" }`

### Logout User

* `POST /api/auth/logout`
	+ Request Body: None
	+ Response: `{ message: "Logged out successfully" }`

## Frontend

The frontend for this project is built using React and can be found in the `client` directory. The frontend is set up to use the above endpoints to register, login, and logout users.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
