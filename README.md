# Pet Heaven: Animal Shelter Data Collection & Full-Stack Web Application

Pet Heaven is a full-stack web application developed to support the efficient operation of an animal shelter.

The application focuses on **systematically collecting and storing operational data** through various forms, including Adoption, Volunteer, Donation, and Pet Release, while also implementing a **secure user authentication system with real email verification**.

The project demonstrates the integration of **structured data collection, MongoDB data persistence, secure authentication, email verification, and frontend/backend communication** within a practical animal shelter management scenario.

---

## ✨ Key Features

- **Adoption Data Collection** – Collects adoption applicant information and pet preferences
- **Volunteer Management** – Records volunteer details, roles, and availability
- **Donation Data Collection** – Stores donation-related information
- **Pet Release Management** – Records information about animals being relinquished
- **MongoDB Data Persistence** – Stores collected operational data in MongoDB
- **Email Verification** – Sends a 6-digit verification code during registration
- **Secure Password Validation** – Enforces multiple password requirements
- **Password Hashing** – Protects passwords using `bcryptjs`
- **JWT Authentication** – Manages authenticated user sessions
- **Dynamic Navigation** – Updates the interface according to login state
- **User Profile** – Displays authenticated user information
- **Logout** – Securely ends the authenticated session

---

## Core Data Collection Features

This application includes several key forms designed for specific data collection purposes:

- **Adoption Form:** Collects data on adoption applicants, including personal information and preferred pet types, providing **insights into adoption demand and applicant characteristics**.

- **Volunteer Form:** Gathers volunteer details, preferred roles, and availability, supporting **human resource management and volunteer activity tracking**.

- **Donation Form:** Records donation amounts and related information, enabling **financial analysis and understanding of donation patterns**.

- **Pet Release Form:** Captures detailed information about animals being relinquished, including name, age, breed, health information, and reason for release, contributing to **animal welfare and shelter intake data**.

---

## Database & Data Persistence

All collected data is stored in **MongoDB, a flexible NoSQL database**.

**Mongoose ODM (Object Data Modeling)** is used to efficiently manage and validate data according to defined schemas for each form.

Sensitive information such as user passwords is **never stored as plaintext**. Passwords are one-way hashed using `bcryptjs` before being stored in MongoDB.

---

# 🔐 User Authentication & Email Verification

Pet Heaven implements a multi-step user registration and authentication system to provide a more secure and realistic signup experience.

## Authentication Features

- **Email Verification:** Sends a unique 6-digit verification code to the user's email address
- **Time-Limited Verification:** Verification codes expire after 10 minutes
- **Resend Code:** Users can request another verification code if necessary
- **Password Validation:** Passwords must satisfy multiple security requirements
- **Password Hashing:** Passwords are hashed using `bcryptjs` before database storage
- **JWT Authentication:** Successful login generates a JSON Web Token
- **Dynamic Navigation:** Navigation changes according to authentication state
- **Profile Page:** Authenticated users can access their profile information
- **Logout:** Users can securely end their authenticated session

---

# 📧 Email Verification & Secure Registration Flow

The signup process is divided into three stages:

**1. Details → 2. Verify Email → 3. Password**

An account cannot be fully registered until the user successfully verifies access to the provided email address.

---

## Step 1 — Verification Email

After entering the required registration details, Pet Heaven generates a **6-digit verification code** and sends it to the user's email address.

The verification code automatically expires after **10 minutes**.

Below is an example of the verification email received during registration:

![Pet Heaven Email Verification](images/email_verification_email.png)

---

## Step 2 — Verify Email Address

The user enters the **6-digit verification code** received by email.

The application validates the submitted code before allowing the user to continue to password creation.

Users can also request a new verification code using the **Resend Code** option.

![Email Verification Code](images/email_verification_code.png)

---

## Step 3 — Secure Password Setup

Once the email address has been successfully verified, the user can create a password.

![Password Setup](images/password_setup.png)

The application performs **real-time password validation**.

A valid password must contain:

- At least **8 characters**
- At least **one uppercase letter**
- At least **one lowercase letter**
- At least **one number**
- At least **one special character**

