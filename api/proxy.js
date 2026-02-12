// api/proxy.js
import fetch from "node-fetch";

const API_URL = "https://services-eu1.arcgis.com/VlrHb7fn5ewYhX6y/arcgis/rest/services/OcorrenciasSite/FeatureServer/0/query";
const PAGE_SIZE = 1000; // número máximo de registos por página do ArcGIS

export default async function handler(req, res) {
  try {
    let allFeatures = [];
    let offset = 0;
    let keepFetching = true;

    while (keepFetching) {
      const url = `${API_URL}?f=geojson&where=1=1&outFields=*&resultOffset=${offset}&resultRecordCount=${PAGE_SIZE}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro API: ${response.status}`);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        allFeatures = allFeatures.concat(data.features);
        offset += data.features.length;
        if (data.features.length < PAGE_SIZE) keepFetching = false; // última página
      } else {
        keepFetching = false;
      }
    }

    res.status(200).json({ features: allFeatures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados da API" });
  }
}
