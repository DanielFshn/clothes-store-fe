
export interface OrdersDTO {
    address: string;
    orderDate: Date;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface OrderGraphDTO{
    orderDate: Date;
    orderCount: number;
}