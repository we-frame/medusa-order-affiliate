import { UpdateCustomerInput } from "@medusajs/medusa/dist/types/customers";

export declare module "@medusajs/medusa/dist/models/customer" {
    declare interface Customer {
        affiliate_code: string;
        total_sales: number;
        commission: number;
        affiliate_status: string;
        last_login: Date;
        affiliate_verified_on: Date;
        is_affiliate: boolean;
        affiliate_order_count: number;
        paypal_email: string;
    }
}

declare module "@medusajs/medusa/dist/types/customers" {
    declare interface UpdateCustomerInput {
        affiliate_code: string;
        total_sales: number;
        commission: number;
        affiliate_status: string;
        last_login: Date;
        affiliate_verified_on: Date;
        is_affiliate: boolean;
        affiliate_order_count: number;
        paypal_email: string;
    }
}