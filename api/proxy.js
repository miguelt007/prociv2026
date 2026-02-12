export default async function handler(req, res) {
    try {
        const BASE_URL = "https://services-eu1.arcgis.com/VlrHb7fn5ewYhX6y/arcgis/rest/services/OcorrenciasSite/FeatureServer/0/query";
        const FIELDS = "*";
        const WHERE = "1=1";
        const PAGE_SIZE = 500; // número máximo de ocorrências por request
        let allFeatures = [];
        let start = 0;
        let hasMore = true;

        while(hasMore){
            const url = `${BASE_URL}?f=geojson&where=${WHERE}&outFields=${FIELDS}&resultOffset=${start}&resultRecordCount=${PAGE_SIZE}`;
            const response = await fetch(url);
            if(!response.ok) return res.status(response.status).json({ error: "Erro na API" });
            const data = await response.json();
            if(data.features && data.features.length > 0){
                allFeatures = allFeatures.concat(data.features);
                start += data.features.length;
                // se retornar menos que PAGE_SIZE, acabou
                if(data.features.length < PAGE_SIZE) hasMore = false;
            } else {
                hasMore = false;
            }
        }

        // retorna todas as ocorrências
        res.status(200).json({ features: allFeatures });

    } catch(error){
        console.error("Proxy error:", error);
        res.status(500).json({ error: "Erro no proxy" });
    }
}
