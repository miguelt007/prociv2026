import fetch from "node-fetch";

export default async function handler(req, res) {
  const apiUrl = "https://services-eu1.arcgis.com/VlrHb7fn5ewYhX6y/arcgis/rest/services/OcorrenciasSite/FeatureServer/0/query?f=geojson&where=1=1&outFields=*&outSR=4326";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Permite que o navegador acesse os dados
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar a API" });
  }
}
