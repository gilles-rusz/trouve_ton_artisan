const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchArtisans({ categorieId } = {}) {
  try {
    let url = `${API_URL}/api/artisans`;
    if (categorieId) {
      url += `?categorieId=${categorieId}`;  // 🛑 assure-toi que ton back-end accepte ce paramètre
    }

    const response = await fetch(url);
    console.log("Status de réponse :", response.status);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log("Données reçues :", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des artisans :", error);
    throw error;
  }
}
