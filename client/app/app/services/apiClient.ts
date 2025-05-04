import axios from 'axios';
import type {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from 'axios';

type GetTokenFunction = () => Promise<string | null>;

const API_BASE_URL: string | undefined = import.meta.env.VITE_BACKEND_API_URL;
console.log(API_BASE_URL)
if (!API_BASE_URL) {
    console.error("CRITICAL ERROR: API_URL is not defined in your env variables");

    throw new Error("API Client Error: Base URL not configured.")
}

// Configured Axios Instance
let apiClientInstance: AxiosInstance | null = null;

const initializeApiClient = (getToken: GetTokenFunction): AxiosInstance => {
    if (apiClientInstance) {
        console.warn("ApiClient is already initialized. Skipping re-initialization.")
        return apiClientInstance;
    }

    console.log(`Initializing ApiClient with baseURL: ${API_BASE_URL}`);

    const instance: AxiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 30000,
    });

    // Request Intercepter
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
            const token: string | null = await getToken();

            if (token) {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token}`
            } else {
                console.warn('Clerk token not available. Request proceeding without Authorization.');
            }
            return config;
        },
        (error: AxiosError): Promise<never> => {
            console.error('Axios Request Interceptor Error: ', error);
            return Promise.reject(error)
        }
    );

    // Response Interceptor
    instance.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => {
            return response;
        },
        (error: AxiosError<any>): Promise<never> => {
            const status = error.response?.status;

            const errorMessage = 
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message;

            const requestUrl = error.config?.url;

            console.error(
                `API Error: Status ${status ?? 'N/A'} on ${requestUrl ?? 'unknown URL'}: ${errorMessage}`
            );

            if (status === 401) {
                console.warn('API returned 401 Unauthorized. Potential session expiry.');
            } else if (status === 403) {
                console.warn('API returned 403 Forbidden. User lacks permissions.');
            }

            return Promise.reject(error)
        }
    );

    apiClientInstance = instance
    console.log("ApiClient initialization complete.")
    return instance;
}


const getApiClient = (): AxiosInstance => {
    if (!apiClientInstance) {
        throw new Error(
            "ApiClient Error: Attempted to use ApiClient before it was initailized. Ensure initializeApiClient() is called in your app's root component after Clerk is loaded."
        );
    }
    return apiClientInstance;
}

export {initializeApiClient, getApiClient};

