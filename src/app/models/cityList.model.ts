export interface CityItem {
    href: string;
}

export interface Links {
    "city:item": CityItem;
}

export interface MatchingAlternateName {
    name: string;
}

export interface CitySearchResult {
    _links: Links;
    matching_alternate_names: MatchingAlternateName[];
    matching_full_name: string;
}

export interface Embedded {
    "city:search-results": CitySearchResult[];
}

export interface Cury {
    href: string;
    name: string;
    templated: boolean;
}

export interface Self {
    href: string;
}

export interface Links2 {
    curies: Cury[];
    self: Self;
}

export interface RootObject {
    _embedded: Embedded;
    _links: Links2;
    count: number;
}