Each requirement is dynamically updated as the user types.

When a requirement is satisfied, the interface provides immediate visual feedback.

![Password Validation](images/password_validation.png)

After all requirements are satisfied and the confirmation password matches, the user can complete registration.

Before the password is stored in MongoDB, it is **one-way hashed using `bcryptjs`**, ensuring that the original plaintext password is never stored.

---

## 🔄 Authentication Flow

```text
User enters registration details
            ↓
6-digit verification code generated
            ↓
Verification email sent to user
            ↓
User enters verification code
            ↓
Verification code validated
            ↓
Email successfully verified
            ↓
User creates secure password
            ↓
Password requirements validated
            ↓
Password hashed with bcryptjs
            ↓
User account stored in MongoDB
            ↓
Registration completed
            ↓
User can log in
            ↓
JWT issued for authenticated session
```

This authentication workflow demonstrates the integration of **frontend validation, backend authentication logic, email-based verification, secure password handling, and database persistence** within a full-stack web application.

---

# 📊 Demonstrating Data Persistence with MongoDB Compass

This project demonstrates the **successful storage of submitted form data in a MongoDB database within a local development environment**.

The screenshots below show how data collected through the application is structured and stored in its corresponding MongoDB collection.

---

## MongoDB Compass Overview

MongoDB Compass provides an overview of the database and collections used by Pet Heaven.

![MongoDB Compass: Database and Collections Overview](images/compass_overview.png)

---

## Adoption Form Data

Here's an example of the Adoption Form filled out on the web application:

![Adoption Form: Data Entry on Web Application](images/adoption_form_input.png)

The submitted data is stored in the `adoptions` collection within MongoDB Compass:

![Adoption Data: Stored in MongoDB Compass](images/adoption_data_compass.png)

---

## Volunteer Form Data

Here's an example of the Volunteer Form filled out on the web application:

![Volunteer Form: Data Entry on Web Application](images/volunteer_form_input.png)

The submitted data is stored in the `volunteers` collection:

![Volunteer Data: Stored in MongoDB Compass](images/volunteer_data_compass.png)

---

## Donation Form Data

Here's an example of the Donation Form filled out on the web application:

![Donation Form: Data Entry on Web Application](images/donation_form_input.png)

The submitted data is stored in the `donates` collection:

![Donation Data: Stored in MongoDB Compass](images/donation_data_compass.png)

---

## Pet Release Form Data

Here's an example of the Pet Release Form filled out on the web application:

![Pet Release Form: Data Entry on Web Application](images/release_form_input.png)

The submitted data is stored in the `releases` collection:

![Pet Release Data: Stored in MongoDB Compass](images/release_data_compass.png)

---

# 👤 User Account Data

After completing email verification and secure password setup, the registered user account is stored in the `users` collection in MongoDB.

## User Registration

Here's an example of the Signup Form on the web application:

![Signup Form: User Registration on Web Application](images/signup_form_input.png)

## Hashed Password Storage

The user's password is **not stored as plaintext**.

Before being persisted to MongoDB, it is hashed using `bcryptjs`.

The following screenshot demonstrates how the registered user and hashed password are stored in the `users` collection:

![User Data: Hashed Password Stored in MongoDB Compass](images/user_data_hashed_password_compass.png)

---

# 🔑 User Login

Registered users can log in using their verified account credentials.

After successful authentication, the application generates a **JWT token** for authentication and session management.

The navigation interface is also dynamically updated according to the user's authentication state.

Here's an example of a successful login:

![Successful Login](images/login_successful.png)

---

# 📈 Significance from a Big Data Perspective

This project goes beyond simple web development; it showcases a **practical approach to structuring and collecting diverse types of data generated from real-world service operations**.

The collected data serves as a foundation for future Big Data analysis and applications, such as:

- **Predictive Modeling:** Forecasting adoption success rates for specific animal types or volunteer retention

- **Operational Optimization:** Optimizing volunteer scheduling based on peak activity times

- **Donation Analysis:** Identifying donation patterns and evaluating fundraising activity

