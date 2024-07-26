declare module "@medusajs/medusa/dist/models/order" {
    interface Order {
        code_used: string;
        commission_rate: number;
        commission: number;
    }
}

declare module "@medusajs/medusa/dist/models/customer" {
    interface Customer {
        affiliate_code: string;
        total_sales: number;
        commission: number;
        affiliate_status: string
    }
}