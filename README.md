# Shipping-Workflow-Database
📦 Shipping Workflow Tracker – Analytics Backend
📝 Overview
This project is a backend service for tracking and analyzing status changes of shipping-related tasks (cards) within a logistics workflow. It provides RESTful APIs for:

Logging status changes of cards by users.

Retrieving historical activity with filters.

Providing summary analytics: active users, card interactions, and recent activity.

🗂️ Tech Stack
Technology	Purpose
Node.js	Backend server runtime
Express.js	HTTP server & routing framework
MongoDB	NoSQL database
Mongoose	ODM for MongoDB
CORS	Enable cross-origin requests
Body-Parser	Parse JSON request bodies
HTML/CSS	(Optional) Frontend page in public/ folder

🛠️ Setup Instructions
Install MongoDB locally and ensure it's running.

Clone the repo and run:

bash
Copy
Edit
npm install
node server.js
Access:

Backend server: http://localhost:3002

HTML dashboard (if any): http://localhost:3002/

🔗 MongoDB Configuration
Database Name: shipping_dashboard

Collection Name: statuschanges

Documents follow this schema:

json
Copy
Edit
{
  "cardId": "abc123",
  "userName": "John",
  "statusChanges": 3,
  "date": "2025-07-17",
  "createdAt": "2025-07-17T12:00:00.000Z"
}
📥 API Endpoints
1. Add New Status Change
POST /api/status/add

Body:

json
Copy
Edit
{
  "cardId": "CARD001",
  "userName": "Alice",
  "statusChanges": 2,
  "date": "2025-07-17"
}
Response:

json
Copy
Edit
{ "message": "Status change added" }
2. Get Analytics Summary
GET /api/analytics/summary

Returns:

json
Copy
Edit
{
  "totalActiveUsers": 4,
  "totalStatusChanges": 18,
  "uniqueCards": 5,
  "averageDAU": "2.25",
  "dailyActiveUsers": [
    { "date": "2025-07-16", "users": 3 },
    { "date": "2025-07-17", "users": 4 }
  ],
  "recentActivity": [
    {
      "_id": "...",
      "cardId": "...",
      "userName": "...",
      "statusChanges": 2,
      "date": "2025-07-17",
      "createdAt": "2025-07-17T12:00:00.000Z"
    }
  ]
}
3. Get Status Change History with Filters
GET /api/status/changes?startDate=2025-07-01&endDate=2025-07-17&cardId=CARD001&userName=Ali

Supports query params:

startDate (optional)

endDate (optional)

cardId (optional, use "All" to ignore)

userName (optional, partial match supported)

✅ Features
Add status change activity logs

Filter activity by:

Date range

Card ID

Username (searchable)

Analytics Dashboard API

Total Active Users

Total Status Changes

Unique Cards

Average Daily Active Users (DAU)

Daily active users list

Recent 10 activities

🔄 Possible Improvements / Changes
Feature	Description
✅ Export to CSV/Excel	Add an endpoint to export status history
✅ Frontend dashboard	Display charts using Chart.js or Recharts
✅ User authentication	Add login system to track user roles
✅ Pagination	Add pagination for /status/changes
✅ Time-based filtering	Extend date filtering to include time
✅ Deletion or update endpoints	For correcting entries
✅ Cron-based analytics sync	Store computed analytics daily in a separate collection

🌐 Frontend (Optional)
If using index.html in /public, it’s automatically served at:

nginx
Copy
Edit
GET http://localhost:3002/
You can add a simple form to POST data, or JavaScript to show analytics.

🧪 Testing with Postman
You can test:

POST /api/status/add – use JSON body

GET /api/status/changes – try different filters

GET /api/analytics/summary – view the whole dashboard summary

📁 Project Structure
pgsql
Copy
Edit
📁 project-root
├── server.js             // main server logic
├── package.json
├── public/
│   └── index.html        // optional frontend
