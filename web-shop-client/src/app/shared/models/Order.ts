export class Order {
    id?: number;
    name: string;
    phone: string;
    city: string;
    address: string;
    email: string;
    sum: number;
    delivery: boolean;
    orderstatus: boolean;
    wishes: string | null;
    notes: string | null;
}