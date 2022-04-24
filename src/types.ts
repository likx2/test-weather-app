export interface ConsolidatedWeather {
    id: number;
    weather_state_name: string;
    weather_state_abbr: string;
    wind_direction_compass: string;
    created: string;
    applicable_date: string;
    min_temp: number;
    max_temp: number;
    the_temp: number;
    wind_speed: number;
    wind_direction: number;
    air_pressure: number;
    humidity: number;
    visibility: number;
    predictability: number;
}

export interface Source {
    title: string;
    slug: string;
    url: string;
    crawl_rate: number;
}

export interface Location {
    woeid: number;
    title: string;
    location_type: string;
    latt_long: string;
}

export interface LocationWithWeather extends Location {
    consolidated_weather: ConsolidatedWeather[];
    time: string;
    timezone: string;
    sun_rise: string;
    sun_set: string;
    timezone_name: string;
    parent: Location;
    sources: Source[];
}
