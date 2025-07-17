# Shipping Analytics Dashboard

A clean and simple dashboard for visualizing shipping analytics data.

## Features

- Daily Active Users chart
- Status Changes by Card visualization
- Key metrics display
- Responsive design
- No build step required

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and go to:
   ```
   http://localhost:3001
   ```

## Project Structure

- `server.js` - Main server file with mock data
- `public/` - Frontend files
  - `index.html` - Main dashboard page
- `package.json` - Project configuration and dependencies

## Customization

### Using Real Data

To use real data instead of mock data:

1. Replace the mock data in `server.js` with your actual data fetching logic
2. Update the API endpoints to connect to your database

### Styling

All styles are included in the `public/index.html` file. You can modify the CSS in the `<style>` section to match your preferences.
