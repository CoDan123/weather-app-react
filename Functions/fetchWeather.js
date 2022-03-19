exports.handler = async (event) => {
    const queryName = event.queryStringParameters;
    const url = `${api.geocode}access_key=${api.geoKey}&query=${query}`; 

    try {
    const response = await fetch(`${api.geocode}access_key=${api.geoKey}&query=${query}`);
    return {
        status: 200,
        body: JSON.stringify(response)
    }

    } catch (error) {

    }
}