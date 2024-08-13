export declare module "@medusajs/medusa/dist/models/order" {
    declare interface Order {
        code_used: string;
        commission_rate: number;
        commission: number;
        commission_created_on: Date;
        payout_status: string;
        payout_link: string;
        payout_created_on: Date;
    }
}

export declare module "@medusajs/medusa/dist/types/orders" {
    declare interface UpdateOrderInput {
        code_used: string;
        commission_rate: number;
        commission: number;
        commission_created_on: Date;
        payout_status: string;
        payout_link: string;
        payout_created_on: Date;
    }
}