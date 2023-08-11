import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { MidtransError } from "./midtrans.error"

export abstract class BaseService {
    protected httpClient: AxiosInstance

    protected async handleRequest(
        method: 'get' | 'post' | 'put' | 'patch' | 'delete',
        path: string,
        payload?: Record<string, any>,
        config: AxiosRequestConfig = {}) {
        try {
            const { data } = await this.httpClient.request({
                method,
                url: path,
                data: payload,
                ...config
            })
            return data
        } catch (error) {
            if (error instanceof AxiosError)
                throw new MidtransError('Midtrans Error', error.response?.data)
            throw error
        }
    }
}