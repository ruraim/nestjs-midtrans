import { Inject, Injectable } from '@nestjs/common';
import { Charge } from './dto/Charge';
import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { MidtransConfig } from './dto/Config';
import { MODULE_OPTIONS_TOKEN } from './midtrans.module-definition';

@Injectable()
export class MidtransService {
    private httpClient: AxiosInstance

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly config: MidtransConfig
    ) {
        this.init(config)
    }

    init(config: MidtransConfig) {
        const authToken = Buffer.from(config.serverKey).toString('base64')
        const baseUrl = config.sandbox ? 'https://api.sandbox.midtrans.com/v2' : 'https://api.midtrans.com/v2'
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

    async charge(payload: Charge) {
        if (!this.httpClient) throw new Error('Midtrans client not initialized')
        try {
            const { data } = await this.httpClient.post('/charge', payload)
            return data
        } catch (error) {
            throw error.response.data
        }
    }

    async getStatus(orderId: string) {
        if (!this.httpClient) throw new Error('Midtrans client not initialized')
        try {
            const { data } = await this.httpClient.get(`/${orderId}/status`)
            return data
        } catch (error) {
            throw error.response.data
        }
    }

    async validateSignature(signatureKey: string, data: { orderId: string, statusCode: string, grossAmount: string }) {
        const hash = crypto.createHash('sha512')
        const hashed = hash.update(data.orderId + data.statusCode + data.grossAmount + this.config.serverKey)
        const signature = hashed.digest('hex')
        return signature === signatureKey
    }

    async expireTransaction(orderId: string) {
        if (!this.httpClient) throw new Error('Midtrans client not initialized')
        try {
            const { data } = await this.httpClient.post(`/${orderId}/expire`)
            return data
        } catch (error) {
            throw error.response.data
        }
    }

    async getCardToken(cardNumber: string, cardExpMonth: string, cardExpYear: string, cardCvv: string) {
        if (!this.httpClient) throw new Error('Midtrans client not initialized')
        try {
            const { data } = await this.httpClient.get('/token', {
                params: {
                    card_number: cardNumber,
                    card_exp_month: cardExpMonth,
                    card_exp_year: cardExpYear,
                    card_cvv: cardCvv,
                    client_key: this.config.clientKey
                }
            })
            return data
        } catch (error) {
            throw error.response.data
        }
    }

}
