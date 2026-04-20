# Synapse

**Synapse** is a full-stack, enterprise-style web application centered around internal staff coordination, workspace management, and desk tracking. It provides a robust platform for managing co-working spaces, allowing members to book desks, request amenities, and enabling managers/admins to oversee utilization and inventory.

## 🚀 Features

### For Members
* **Secure Authentication:** JWT-based login and registration.
* **Workspace Browsing:** View available workspaces and desks.
* **Desk Booking:** Book desks for specific dates and time slots (1 to 12 hours) with strict overlapping prevention.
* **Amenity Requests:** Request amenities (e.g., projectors, whiteboards) for confirmed bookings.
* **Booking History:** View and manage past and upcoming bookings.

### For Space Managers
* **Infrastructure Management:** Create and manage Workspaces, Desks (Hot Desk / Dedicated), and Amenities.
* **Approval Workflow:** Approve or reject amenity reservation requests from members.
* **Booking Oversight:** Confirm or cancel member bookings to maintain physical space coordination.

### For Administrators
* **User Management:** View all registered users and their roles across the platform.
* **Analytics Dashboard:** Monitor real-time metrics including:
  * Total bookings per workspace.
  * Most used amenities.
  * Desk utilization percentages.

## 🛠️ Tech Stack

**Backend:**
* Java 17+
* Spring Boot 3 (REST API)
* Spring Security (JWT Authentication)
* Spring Data JPA & Hibernate
* MySQL (Database)
* Swagger / OpenAPI 3.0 (API Documentation)

**Frontend:**
* React.js
* Vite
* Tailwind CSS
* Axios (API Client)
* React Router DOM

## 🗄️ Core Database Entities
1. **User** (Role: `ADMIN`, `SPACE_MANAGER`, `MEMBER`)
2. **Workspace** (Status: `ACTIVE`, `INACTIVE`, `FULL`)
3. **Desk** (Type: `HOT_DESK`, `DEDICATED_DESK`)
4. **Amenity** (Inventory like Whiteboards, Projectors)
5. **Booking** (Tracks User, Desk, Date, Start/End Time)
6. **AmenityReservation** (Links an Amenity request to a specific Booking)

## ⚙️ Local Development Setup

### Prerequisites
* Java Development Kit (JDK) 17 or higher
* MySQL Server (running on default port 3306)
* Node.js and npm
* Maven

### Backend Setup
1. Clone the repository.
2. Open your MySQL client and create a new database (e.g., `CREATE DATABASE amenity_management;`).
3. Navigate to `src/main/resources/application.properties` and update your database credentials:
```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/amenity_management
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
4. Run the Spring Boot application. Hibernate will automatically generate the database tables on startup.
5. Access the API documentation at: `http://localhost:8080/swagger-ui.html`

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the frontend folder and add the backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL provided by Vite (usually `http://localhost:5173`).

## 👥 Team
* Ashok Babu Bavireddy
* Sindhu
* Kalyani
