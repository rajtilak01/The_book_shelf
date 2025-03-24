# Book Reader App

## Overview
Book Reader App is a web application built using Next.js that allows users to upload and read books in PDF format. It uses NextAuth for authentication and AWS for cloud storage, ensuring secure access to user-uploaded content.

## Features
- **User Authentication**: Secure sign-in and sign-out using NextAuth.
- **Book Upload**: Users can upload books (PDF format) to AWS storage.
- **Book Reading**: Read books directly within the app using an embedded PDF viewer.
- **Responsive UI**: Optimized for different screen sizes and devices.

## Tech Stack
- **Frontend**: Next.js (React-based framework)
- **Authentication**: NextAuth.js
- **Storage**: AWS S3 (for PDF file storage)
- **Database**: PostgreSQL (for user data and book metadata)
- **Backend**: Next.js API routes
- **Deployment**: Vercel / AWS (Optional)

## Installation
### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database (local or cloud-based)
- AWS S3 bucket for file storage
- Environment variables configured (see below)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rajtilak01/The_book_shelf.git
   cd The_book_shelf
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env.local` file with the required environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   DATABASE_URL=your_postgresql_connection_string
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=your_s3_bucket_name
   ```
4. Run database migrations (if using Prisma):
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` in your browser.

## Usage
- Sign up or log in using your preferred authentication method.
- Upload a PDF file, which gets stored securely in AWS S3.
- Click on an uploaded book to open and read it within the app.

## Deployment
### Vercel (Recommended)
- Deploy to Vercel by running:
  ```bash
  vercel
  ```
- Set up environment variables in the Vercel dashboard.

### AWS EC2 / Other Servers
- Build the project:
  ```bash
  npm run build
  ```
- Start the production server:
  ```bash
  npm start
  ```

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes and push:
   ```bash
   git commit -m "Added new feature"
   git push origin feature-name
   ```
4. Create a pull request.

## License
This project is licensed under the MIT License.

---

Happy coding! 🚀

