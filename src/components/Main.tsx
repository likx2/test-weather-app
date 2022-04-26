import React, { FC, useState } from "react";
import UserInput from "./UserInput";
import Button from "./Button";
import LocationService from "../services/LocationService";
import { LocationWithWeather } from "../types";
import Error from "./Error";
import LocationWeatherItem from "./LocationWeatherItem";

interface MainProps {

}

interface MainState {
    isFetching: boolean;
    searchWord: string;
    locations: LocationWithWeather[];
    error: string;
}

const locationService = new LocationService();

const Main: FC<MainProps> = () => {

    const initialState: MainState = {
        isFetching: false,
        searchWord: '',
        locations: [],
        error: '',
    };

    const [state, setState] = useState<MainState>(initialState);

    const onButtonClick = () => {

        if (!state.searchWord) {
            return;
        }

        setState({
            ...state,
            isFetching: true
        });

        locationService.getLocationsBySearchWord(state.searchWord.toLocaleLowerCase())
            .then(response => {
                if (response.data.length) {
                    return Promise.all(response.data.map(location => locationService.getWeatherForTheLocationWoeid(location.woeid)));
                }
                setState({ ...state, error: 'There are no results for this search' });
            })
            .then(response => response && setState({
                ...state,
                locations: [...state.locations, ...response.map(location => location.data)],
                isFetching: false,
                error: '',
            }))
            .catch(e => setState({ ...state, error: e.message }));
    };

    const onInputChange = (value: string) => {
        setState({ ...state, searchWord: value });
    };

    return (
        <div>
            <UserInput onChange={onInputChange} placeholder="Location" />
            <Button label="Search" onClick={onButtonClick} />
            {state.isFetching && <p>Loading...</p>}
            {state.locations.map(location => <LocationWeatherItem location={location} />)}
            {state.error && <Error message={state.error} />}
        </div>
    );
};

export default Main;
