const axios = require('axios');

exports.handler = async (event, context) => {
    const query = event.queryStringParameters.search;
    const geoCode = process.env.geoUrl;
    const geoKey = process.env.geoKey;
    
    const url = `${geoCode}access_key=${geoKey}&query=${query}`;

    try {
        const response = await axios.get(url)
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        }
    }
}