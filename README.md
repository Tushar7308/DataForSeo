# DataForSeo

## Overview
DataForSeo is a web application that allows users to post SEO-related search tasks. The system then retrieves and processes search results from Google. This project consists of a **backend** built with **Node.js** and **MongoDB**, and a **frontend** built using **React**.

## Features
- Submit SEO search tasks
- Fetch results from Google via the DataForSEO API
- Display results in a structured format
- Interactive UI for task management

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Getting Started
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Tushar7308/DataForSeo.git
```

### 2️⃣ Install Dependencies
Navigate to both client and server directories and install required dependencies.
```bash
cd DataForSeo/DataForSeo-server
npm install

cd ../DataForSeo-client
npm install
```

### 3️⃣ Start the Backend Server
```bash
cd DataForSeo-server
node server.js
```
Backend will run on **http://localhost:5000**

### 4️⃣ Start the Frontend Client
```bash
cd ../DataForSeo-client
npm start
```
Frontend will run on **http://localhost:3000**

## Project Structure
```
DataForSeo/
├── DataForSeo-client/   # Frontend (React.js)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── ...
├── DataForSeo-server/   # Backend (Node.js, Express.js, MongoDB)
│   ├── routes/
│   ├── models/
│   ├── package.json
│   ├── ...
```

## API Endpoints (Backend)
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/task`        | Create a new SEO task |
| GET    | `/task/:id`    | Retrieve task details |
| GET    | `/get-results` | Fetch results from Google |

## Environment Variables
Create a **.env** file in the `DataForSeo-server` directory and configure the following:
```
PORT=5000
REACT_APP_API_BASE_URL=http://localhost:5000
API_USERNAME=API_USERNAME
API_PASSWORD=API_PASSWORD

```

---
