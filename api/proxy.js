// api/proxy.js
import fetch from "node-fetch";

const API_URL = "https://services-eu1.arcgis.com/VlrHb7fn5ewYhX6y/arcgis/rest/services/OcorrenciasSite/FeatureServer/0/query?f=geojson&where=1=1&outFields=*";

export default async function handler(req, res) {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro API: ${response.status}`);
    const data = await response.json();

    res.status(200).json(data); // envia direto para o front-end
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados da API" });
  }
}
