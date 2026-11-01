Wallet Backend API

A RESTful backend API for a personal finance management application. The application allows users to manage their income and expenses, create budgets, monitor spending habits, and track their financial activities through monthly and weekly financial reports.

Built with Node.js, Express.js, and MongoDB.

Features

Authentication & User Management

- User registration and login.
- Google OAuth 2.0 authentication.
- JWT-based authentication.
- HTTP-only cookie authentication.
- Email verification with OTP.
- Resend verification codes.
- Change email address with OTP verification.
- Change password.
- Update user profile information.
- Upload and update profile pictures using Cloudinary.
- Account deletion.
- Logout and token invalidation.

Transaction Management

- Create income and expense transactions.
- Retrieve all user transactions.
- Retrieve individual transactions.
- Edit existing transactions.
- Delete transactions.
- Filter transactions by category.
- User-specific transaction management.

Budget Management

- Create monthly budgets.
- Create weekly budgets.
- Set spending limits for different categories.
- Retrieve all budgets.
- Monitor spending against budget limits.
- Calculate remaining budget amounts.
- Generate category-based budget summaries.

Financial Analytics & Reports

- Monthly financial summaries.
- Total income and expenses.
- Monthly balance calculation.
- Weekly expense tracking.
- Six-month financial overview.
- Monthly income and expense comparisons.
- Category-based income analysis.
- Category-based expense analysis.
- Spending percentages and financial breakdowns.

Tech Stack

Technology| Purpose
Node.js| JavaScript runtime
Express.js| Backend framework
MongoDB| Database
Mongoose| MongoDB ODM
JWT| Authentication
bcryptjs| Password hashing
Google OAuth 2.0| Social authentication
Axios| HTTP requests
Cloudinary| Image storage
Nodemailer / Email Service| Email notifications

Project Structure

wallet-backend/
│
├── controllers/
│   ├── auth.controller.js
│   ├── transaction.controller.js
│   └── budget.controller.js
│
├── models/
│   ├── user.model.js
│   ├── transaction.model.js
│   └── budget.model.js
│
├── routes/
│
├── middleware/
│
├── utils/
│
├── emailService/
│
├── server.js
├── package.json
└── .env

Installation

1. Clone the repository

git clone YOUR_REPOSITORY_URL

2. Navigate into the project

cd wallet-backend

3. Install dependencies

npm install

4. Configure environment variables

Create a ".env" file in the root directory.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_TOKEN_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_google_oauth_redirect_uri

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development

Configure any additional environment variables required by your email service.

5. Start the development server

npm run dev

Or:

npm start

API Modules

The API is organized into three main modules:

Module| Description
Authentication| User registration, login, OAuth, verification, and profile management
Transactions| Income and expense management
Budgets| Budget creation, spending limits, and financial summaries

Authentication

Protected endpoints require valid authentication.

The API uses JSON Web Tokens (JWT) to authenticate users and HTTP-only cookies for session management.

Google OAuth 2.0 is also supported for users who prefer signing in with their Google accounts.

Database Models

The application uses MongoDB with Mongoose for data modeling.

User

- Name
- Email
- Password
- Profile picture
- Google ID
- Email verification status
- Last login
- Token version

Transaction

- User reference
- Transaction type (income or expense)
- Title
- Amount
- Category
- Transaction date

Budget

- User reference
- Title
- Spending limit
- Period (weekly or monthly)
- Category
- Start date
- End date

Security

The backend incorporates several security mechanisms:

- Password hashing with bcryptjs.
- JWT authentication.
- HTTP-only authentication cookies.
- Token versioning for session invalidation.
- Email verification.
- User-specific database queries.
- Google OAuth 2.0 authentication.

Future Improvements

- Transaction pagination and advanced filtering.
- Recurring transactions.
- Automated budget alerts.
- Financial goals and savings tracking.
- Export financial reports to PDF and CSV.
- Improved financial analytics.
- API rate limiting.
- Comprehensive automated testing.

Author
Olasupu Omotayo
Backend Developer

Built as a personal finance management backend project using Node.js, Express.js, and MongoDB.

---

Wallet Backend API – Simplifying personal finance management through organized transactions, budgeting, and financial insights.
