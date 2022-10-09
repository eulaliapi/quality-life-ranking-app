
export interface Cury {
    href: string;
    name: string;
    templated: boolean;
}

export interface Self {
    href: string;
}

export interface UaAdmin1Divisions {
    href: string;
    name: string;
}

export interface UaCities {
    href: string;
}

export interface UaContinent {
    href: string;
    name: string;
}

export interface UaCountry {
    href: string;
    name: string;
}

export interface UaDetails {
    href: string;
}

export interface UaIdentifyingCity {
    href: string;
    name: string;
}

export interface UaImages {
    href: string;
}

export interface UaPrimaryCity {
    href: string;
    name: string;
}

export interface UaSalaries {
    href: string;
}

export interface UaScores {
    href: string;
}

export interface Links {
    curies: Cury[];
    self: Self;
    "ua:admin1-divisions": UaAdmin1Divisions[];
    "ua:cities": UaCities;
    "ua:continent": UaContinent;
    "ua:countries": UaCountry[];
    "ua:details": UaDetails;
    "ua:identifying-city": UaIdentifyingCity;
    "ua:images": UaImages;
    "ua:primary-cities": UaPrimaryCity[];
    "ua:salaries": UaSalaries;
    "ua:scores": UaScores;
}

export interface Latlon {
    east: number;
    north: number;
    south: number;
    west: number;
}

export interface BoundingBox {
    latlon: Latlon;
}

export interface RootObject3 {
    _links: Links;
    bounding_box: BoundingBox;
    continent: string;
    full_name: string;
    is_government_partner: boolean;
    mayor: string;
    name: string;
    slug: string;
    teleport_city_url: string;
    ua_id: string;
}

