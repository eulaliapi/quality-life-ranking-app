export interface CityAdmin1Division {
    href: string;
    name: string;
}

export interface CityAlternateNames {
    href: string;
}

export interface CityCountry {
    href: string;
    name: string;
}

export interface CityTimezone {
    href: string;
    name: string;
}

export interface CityUrbanArea {
    href: string;
    name: string;
}

export interface Cury {
    href: string;
    name: string;
    templated: boolean;
}

export interface Self {
    href: string;
}

export interface Links {
    "city:admin1_division": CityAdmin1Division;
    "city:alternate-names": CityAlternateNames;
    "city:country": CityCountry;
    "city:timezone": CityTimezone;
    "city:urban_area": CityUrbanArea;
    curies: Cury[];
    self: Self;
}

export interface Latlon {
    latitude: number;
    longitude: number;
}

export interface Location {
    geohash: string;
    latlon: Latlon;
}

export interface RootObject2 {
    _links: Links;
    full_name: string;
    geoname_id: number;
    location: Location;
    name: string;
    population: number;
}