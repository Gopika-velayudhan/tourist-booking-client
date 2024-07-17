ExploreEpic-Touriest Booking Website

- [Introduction](#introduction)
- [Demo](#demo)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)
- [License](#license)



## **Introduction**
---
ExploreEpic is a tourist booking website where users can search for and book travel experiences. This MERN stack project includes a frontend deployed on Vercel and a backend deployed on AWS.  
NOTE: Please read the RUN section before opening an issue.


## Demo
---
The application is deployed and can be accessed through the following link:Exploreepic[http://tourist-booking-client-v3jf.vercel.app]
The website allows users to search for travel experiences, view details, and make bookings. For testing the checkout process, use the provided dummy card numbers or payment methods. Please DO NOT use real card numbers or data.


### `Run`

To install and run this project locally, follow these steps:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/exploreepic.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd exploreepic
    ```
3. **Install dependencies for both frontend and backend**:
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```
4. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory with the necessary environment variables (e.g., MongoDB URI, JWT secret, API keys for Razorpay, Cloudinary, Nodemailer, and Twilio).
5. **Start the development server**:
    ```bash
    cd backend
    npm start
    cd ../frontend
    npm start
    ```

## Technology

The application is built with:
- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Processing**: Razorpay
- **Media Management**: Cloudinary
- **Email/SMS Notifications**: Nodemailer, Twilio
- **Authentication**: JWT
The backend is deployed on AWS and the frontend is deployed on Vercel.
## Features

The application allows users to:
- Create an account, log in, or log out.
- Search for travel experiences.
- View travel experience details.
- Book travel experiences.
- View booking history.
- Update profile information.

Admins can:
- Log in to the admin panel.
- Manage users and travel experiences.
- View all bookings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Gopika kv



