export enum Genre {
    Romance = 1,
    Fantasy = 2,
    MysteryThriller = 3,
    ScienceFiction = 4,
    YoungAdult = 5,
    NonFiction = 6
}

export enum AdState {
    Pending = 1,
    Declined = 2,
    Accepted = 3
}

export enum ProductSource {
    Amazon = 1
}

export interface Ad {
    adDate: Date;
    created: Date;
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