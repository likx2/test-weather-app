import BaseService from "./BaseService";
import { Location, LocationWithWeather } from "../types";

export default class LocationService extends BaseService {

    getLocationsBySearchWord(searchWord: string) {
        return this.get<Location[]>(`location/search/?query=${searchWord}`);
    }

    getWeatherForTheLocationWoeid(woeid: number) {
        return this.get<LocationWithWeather>(`location/${woeid}`);
    }
}
