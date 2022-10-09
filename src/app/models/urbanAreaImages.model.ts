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

export interface Attribution {
    license: string;
    photographer: string;
    site: string;
    source: string;
}

export interface Image {
    mobile: string;
    web: string;
}

export interface Photo {
    attribution: Attribution;
    image: Image;
}

export interface RootObject4 {
    _links: Links;
    photos: Photo[];
}