import axios, {
    type AxiosError,
    type InternalAxiosRequestConfig,
} from 'axios'
import { tokens } from './tokens'

export const http = axios.create({
    baseURL: 'http://localhost:8008',
    timeout: 10000,
})

const refreshClient = axios.create({
    baseURL: 'http://localhost:8008',
    timeout: 10000,
})

http.interceptors.request.use((config) => {
    const access = tokens.getAccess()

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
})

http.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const original = error.config as
            | (InternalAxiosRequestConfig & { _retry?: boolean })
            | undefined

        if (
            error.response?.status !== 403 ||
            !original ||
            original._retry ||
            original.url?.includes('/auth/refresh')
        ) {
            return Promise.reject(error)
        }

        const refreshToken = tokens.getRefresh()

        if (!refreshToken) {
            tokens.clear()
            window.location.href = '/login'
            return Promise.reject(error)
        }

        original._retry = true

        try {
            const { data } = await refreshClient.post('/auth/refresh', {
                refresh_token: refreshToken,
            })

            tokens.set(data.access_token, data.refresh_token)
            original.headers.Authorization = `Bearer ${data.access_token}`

            return http(original)
        } catch (refreshError) {
            tokens.clear()
            window.location.href = '/login'
            return Promise.reject(refreshError)
        }
    },
)