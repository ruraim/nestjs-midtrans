import { Inject, Injectable } from '@nestjs/common';
import { Charge } from './dto/Charge';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { MidtransConfig } from './dto/Config';
import { MODULE_OPTIONS_TOKEN } from './midtrans.module-definition';
import { Subscription, SubscriptionUpdate } from './dto/subscription/Subscription';
import { MidtransError } from './midtrans.error';

@Injectable()
export class MidtransService {
    private httpClient: AxiosInstance

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly config: MidtransConfig
    ) {
        this.init(config)
    }

    private init(config: MidtransConfig) {
        const authToken = Buffer.from(config.serverKey).toString('base64')
        const baseUrl = config.sandbox ? 'https://api.sandbox.midtrans.com' : 'https://api.midtrans.com'
        this.httpClient = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authToken}`,
                'X-Payment-Locale': 'en-EN'
            }
        })
    }

    private async handleRequest(
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

    async charge(payload: Charge) {
        const data = await this.handleRequest('post', '/v2/charge', payload)
        return data
    }

    async getStatus(orderId: string) {
        const data = await this.handleRequest('get', `/v2/${orderId}/status`)
        return data
    }

    async validateSignature(signatureKey: string, data: { orderId: string, statusCode: string, grossAmount: string }) {
        const hash = crypto.createHash('sha512')
        const hashed = hash.update(data.orderId + data.statusCode + data.grossAmount + this.config.serverKey)
        const signature = hashed.digest('hex')
        return signature === signatureKey
    }

    async expireTransaction(orderId: string) {
        const data = await this.handleRequest('post', `/v2/${orderId}/expire`)
        return data
    }

    async getCardToken(cardNumber: string, cardExpMonth: string, cardExpYear: string, cardCvv: string) {
        const data = await this.handleRequest('get', '/v2/token', {
            params: {
                card_number: cardNumber,
                card_exp_month: cardExpMonth,
                card_exp_year: cardExpYear,
                card_cvv: cardCvv,
                client_key: this.config.clientKey
            }
        })
        return data
    }

    async createSubscription(payload: Subscription) {
        const data = await this.handleRequest('post', '/v1/subscriptions', payload)
        return data
    }

    async getSubscription(subscriptionId: string) {
        const data = await this.handleRequest('get', `/v1/subscriptions/${subscriptionId}`)
        return data
    }

    async disableSubscription(subscriptionId: string) {
        const data = await this.handleRequest('post', `/v1/subscriptions/${subscriptionId}/disable`)
        return data
    }

    async enableSubscription(subscriptionId: string) {
        const data = await this.handleRequest('post', `/v1/subscriptions/${subscriptionId}/enable`)
        return data
    }

    async updateSubscription(subscriptionId: string, payload: SubscriptionUpdate) {
        const data = await this.handleRequest('patch', `/v1/subscriptions/${subscriptionId}`, payload)
        return data
    }
}
