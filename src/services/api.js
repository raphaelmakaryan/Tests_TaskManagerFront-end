import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/tasks', // Le proxy redirigera vers http://localhost:8080/tasks
    headers: {
        'Content-Type': 'application/json',
    },
})

// Ajouter un intercepteur pour logger les requêtes
apiClient.interceptors.request.use((request) => {
    console.log('Starting Request', request)
    return request
})

export const api = {
    getHello() {
        return apiClient.get(`/hello`)
    },
}
