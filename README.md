# Mini School Portal v2

Mini School Portal v2 is an updated and more robust version of the original Mini School Portal project. This project aims to provide a comprehensive management system for schools, including features for managing students, staff, classes, and subjects.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Mini School Portal v2 builds upon the foundation of the [original Mini School Portal](https://github.com/rolix202/mini_school_portal). This version introduces new features, improved performance, and better code structure, making it a more robust solution for school management.

## Features

- User authentication and authorization
- CRUD operations for students, staff, classes, and subjects
- Role-based access control (admin, class teacher, subject teacher)
- MongoDB integration for data persistence
- RESTful API for seamless frontend integration
- Error handling and validation

## Installation

To get started with Mini School Portal v2, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rolix202/mini_school_portal_v2.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd mini_school_portal_v2
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    NODE_ENV=
    PORT=5000 
    MONGO_CONN=
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

## Usage

Once the server is running, you can access the API endpoints via `http://localhost:5000`. Use tools like Postman or Thunder Client to test the API.

## API Endpoints

Here are some of the key API endpoints available in Mini School Portal v2:

- **Auth:**
  - `POST /api/v1/auth/login` - Login a user

- **Staff:**
  - `GET /api/v1/staffs` - Get all staff members
  - `POST /api/v1/staffs` - Create a new staff member

- **Students:**
  - `GET /api/v1/students` - Get all students
  - `POST /api/v1/students` - Create a new student

- **Classes:**
  - `GET /api/v1/class` - Get all classes
  - `POST /api/v1/class` - Create a new class

- **Subjects:**
  - `GET /api/v1/subjects` - Get all subjects
  - `POST /api/v1/subjects` - Create a new subject

For a full list of endpoints and their details, please refer to the documentation in the `routes` folder.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

