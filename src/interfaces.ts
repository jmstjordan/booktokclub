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

export enum SubscriberSource {
    BookTokClub
}

export interface Product {
    productId: string;
    productSource: ProductSource;
    title: string;
    titleView: string;
    description: string;
    descriptionTrim: string;
    descriptionView: string;
    link: string;
    price: Price;
    offerPrice: number;
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
    runDate: Date;
    productId: string;
    userId: string;
    genre: Genre;
    state: AdState;
    orderId: string;
    price: number;
}

export interface AdUpload {
    adDate: Date;
    productUpload: ProductUpload;
    genre: Genre;
}

export interface SubscriberUpload {
    email: string;
    subscriberSource: SubscriberSource;
}

export interface ProductUpload {
    productId: string;
    productSource: ProductSource;
    productPrice: number;
    titleView: string;
    descriptionView: string;
    offerPrice: number;
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
