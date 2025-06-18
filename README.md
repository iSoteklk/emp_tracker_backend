# EMP Tracker Backend

This is the backend for the leaderboard application built with Express and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/kaweendras/leader-board-backend.git
   cd leader-board-backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```sh
   PORT = 4000
   MONGODB_URI = provided in the email
   JWT_SECRET = provided in the email
   ```

## Running the Application

To start the development server, run:

```sh
npm run dev
```

This will start the server using ts-node and watch for any changes in the source files.
