const axios = require('axios');

exports.handler = async (event, context) => {
    const query = event.queryStringParameters.search;
    const geoCode = 'http://api.positionstack.com/v1/forward?';
    const geoKey = '0196f96a9f24ea0adf56618d34aff66d';
    
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