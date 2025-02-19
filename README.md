Leaderboard

This is a simple leaderboard application that allows users to be added and deleted. Users' scores (points) can be modified, and the leaderboard will automatically update and reorder based on their points.

The app is built using React and TypeScript, and it uses a mock server with json-server to simulate a backend for managing users.
Project Structure

The project consists of the following files:

    Leaderboard.tsx: The main React component that renders the leaderboard, allows users to interact with it (add, points update, delete users), and handles sorting based on user points.
    styles.ts: Contains the styled components used to style the leaderboard.
    server.js: A mock server using json-server that simulates a RESTful API to handle user data.
    db.js: Simulates the database where user data is stored in the mock API.

Setup

Follow these steps to get the project up and running:

1. Clone the Repository

Clone the repository to your local machine:

git clone <https://github.com/Neginnn>
cd leaderboard

2. Install Dependencies

nvm use 20.0.0

Run the following command to install the necessary dependencies:

yarn

3. Start the Mock Server

Start the mock server using json-server:

json-server --watch db.json --port 5050

This will start the server on http://localhost:5050 and serve the user data from the mock database. 4. Start the React App

In a separate terminal window, start the React app:

yarn dev

The app will open in your default web browser at http://localhost:3070/.
Features

    Search Users: Use the search bar to filter users by name.
    Add Users: Add new users with their name, age, and address. Each user starts with 0 points.
    Update Points: Click the "+" or "-" buttons to increase or decrease a user's points.
    Sort Users: Click the column headers (Name or Points) to sort the leaderboard by name or points in ascending or descending order.
    Delete Users: Click the "X" button to delete a user from the leaderboard.

Files Overview

    Leaderboard.tsx:
        Displays the user list.
        Provides buttons to add, update, and delete users.
        Manages sorting and filtering of the leaderboard.
    styles.ts:
        Contains all the styling for the leaderboard using styled-components.
    server.js:
        Sets up the mock server using json-server to handle CRUD operations (add, update, delete) for users.
    db.js:
        Simulates a database with the initial list of users stored as a JSON file.

Technologies Used

    React: A JavaScript library for building user interfaces.
    TypeScript: A superset of JavaScript that adds static types.
    json-server: A simple tool for setting up a RESTful API for your project.
    Styled-Components: A library for styling React components with tagged template literals.
