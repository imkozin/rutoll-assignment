# Product App Manager

## Table of Contents
- [Description](#desciption)
- [Technologies Used](#technologies-Used)
- [Features](#features)
- [Configuration](#configuration)
- [Usage](#usage)
- [Possible Improvements](#possible-improvements)
- [Contribute](#contribute)

## Description

Product App Managere is a full-stack web application built with Flask for the backend, Vue 2 for the frontend, and styled using BootstrapVue. The application provides users with the list of products. For registered users it allows to edit product details, delete products and create new products.

## Technologies Used

- **Backend:** 
  - **Flask:** A Python web framework for building the backend.
  - **ElephantSQL:** Online database used for storing user information.
- **Frontend:** 
  - **Vue 2:** JavaScript framework for building user interfaces.
  - **BootstrapVue:** Bootstrap components for Vue.js for easy and responsive styling.

## Features

- **User Authentication:** Secure user authentication system to ensure only authorized users can access the application.
- **Product Management:** Efficiently manage product information, including creation, editing, and deletion of products.
- **Search Functionality:** Enable users to easily search for products by name.
- **Error Handling:** Implement robust error handling to provide informative messages and guide users in case of errors or invalid inputs.
- **Pagination:** Organize large sets of data into paginated lists for easier navigation and improved performance.
- **Validation:** Validate user inputs to prevent errors and ensure data integrity.
- **Security:** Implement security best practices, such as encryption, to safeguard user data and prevent unauthorized access.


## Configuration
### Backend and API
   The backend of the Flask-Vue-App serves as the server-side component responsible for handling HTTP requests, managing the PostgreSQL database, and serving data to the frontend. This section provides details on how to connect to the database, the technologies used, and an overview of the API endpoints.
   - ### PostgreSQL Database
   The backend of this project uses a PostgreSQL relational database to store and manage user and organization data. PostgreSQL is a powerful, open-source relational database system known for its reliability and performance. You can find the database connection information in the app.py file.
   - ### Database Configuration
   To connect to the PostgreSQL database, update the database connection details in the Flask application configuration. The database connection is configured in the app.py file. The application uses the SQLAlchemy library to interact with the database. Here's an example of the database configuration:

    ```
    from flask import Flask
    from flask_sqlalchemy import SQLAlchemy
    import os
    # Load environment variables from .env file
    load_dotenv()

    # create the app
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

    # this variable, db, will be used for all SQLAlchemy commands
    db = SQLAlchemy(app)
    ```

Replace DATABASE_URL with your variable name from .env file os.environ.get('*DATABASE_URL*') or you can give a direct link with your PostgreSQL connection details, including the username, password, host, port, and database name e.g. 

    ```
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/your-database-name'
    ``` 
    
### Frontend
The frontend of the Flask-Vue-App is built using the popular JavaScript library Vue. Vue allows for the development of dynamic and responsive user interfaces. This section provides an overview of the frontend architecture, the technologies used, and how to run the frontend application.
   - ### Frontend Architecture
   The frontend of this project follows a component-based architecture, where the user interface is divided into modular components that can be reused and combined to build complex views. Here are some key components used in the frontend:
   - **Navbar:** The navigation bar component displayed at the top of the application. It provides navigation links and user authentication options.
   - **Home:** The start page where users can see list of available products.
   - **Login and Register:** The login and registration page where users can sign in or create new accounts.
   - **Create and Edit pages:** The pages where users have the ability to change product details information (incl. price, name, description) and to add new products to the database.
   - **PageNotFound:** This page ensures a smooth user experience. If an unauthenticated user attempts to access pages that are intended only for logged-in users, they will be automatically redirected to our "PageNotFound" page.

## Getting Started
### Prerequisites
Before running the project, make sure you have the following prerequisites:

- Python (>=3.7)
- Node.js (>=12)
- npm (Node Package Manager)
- Flask
- Vue

### Installation
To get started, follow these steps:

- Clone the repository:
```
git clone https://github.com/imkozin/vue-flask.git
```
- Navigate to the project directory:
   - cd backend
   - Running the Backend
   - Create a Virtual Environment (Optional): It's recommended to create a virtual environment to isolate your project dependencies. You can do this using the venv module that comes with Python. Open your terminal and run: python -m venv venv

- Install Python dependencies:
```
pip install -r requirements.txt
```

Once the dependencies are installed, you can start the development server by running:
```
python3 app.py
```

- Running the Frontend
To run the frontend of the Flask-Vue-App locally, follow these steps:
   - Make sure you have Node.js installed on your system.
   - Navigate to the frontend directory in your project folder using the terminal.
   - Install the required dependencies by running the following command:
    ```
    npm install
    ```
   - Once the dependencies are installed, you can start the development server by running:
   ```
   npm run serve
   ```
This will launch the development server, and your Vue application will be available in your web browser at http://localhost:8080.

## Usage
- Register a new user.
- Log in to have access to the product management features.
- Edit product details or add new products.
- Manage product list by adding, editing and removing products.

## Possible improvements

1. **Structure existing products into categories:** This improvement can help extend functionality by adding extra attributes like categories e.g. Adding categories or types will allow users to search for products more easily by name, category, or other attributes.
2. **Improve the registration system:** Enhancements like a "Forgot Password" feature and the use of cookies for session management can improve user experience and security. These additions can simplify account recovery and user authentication.
3. **Role-Based Access Control:** Define different user roles with varying levels of access permissions to control data access and manipulation.
4. **Feedback Mechanism:** Allow users to provide feedback or report issues, fostering continuous improvement of the application.
5. **Customizable Settings:** Provide users with options to customize their experience, such as theme selection or notification preferences.
6. **API Integration:** Integrate with external APIs to enhance functionality, such as fetching additional product information or enabling third-party services.
7. **Testing:** Conduct thorough testing, including unit tests and end-to-end tests, to ensure the reliability and stability of the application.

## Contribute
We welcome contributions from the community! Feel free to report issues, suggest enhancements, or submit pull requests to help us improve this application.




