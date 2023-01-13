export type Product = {
    _id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    handle?: string;
    images?: any[];
    thumbnail?: string;
    variants?: any[];
    tags?: any[];
    discountable?: boolean;
    created_at?: Date;
    updated_at?: Date;
    metadata?: any;
}