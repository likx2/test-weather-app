import axios from "axios";

export default class BaseService {

    constructor(private baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api') {}

    protected get<R extends object>(endPoint: string) {
        return axios.get<R>(this.concatUrls(endPoint));
    }

    protected post<P extends object, R extends object>(endPoint: string, data: P) {
        return axios.post<R>(this.concatUrls(endPoint), data);
    }

    protected patch<P extends object, R extends object>(endPoint: string, id: string | number, data: P) {
        return axios.patch<R>(this.concatUrls(endPoint, id.toString()), data);
    }

    protected delete<R extends object>(endPoint: string, id: string | number) {
        return axios.delete<R>(this.concatUrls(endPoint, id.toString()));
    }

    protected concatUrls(...urls: string[]) {
        return urls.reduce((totalUrl, currentUrl) => {
            return `${totalUrl}/${currentUrl}`;
        }, this.baseUrl);
    }
}
