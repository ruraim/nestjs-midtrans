export class MidtransError extends Error {
    details: Record<string, any>;

    constructor(message: string = 'Midtrans Error', details: Record<string, any>) {
        super(`${message} \n ${JSON.stringify(details, null, 2)}`);
        this.name = 'MidtransError';
        this.details = details;
    }
}