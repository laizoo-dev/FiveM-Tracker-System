const axios = require('axios');

class FiveMTracker {
    /**
     * @param {string} apiKey
     */
    constructor(apiKey) {
        if (!apiKey) throw new Error("API Key is required!");
        
        this.client = axios.create({
            baseURL: 'https://fivem-tracker.online/api/v1', 
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * @param {string} userId
     */
    async checkPlayer(userId) {
        try {
            const response = await this.client.get(`/check/${userId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response ? error.response.data.error : "Server Unreachable",
                statusCode: error.response ? error.response.status : 500
            };
        }
    }
}

module.exports = FiveMTracker;