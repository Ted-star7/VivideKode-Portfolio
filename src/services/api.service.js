import axios from "axios";

// export const apiClient = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_BASE_URL || "https://vividekode-7070.onrender.com",
  
//   headers: { "Content-Type": "application/json" },
// });

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API]", err.response?.status, err.message);
    return Promise.reject(err);
  },
);

export const bookingApi = {
  create: (data) => apiClient.post("/api/open/consultations", data),
};
export const contactApi = {
  send: (data) => apiClient.post("/api/open/contact", data),
};
export const visionMissionApi = {
  getAll: () => apiClient.get("/api/vission-mission"),
  getById: (id) => apiClient.get(`/api/vission-mission/${id}`),
};
export const testimonialApi = {
  getAll: () => apiClient.get("/api/open/testimonials"),
  getById: (id) => apiClient.get(`/api/open/testimonials/${id}`),
};
export const projectApi = {
  getAll: () => apiClient.get("/api/open/projects/public"),
  getById: (id) => apiClient.get(`/api/projects/${id}`),
};
