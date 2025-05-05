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
    id: string;
    productId: string;
    productSource: ProductSource;
    title: string;
    titleView: string;
    description: string;
    descriptionView: string;
    link: string;
    price: number;
    offerPrice: number;
    rating: number;
    numReviews: number;
    image: string;
    userId: string;
    author: Author;
}

export interface Author {
    name: string;
    link: string;
    asin: string;
}

export interface Ad {
    id: string;
    adDate: Date;
    created: Date;
    runDate: Date;
    productId: string;
    userId: string;
    genre: Genre;
    state: string;
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

export interface ProductValidate {
    productId: string;
    productSource: ProductSource;
}

export interface ProductUpload extends ProductValidate {
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
    name?: string;
    preferences: Preferences;
    profilePicture?: string;
}

export interface Preferences {
    genres: string[];
}

export interface AdWithProduct extends Omit<Ad, 'productId'> {
    product: Product;
}  