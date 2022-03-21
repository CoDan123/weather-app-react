const axios = require('axios');

exports.handler = async (event, context) => {
    const {latitude, longitude} = event.queryStringParameters;

    const base = process.env.base;
    const key = process.env.key;

    const url = `${base}lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;



    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    }catch (error){
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

}