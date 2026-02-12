export default async function handler(req, res) {
  const apiUrl = "https://services-eu1.arcgis.com/VlrHb7fn5ewYhX6y/arcgis/rest/services/OcorrenciasSite/FeatureServer/0/query?f=geojson&where=0=0&outFields=*&resultRecordCount=10000";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro na API externa" });
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar a API",
      details: error.message
    });
  }
}
