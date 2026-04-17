# Movie Booking Backend

A comprehensive backend API for a movie booking platform, similar to BookMyShow, built with Node.js, Express, and MongoDB. This project enables users to browse movies, book theatre seats, manage theatres, handle payments, and more, with robust authentication and role-based access control.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access (Customer, Admin, Client)
- **Movie Management**: CRUD operations for movies including details like cast, trailer, and release status
- **Theatre Management**: Manage theatres with location details and associated movies
- **Booking System**: Create and manage movie bookings with seat selection and payment integration
- **Payment Handling**: Track payment statuses for bookings
- **Validation & Middleware**: Comprehensive request validation and error handling
- **MongoDB Integration**: Efficient data storage with Mongoose ODM
- **RESTful API**: Well-structured endpoints for all operations

## Tech Stack

| Component          | Technology          | Version |
|--------------------|---------------------|---------|
| Runtime           | Node.js            | Latest |
| Web Framework     | Express             | 5.2.1  |
| Database          | MongoDB + Mongoose | 9.1.6  |
| Authentication    | JWT (jsonwebtoken)  | 9.0.3  |
| Password Hashing  | Bcrypt              | 6.0.0  |
| Body Parsing      | body-parser         | 2.2.2  |
| Environment Config| dotenv              | 17.2.4 |
| Dev Tool          | nodemon             | 3.1.11 |

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Backend_MovieBooking_Project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see Environment Setup section).

4. Start the server:
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

The server will start on the configured port (default: 3000).

## Environment Setup

Create a `.env` file in the root directory with the following variables:



- `PORT`: Server port (default: 3000)
- `DB_NAME`: MongoDB database name
- `DB_URL`: MongoDB connection URL
- `AUTH_KEY`: Secret key for JWT token generation

Ensure MongoDB is running locally or update `DB_URL` for a remote database.

## Data Models

### User
- **Fields**: name, email, password, userRole, userStatus
- **Roles**: CUSTOMER, ADMIN, CLIENT
- **Status**: APPROVED, PENDING, REJECTED
- **Features**: Password hashing, email validation, password verification method

### Movie
- **Fields**: name, description, casts (array), trailerUrl, language, releaseDate, director, releaseStatus
- **Default Status**: RELEASED
- **Validation**: Minimum lengths for name and description

### Theatre
- **Fields**: name, description, city, pincode, address, movies (array of Movie ObjectIds)
- **Relationships**: References Movie model

### Booking
- **Fields**: theatreId, movieId, userId, timing, noOfSeats, totalCost, status
- **Status**: PROCESSING, CANCELLED, SUCCESSFUL
- **Default Status**: PROCESSING
- **Relationships**: References Theatre, Movie, and User models

### Payment
- **Fields**: bookingId, amount, status
- **Status**: PENDING, FAILED, SUCCESS
- **Default Status**: PENDING
- **Relationship**: References Booking model

## API Endpoints

All endpoints are prefixed with `/mba/api/v1/`.

### Authentication
| Method | Endpoint          | Auth Required | Description |
|--------|-------------------|---------------|-------------|
| POST   | `/auth/signup`    | No            | Register a new user |
| POST   | `/auth/signin`    | No            | Login and get JWT token |
| PATCH  | `/auth/reset`     | Yes           | Reset password |

### User
| Method | Endpoint      | Auth Required | Description |
|--------|---------------|---------------|-------------|
| PATCH  | `/user/:id`   | Yes (Admin)   | Update user role or status |

### Movie
| Method | Endpoint        | Auth Required     | Description |
|--------|-----------------|-------------------|-------------|
| POST   | `/movies`       | Yes (Admin/Client)| Create a new movie |
| DELETE | `/movies/:id`   | Yes (Admin/Client)| Delete a movie |
| GET    | `/movies/:id`   | No                | Get movie by ID |
| PUT    | `/movies/:id`   | Yes (Admin/Client)| Update movie |
| PATCH  | `/movies/:id`   | Yes (Admin/Client)| Partial update movie |
| GET    | `/movies`       | No                | Get all movies (with optional filtering) |

### Theatre
| Method | Endpoint                          | Auth Required     | Description |
|--------|-----------------------------------|-------------------|-------------|
| POST   | `/theatres`                       | Yes (Admin/Client)| Create a new theatre |
| DELETE | `/theatres/:id`                   | Yes (Admin/Client)| Delete a theatre |
| GET    | `/theatres/:id`                   | No                | Get theatre by ID |
| GET    | `/theatres`                       | No                | Get all theatres (with filters) |
| PATCH  | `/theatres/:id`                   | Yes (Admin/Client)| Update theatre |
| PUT    | `/theatres/:id`                   | Yes (Admin/Client)| Update theatre |
| PATCH  | `/theatres/:id/movies`             | Yes               | Add/remove movies from theatre |
| GET    | `/theatres/:id/movies`             | No                | Get movies in theatre |
| GET    | `/theatres/:theatreId/movies/:movieId` | No          | Check if movie exists in theatre |

### Booking
| Method | Endpoint      | Auth Required | Description |
|--------|---------------|---------------|-------------|
| POST   | `/bookings`   | Yes           | Create a new booking |

## Usage Examples

### User Registration
```bash
POST /mba/api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userRole": "CUSTOMER"
}
```

Response:
```json
{
  "err": {},
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "userRole": "CUSTOMER",
    "userStatus": "APPROVED"
  },
  "message": "User created successfully",
  "success": true
}
```

### Login
```bash
POST /mba/api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "err": {},
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "userRole": "CUSTOMER",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Signin successful",
  "success": true
}
```

### Create Movie (Admin/Client only)
```bash
POST /mba/api/v1/movies
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Inception",
  "description": "A mind-bending thriller",
  "casts": ["Leonardo DiCaprio", "Marion Cotillard"],
  "trailerUrl": "https://example.com/trailer",
  "language": "English",
  "releaseDate": "2010-07-16",
  "director": "Christopher Nolan"
}
```

### Get All Movies
```bash
GET /mba/api/v1/movies
```

### Create Booking
```bash
POST /mba/api/v1/bookings
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "theatreId": "60d5ecb74b24c72b8c8b4567",
  "movieId": "60d5ecb74b24c72b8c8b4568",
  "timing": "2023-12-25T18:00:00Z",
  "noOfSeats": 2
}
```

## Project Structure

```
Backend_MovieBooking_Project/
├── index.js                    # Main entry point
├── package.json                # Dependencies and scripts
├── Controllers/                # Route handlers
│   ├── auth.controller.js
│   ├── booking.controller.js
│   ├── movie.controller.js
│   ├── theatre.controller.js
│   └── user.controller.js
├── Middlewares/                # Validation and auth middleware
│   ├── auth.middlewares.js
│   ├── booking.middleware.js
│   ├── movie.middlewares.js
│   ├── theatre.middleware.js
│   └── user.middlewares.js
├── models/                     # Mongoose schemas
│   ├── booking.model.js
│   ├── movie.model.js
│   ├── payment.model.js
│   ├── theatre.model.js
│   └── user.model.js
├── routes/                     # API route definitions
│   ├── auth.routes.js
│   ├── booking.route.js
│   ├── movie.routes.js
│   ├── theatre.routes.js
│   └── user.routes.js
├── Services/                   # Business logic layer
│   ├── booking.services.js
│   ├── movie.services.js
│   ├── theatre.services.js
│   └── user.services.js
└── utils/                      # Utilities and constants
    ├── constants.js
    └── responseBody.js
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact the development team.
