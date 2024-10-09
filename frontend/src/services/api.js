import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const sendDataToBackend = async (matrix, vector) => {
    try {
        const response = await apiClient.post('solve/', {
            matrix: matrix,
            vector: vector
        });
        return response
    } catch (err) {
        console.error('Error sending matrix to backend:', err);
        throw err;
    }
};