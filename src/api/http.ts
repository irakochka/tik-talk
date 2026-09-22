import axios from 'axios'

export const http = axios.create({
    baseURL: import.meta.env.DEV
        ? '/yt-course'
        : 'https://icherniakov.ru/yt-course',
    timeout: 10000,
})