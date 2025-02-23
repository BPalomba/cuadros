# 🖼️ Cuadros Web Application
This project is a web application based on **Spring Boot** for the backend and **Vanilla JavaScript** for the frontend. The API is deployed on **Render**, while the user interface is hosted on **Vercel**.

## 🛠️ Technologies Used
- **Spring Boot** (Spring Web, Spring Data JPA, Spring Security)
- **PostgreSQL** (for data storage)
- **Docker** (for containerization)
- **Render** (for the backend)
- **Vercel** (for the frontend)
- **Vanilla JavaScript, HTML, and CSS** (for the user interface)

## 📌 Features
✅ **Authentication and security with Spring Security**  
✅ **Image persistence with URLs stored in PostgreSQL**  
✅ **Backend deployment on Render and frontend deployment on Vercel**  
✅ **CORS handling for communication between frontend and backend**  
✅ **Dockerization of backend and frontend for easy deployment**  

## 📡 API Endpoints

### 🖼 **Image Service** (`/api/image`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/image` | Upload a new image |
| **GET** | `/image` | Retrieve all images |
| **PUT** | `image/{id}` | Update an image by ID |
| **DELETE** | `/image/{id}` | Delete an image by ID |

## 🌍 Deployment URLs
- **Frontend:** [https://marinacuadros.vercel.app](https://marinacuadros.vercel.app)
- **Backend:** [https://cuadros.onrender.com](https://cuadros.onrender.com)


---

📌 *Developed by Bruno Palombarini*

## 🚀 Deployment with Docker

### 🔧 Backend (Spring Boot)
1. **Build the project and generate the JAR**
   ```sh
   ./gradlew build -x test
   ```
2. **Build the Docker image**
   ```sh
   docker build -t cuadros-backend .
   ```
3. **Run the container**
   ```sh
   docker run -p 8080:8080 cuadros-backend
   ```

### 🎨 Frontend (Vanilla JS)
1. **Build the Docker image**
   ```sh
   docker build -t cuadros-frontend .
   ```
2. **Run the container**
   ```sh
   docker run -p 80:80 cuadros-frontend
   ```

---

