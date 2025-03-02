# Project Title

This project is a web application that connects startup founders with senior corporate professionals, investors, and mentors for mutual learning and networking. The platform includes various features such as chat functionality, events, ecosystem products, and more.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [Real-Time Communication](#real-time-communication)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage

Once the server is running, you can access the application at `http://localhost:5000`.

## Features

- **Connect with Founder**: Facilitates two-way learning between corporate professionals and startup founders.
- **Remuneration Options**: Mentors can charge in various methods, not limited to cash.
- **Choose Founders & Ventures**: Helps users select founders and ventures based on interest and competency.
- **Events**: Find and join relevant events, with the opportunity to become a speaker.
- **Ecosystem Products**: Access products from fellow founders and companies.
- **Verified Vendors**: Source from credible vendors at negotiated rates.
- **Chat Functionality**: Connect with mentors, founders, and investors through an intuitive chat feature.
- **Quiz Section**: Test startup knowledge with an interactive quiz section.

## Environment Variables

The following environment variables need to be set in your `.env` file:

- `PORT`: The port number on which the server will run.
- `MONGODB_URI`: The connection string for MongoDB.

## Routes

The project has the following routes:

- `/api/auth`: Authentication routes.
- `/api/messages`: Message-related routes.
- `/api/users`: User-related routes.
- `/api/profile`: Profile-related routes.
- `/api/search`: Search-related routes.
- `/api/events`: Event-related routes.
- `/api/blogs`: Blog-related routes.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Socket.IO**: Real-time communication.
- **dotenv**: Module for loading environment variables.
- **cookie-parser**: Middleware for parsing cookies.

## Real-Time Communication

This project uses Socket.IO to enable real-time communication for features like chat functionality. The Socket.IO setup is as follows:

