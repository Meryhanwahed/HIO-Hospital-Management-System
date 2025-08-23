# 🏥 HIO Hospital Management System – Damietta  

**A full-stack digital healthcare system for the Health Insurance Organization (HIO) – Damietta.**  
This project simulates the digitization of the hospital workflow (patients, doctors, pharmacy, staff, and archives) using **Angular (Frontend)** and **Node.js + Express (Backend)**.  

---

## 🚀 Features
- 👨‍⚕️ **Patient Management** – Add, update, and view patient records with full medical history  
- 📂 **File Archiving & Indexing** – Organize and retrieve patient files by name, date, doctor, or department  
- 🔄 **Referral System** – Refer patients between departments with reason & medical notes  
- 💊 **Pharmacy Management** – Track drug inventory, prescriptions, and issue medicines to patients  
- 🧑‍⚕️ **Doctor Management** – Manage doctors’ profiles, specialties, and linked patients  
- 👥 **Staff & HR** – Manage hospital employees (legal, finance, HR)  
- 📊 **Dashboard & Reports** – Generate statistics on patients, referrals, and drug usage  

---

## 🛠️ Tech Stack
- **Frontend:** Angular 17 (Standalone Components), Angular Material, ngx-translate, ngx-toastr, ngx-spinner  
- **Backend:** Node.js, Express.js, JWT Auth, Multer (file uploads)  
- **Database:** MongoDB (Mongoose ODM)  
- **Others:** RESTful APIs, Role-based Access  

---

## 📂 Project Structure
frontend/ (Angular App)
├── core/ (guards, interceptors, layout, services)
├── features/ (auth, patients, doctors, pharmacy, files, referrals, staff, dashboard)
├── shared/ (models, ui components)
└── app.routes.ts

backend/ (Node.js App)
├── routes/ (patients, doctors, files, pharmacy, staff, auth)
├── models/ (mongoose schemas)
├── controllers/
├── middlewares/
└── server.js




---

## 🔑 User Roles
- **Admin:** full access (manage patients, doctors, staff, files, drugs)  
- **Doctor:** manage patient files, add reports, referrals  
- **Pharmacist:** manage drug inventory and prescriptions  
- **Staff (HR/Finance/Legal):** manage related files  

---

## 📸 Screenshots
*(to be added)*  
- Dashboard  
- Patient list & details  
- File archive  
- Pharmacy inventory  

---

## ⚡ Getting Started

### 1. Clone repo
```bash
git clone https://github.com/Meryhanwahed/hio-hospital.git
cd hio-hospital
