import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        // URL correta da API
        const API_URL = "https://services-eu1.arcgis.com/VlrHb7fn5ewYhX6y/arcgis/rest/services/OcorrenciasSite/FeatureServer/0/query?f=geojson&where=1=1&outFields=*";

        const response = await fetch(API_URL);

        if (!response.ok) {
            return res.status(response.status).json({ error: "Erro na API original" });
        }

        const data = await response.json();

        // Retorna JSON para o frontend
        res.status(200).json(data);

    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: "Erro no proxy" });
    }
}
