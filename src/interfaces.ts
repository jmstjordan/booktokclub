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
    Accepted
}

export enum ProductSource {
    Amazon
}

export interface Ad {
    adDate: Date;
    created: Date;
    user: string;
    product: any;
    genre: Genre;
    state: AdState;
}

export interface ProductUpload {
    productId: string;
    productSource: ProductSource;
}

export interface AdUpload {
    adDate: Date;
    productUpload: ProductUpload
    genre: Genre
}

export interface ProductUpload {
    productId: string;
    productSource: ProductSource;
}

export interface AdAvailability {
    adDate: string;
    count: number;
}