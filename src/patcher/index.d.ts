import { Request } from 'express-serve-static-core';
import {MedusaRequest} from "@medusajs/medusa/dist/types/routing"
import {UpdateOrderInput} from "@medusajs/medusa/dist/types/orders"
import { UpdateCustomerInput } from "@medusajs/medusa/dist/types/customers";

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

export declare module "@medusajs/medusa/dist/models/address" {
    declare interface Address {
        metadata: Record<string, unknown> | null;
    }
}

export declare module 'express-serve-static-core' {
  interface Request {
    rawBody?: string;
  }
}

export declare module "@medusajs/medusa/dist/types/routing" {
    interface MedusaRequest {
        rawBody?: string;
    }
}