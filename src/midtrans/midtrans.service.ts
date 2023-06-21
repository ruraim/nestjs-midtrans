import { Inject, Injectable } from '@nestjs/common';
import { Charge } from './dto/Charge';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { MidtransConfig } from './dto/Config';
import { MODULE_OPTIONS_TOKEN } from './midtrans.module-definition';
import { Subscription, SubscriptionUpdate } from './dto/subscription/Subscription';
import { MidtransError } from './midtrans.error';
import { Refund } from './dto/Refund';
import { Capture } from './dto/Capture';
import { GopayAccount } from './dto/GopayAccount';

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

    // Payment API

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

    async charge(payload: Charge) {
        const data = await this.handleRequest('post', '/v2/charge', payload)
        return data
    }

    async capture(orderId: string, payload: Capture) {
        const data = await this.handleRequest('post', `/v2/${orderId}/capture`, payload)
        return data
    }

    async approve(orderId: string) {
        const data = await this.handleRequest('post', `/v2/${orderId}/approve`)
        return data
    }

    async deny(orderId: string) {
        const data = await this.handleRequest('post', `/v2/${orderId}/deny`)
        return data
    }

    async cancel(orderId: string) {
        const data = await this.handleRequest('post', `/v2/${orderId}/cancel`)
        return data
    }

    async expire(orderId: string) {
        const data = await this.handleRequest('post', `/v2/${orderId}/expire`)
        return data
    }

    async refund(orderId: string, payload: Refund) {
        const data = await this.handleRequest('post', `/v2/${orderId}/refund`, payload)
        return data
    }

    async directRefund(orderId: string, payload: Refund) {
        const data = await this.handleRequest('post', `/v2/${orderId}/refund/online/direct`, payload)
        return data
    }

    async getStatus(orderId: string) {
        const data = await this.handleRequest('get', `/v2/${orderId}/status`)
        return data
    }

    async getStatusB2B(orderId: string, page: number, perPage: number) {
        const data = await this.handleRequest('get', `/v2/${orderId}/status/b2b`, {
            params: {
                page,
                per_page: perPage
            }
        })
        return data
    }

    async registerCard(payload: { cardNumber: string, cardExpMonth: string, cardExpYear: string, clientKey: string, callback: string }) {
        const data = await this.handleRequest('get', '/v2/card/register', {
            params: {
                card_number: payload.cardNumber,
                card_exp_month: payload.cardExpMonth,
                card_exp_year: payload.cardExpYear,
                client_key: payload.clientKey,
                callback: payload.callback
            }
        })
        return data
    }

    async getPointInquiry(orderId: string, grossAmount?: number) {
        const data = await this.handleRequest('get', `/v2/${orderId}/point_inquiry`, {
            params: {
                gross_amount: grossAmount
            }
        })
        return data
    }

    async createGopayAccount(payload: GopayAccount) {
        const data = await this.handleRequest('post', '/v2/pay/account', payload)
        return data
    }

    async getGopayAccount(accountId: string) {
        const data = await this.handleRequest('get', `/v2/pay/account/${accountId}`)
        return data
    }

    async unbindGopayAccount(accountId: string) {
        const data = await this.handleRequest('post', `/v2/pay/account/${accountId}/unbind`)
        return data
    }

    async getGopayPromotion(accountId: string, grossAmount: string, currency: string = 'IDR') {
        const data = await this.handleRequest('get', `/v2/gopay/promo/${accountId}`, {
            params: {
                gross_amount: grossAmount,
                currency
            }
        })
        return data
    }

    async getBin(binNumber: string) {
        const data = await this.handleRequest('get', `/v1/bins/${binNumber}`)
        return data
    }

    async validateSignature(signatureKey: string, data: { orderId: string, statusCode: string, grossAmount: string }) {
        const hash = crypto.createHash('sha512')
        const hashed = hash.update(data.orderId + data.statusCode + data.grossAmount + this.config.serverKey)
        const signature = hashed.digest('hex')
        return signature === signatureKey
    }

    // Subscription API

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
