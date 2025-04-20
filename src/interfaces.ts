export enum Genre {
    Romance,
    Fantasy,
    MysteryThriller,
    ScienceFiction,
    YoungAdult,
    NonFiction
}

export enum AdState {
    Pending,
    Declined,
    Accepted,
    Canceled
}

export enum ProductSource {
    Amazon
}

export interface Product {
    productId: string;
    productSource: ProductSource;
    title: string;
    description: string;
    descriptionView: string;
    link: string;
    price: Price;
    rating: number;
    numReviews: number;
    image: string;
}

export interface Price {
    symbol: string;
    listPrice: string;
    currency: string;
    raw: string;
    value: number;
}

export interface Ad {
    id: string;
    adDate: Date;
    created: Date;
    user: string;
    product: Product;
    genre: Genre;
    state: AdState;
    orderId: string;
}

export interface ProductUpload {
    productId: string;
    productSource: ProductSource;
}

export interface AdUpload {
    adDate: Date;
    productUpload: ProductUpload;
    genre: Genre;
}

export interface ProductUpload {
    productId: string;
    productSource: ProductSource;
    productPrice: number;
}

export interface AdAvailability {
    adDate: string;
    count: number;
}

export interface User {
    username: string;
    email: string;
    preferences: Preferences;
}

export interface Preferences {
    genres: string[];
}