- **Insight Generation:** Deriving insights into common health issues, behavioral traits, and reasons for animal relinquishment

- **Data Pipeline Foundation:** The form-based data collection implemented here represents the crucial first step of **data ingestion** within a broader data analytics pipeline

---

# 🛠️ Technologies Used

## Frontend

- `React.js`
- `React Router DOM`
- `JavaScript`
- `HTML`
- `CSS`

## Backend

- `Node.js`
- `Express.js`
- `Mongoose`
- `cors`

## Database

- `MongoDB`
- `MongoDB Compass`

## Authentication & Security

- `bcryptjs`
- `jsonwebtoken (JWT)`
- Email Verification
- 6-Digit Verification Codes
- Password Validation

## Email Service

- `Resend`

## Development Tools

- `npm`
- `VS Code`
- `Git`
- `GitHub`

---

# 🚀 Setup & Run Locally

To run this project on your local machine, follow these steps.

## Prerequisites

- **Node.js** – v18 or higher recommended
- **npm** or **yarn**
- **MongoDB** – Installed and running locally
- **MongoDB Compass** – Optional, but recommended for data verification

---

## Installation

### 1. Clone the Repository

```bash
git clone [YOUR_GITHUB_REPOSITORY_URL]
cd your-project-name
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

# Environment Variables Setup

Create `.env` files for the required environment variables.

Environment files should **never be committed to GitHub** because they may contain API keys, database credentials, and authentication secrets.

## `server/.env`

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/petheaven
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_secure_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

## `client/.env`

```env
REACT_APP_API_URL=http://localhost:5001
```

> ⚠️ Never commit your real `JWT_SECRET`, `RESEND_API_KEY`, database credentials, or other sensitive environment variables to GitHub.

---

# ▶️ Run the Application

## 1. Start the Backend Server

Open the first terminal window and navigate to the `server` directory:

```bash
cd server
node app.js
```

Or, if `nodemon` is installed:

```bash
nodemon app.js
```

You should see messages indicating that the server is running and successfully connected to MongoDB.

---

## 2. Start the Frontend Client

Open another terminal window:

```bash
cd client
npm start
```

The React application should then be available at:

```text
http://localhost:3000
```

---

# 🔍 Access & Verify Data

## 1. Access the Application

Open the application in your web browser:

```text
http://localhost:3000
```

## 2. Interact with the Forms

Navigate to the:

- Adoption Form
- Volunteer Form
- Donation Form
- Pet Release Form

Fill out and submit the forms.

## 3. Verify Data Storage

Open **MongoDB Compass** and connect to your local MongoDB instance.

Navigate to the `petheaven` database and inspect the following collections:

```text
adoptions
volunteers
donates
releases
users
```

The submitted information should appear in its corresponding collection.

For registered users, the stored password should appear as a **bcrypt hash instead of the original plaintext password**.

---

# 🔮 Future Enhancements

This project provides a foundation for additional features and improvements:

- **Cloud Deployment:** Deploying the frontend, backend, and database using cloud services such as Vercel, Render, and MongoDB Atlas

- **Role-Based Access Control:** Adding separate permissions for regular users, shelter staff, and administrators

- **Protected Routes:** Restricting administrative and account-specific pages according to authentication status and user roles

- **Password Recovery:** Implementing a secure forgot-password and password-reset workflow using email verification

- **Data Visualization & Analytics Dashboard:** Visualizing adoption rates, volunteer activity, animal intake, and donation trends using libraries such as `Chart.js`

- **Advanced Data Analysis:** Applying machine learning techniques to collected shelter data for adoption prediction, volunteer demand forecasting, and donation analysis

- **Cloud Database:** Migrating the local MongoDB database to MongoDB Atlas for production deployment

---

# 📌 Project Summary

Pet Heaven demonstrates the integration of:

**React Frontend → Node.js/Express Backend → Email Verification → Secure Authentication → MongoDB Data Persistence**

The project combines **full-stack software development, authentication security, and structured data collection**, while providing a foundation for future data analytics and machine learning applications.
