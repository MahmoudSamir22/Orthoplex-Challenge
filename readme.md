# Development Challenge BACKEND (NodeJS + SQL)

## Project Description

This project is a backend challenge for a backend developer position. It involves building a **User Management API** using **Node.js**, **TypeScript**, and **MySQL** as the database with **Prisma** as the ORM. The API handles various user management features, such as authentication, user details management, and reporting.

## Features

- **Auth Module**

  - **Signup**: Register a new user.
  - **Login**: Authenticate and login a user.

- **User Module**

  - **Get User Details**: Fetch details of a specific user.
  - **Update User Details**: Update user information.
  - **Delete User Details**: Delete a user’s information.
  - **Get All Users**: Fetch a list of all registered users along with their verification status (Registered & Verified).
  - **Verify User**: Verify a user's email to activate their account.


- **Reports**
  - **Top Users by Login Frequency**: Get a list of the most active users based on login frequency.
  - **Inactive Users**: Retrieve a list of users who have been inactive for a defined period.

## Installation Instructions

### Prerequisites

- **Node.js** (v20.x or later)
- **MySQL** server running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/MahmoudSamir22/Orthoplex-Challenge.git
   cd Orthoplex-Challenge
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Copy `.env.sample` to `.env:`
   ```bash
   cp .env.sample .env
   ```
   - Update the `.env` file with your Jwt Secrets, Port and DATABASE_URL connection url ``` mysql://<User_Name>:<Password>@localhost:<DB_PORT>/<DB_NAME> ```.
4. Run the database migrations with Prisma:

   ```bash
   npx prisma migrate dev
   ```

   OR

   ```bash
   npx prisma db push
   ```

5. Build the server:
   ```bash
   npm run build
   ```
6. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` (by default).

## Postman Setup for API Testing

To make it easy for you to test the API, you can use Postman to import the API collection and create an environment for your local server.

### Steps:
## Important Configuration

**Before you begin testing the API, make sure to prefix the Env-URL with `/api`.**  
This is a necessary configuration for correctly interacting with the API in Postman.

For example:
- Instead of `GET localhost:3000/users`, use `GET localhost:3000/api/users`
- Instead of `POST localhost:3000/login`, use `POST localhost:3000/api/login`
#### 1. **Create a Postman Environment**  
   - Open Postman.
   - In the top-left corner, click on the **Environment** dropdown and select **Manage Environments**.
   - Click on the **Add** button to create a new environment.
   - Name the environment (e.g., `Development API`).
   - Add the following variables:
     - `{{URL}}` (this will represent your local server URL, e.g., `http://localhost:<Your_Fav_Port>/api`).  
        `NOTE`: Use same port as the PORT in `.env` file
   - Click **Add** and then **Close**.

#### 2. **Import the Postman Collection**  
   - Download the `.json` file [API Collection](./@docs).
   - In Postman, click on the **Import** button.
   - Select **Upload Files** and choose the `.json` collection file you just downloaded.
   - Click **Open**, and the collection will be imported into Postman.

#### 3. **Set the Active Environment**  
   - In the top-right corner of Postman, select the environment you created earlier (e.g., `Development API`) from the environment dropdown.

#### 4. **Test the Endpoints**  
   - Once the collection and environment are set up, you can start testing the endpoints.
   - For example, to test the **Signup** endpoint, find the **Signup** request in the collection, click on it, and click **Send**.
   - Make sure your local server is running on `http://localhost:3000` (or the URL you set for `{{URL}}`).

#### 5. **Example**:  
   - **Login Request**:  
     To authenticate a user, click on the **Login** endpoint in Postman. In the request body, add the required fields (e.g., email and password), then click **Send**. You should receive a response with a token that you can use for subsequent authenticated requests.

## Technologies Used

- **Node.js** – Runtime environment.
- **Express.js** – Web framework for handling HTTP requests.
- **TypeScript (TS)** – Type-safe JavaScript for better development.
- **Prisma** – ORM for interacting with the MySQL database.
- **Joi** – Validation library for user input.
- **Jest** – Testing framework for writing unit and integration tests.
- **MySQL** – Database server.

## Admin Credentials

For testing and development, you can use the following **admin credentials**. These credentials are necessary for performing administrative tasks such as creating, updating, or deleting users.  
`NOTE:` This Account will be created after you run the server atleast once

### Admin Credentials (For Development Purposes)
- **Email**: `admin@email.com`
- **Password**: `T3st_P@s$w0rd`