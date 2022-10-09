
export interface Cury {
    href: string;
    name: string;
    templated: boolean;
}

export interface Self {
    href: string;
}

export interface Links {
    curies: Cury[];
    self: Self;
}

export interface Category {
    color: string;
    name: string;
    score_out_of_10: number;
}

export interface RootObject5 {
    _links: Links;
    categories: Category[];
    summary: string;
    teleport_city_score: number;
}