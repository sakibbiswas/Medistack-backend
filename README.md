# 🏥 MediStack Backend

`MediStack is a Medical Appointment Booking System backend built with Node.js, Express, TypeScript, and MongoDB.
It supports Patients, Doctors, and Admins with secure authentication, appointment booking, availability management, payments, and admin controls.`

## 🚀 Features (Backend)
`🔹 Authentication & Security

`User registration & login with JWT-based authentication`

`Role-based access control (Patient, Doctor, Admin)`

`Password hashing with bcrypt

`Middleware for protecting routes`

## 🔹 Patient Features

`Register & login as Patient`

`Book appointments with Doctors`

`View My Bookings`

`Make payments (Cash or Stripe)

`Receive notifications`

## 🔹 Doctor Features

`Register & login as Doctor`

`Manage availability slots`

`View appointments & patients`

`Accept/Reject bookings`

## 🔹 Admin Features

`Register & login as Admin`

`Manage Doctors (approve, suspend, assign department)`

`Manage Patients`

`Manage Departments`

`View all appointments`

`Payments dashboard with transaction ID, method, and status`

## 🔹 Payment Integration

`Cash Payment`

`Stripe Checkout (real-world payment integration)`

`Store transactions in DB with payment status`




## 🔑 API Endpoints
### Auth

`POST /api/v1/auth/register → Register (Patient, Doctor, Admin)`

`POST /api/v1/auth/login → Login & get JWT`

### Patients

`GET /api/v1/users/me → Get logged-in user profile`

`POST /api/v1/appointments → Book appointment`

`GET /api/v1/appointments/my → Get my bookings`

### Doctors

`POST /api/v1/doctors/availability → Set availability slots`

`GET /api/v1/doctors/appointments → View doctor’s appointments`

### Admin

`GET /api/v1/admin/doctors → List all doctors`

`PATCH /api/v1/admin/doctors/:id/approve → Approve doctor`

`PATCH /api/v1/admin/doctors/:id/suspend → Suspend doctor`

`GET /api/v1/admin/payments → View all payments`

### Payments

`POST /api/v1/payments/create → Create payment (Cash/Stripe)`

`GET /api/v1/payments/:id → Payment status`

#### 🧪 Testing with Postman

`Import the included Postman Collection (if provided)`

`Test login, booking, and payments`

`Use JWT in Authorization header:`

`Authorization: Bearer <your_token>`
 

## ⚡ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/sakibbiswas/Medistack-backend
cd medistack-backend