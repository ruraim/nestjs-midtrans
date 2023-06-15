export class MidtransError extends Error {
    details: Record<string, any>;

    constructor(message: string = 'Midtrans Error', details: Record<string, any>) {
        super(message + ' ' + JSON.stringify(details));
        this.name = 'MidtransError';
        this.details = details;
    }
}