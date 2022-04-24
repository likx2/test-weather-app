import React, { FC, useState } from "react";
import UserInput from "./UserInput/UserInput";
import Button from "./Button.tsx/Button";
import LocationService from "../services/LocationService";
import { LocationWithWeather } from "../types";
import Error from "./Error/Error";
import LocationWeatherItem from "./LocationWeatherItem/LocationWeatherItem";

interface MainProps {

}

interface MainState {
    isFetching: boolean;
    searchWord: string;
    location: LocationWithWeather | null;
    error: string;
}

const locationService = new LocationService();

const Main: FC<MainProps> = () => {

    const initialState: MainState = {
        isFetching: false,
        searchWord: '',
        location: null,
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
            .then(response => locationService.getWeatherForTheLocationWoeid(response.data[0].woeid))
            .then(response => setState({ ...state, location: response.data, isFetching: false }))
            .catch(e => setState({ ...state, error: e.message }));
    };

    const onInputChange = (value: string) => {
        setState({ ...state, searchWord: value });
    };

    return (
        <div>
            <UserInput onChange={onInputChange} placeholder="Location" />
            <Button label="Search" onClick={onButtonClick} />
            {state.location && <LocationWeatherItem location={state.location} />}
            {state.error && <Error message={state.error} />}
        </div>
    );
};

export default Main;
