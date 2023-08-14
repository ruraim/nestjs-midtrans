import { Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { MODULE_OPTIONS_TOKEN } from "./midtrans.module-definition";
import { MidtransConfig, TransactionDetails } from "./dto";
import { BaseService } from "./base.service";
import { SnapTransaction } from "./dto/SnapTransaction";

@Injectable()
export class SnapService extends BaseService {
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly config: MidtransConfig
    ) {
        super()
        this.init(config)
    }

    private init(config: MidtransConfig) {
        const authToken = Buffer.from(config.serverKey).toString('base64')
        const baseUrl = config.sandbox ? 'https://app.sandbox.midtrans.com/snap' : 'https://app.midtrans.com/snap'
        this.httpClient = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authToken}`
            }
        })
    }

    public async transaction(payload: SnapTransaction) {
        const data = await this.handleRequest('post', `/v1/transactions`, payload)
        return data
    }
}