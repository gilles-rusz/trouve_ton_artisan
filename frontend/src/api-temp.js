import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL + '/api',
  // withCredentials: true, // décommente si tu utilises des cookies/session
});

export async function fetchArtisans({ categorieId } = {}) {
  try {
    const response = await api.get('/artisans', {
      params: categorieId ? { categorieId } : {},
    });
    console.log("Données reçues :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des artisans :", error);
    throw error;
  }
}

export default api;
