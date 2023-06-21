import { Inject, Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { MODULE_OPTIONS_TOKEN } from "./midtrans.module-definition";
import { MidtransConfig } from "./dto";

@Injectable()
export class SnapService {
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
}