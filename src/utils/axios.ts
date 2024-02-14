import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class AxiosClient {

    private static instance: AxiosClient;
    private client: AxiosInstance;

    private constructor(baseURL: string) {
        this.client = axios.create({
            baseURL
        })
    };

    public static getInstance(baseURL: string): AxiosClient {
        if (!AxiosClient.instance) {
            AxiosClient.instance = new AxiosClient(baseURL);
        }
        return AxiosClient.instance;
    }

    async get(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await this.client.get(url, config);
            return response;
        } catch (error) {
            throw new Error(`Request to ${url} failed`);
        }
    };

    async post(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            const response = await this.client.post(url, data, config);

            return response;
        } catch (error) {
            throw new Error(`Request to ${url} failed`);
        }
    };

    async put(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            const response = await this.client.put(url, data, config);

            return response;
        } catch (error) {
            throw new Error(`Request to ${url} failed`);
        }
    }
};

const apiClient = AxiosClient.getInstance(import.meta.env.VITE_API_URL);

export default apiClient;