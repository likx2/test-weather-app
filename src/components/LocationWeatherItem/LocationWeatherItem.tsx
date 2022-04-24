import React, { FC } from "react";
import { LocationWithWeather } from "../../types";
import Error from "../Error/Error";

interface LocationWeatherItemProps {
    location: LocationWithWeather
}

const LocationWeatherItem: FC<LocationWeatherItemProps> = ({ location }) => {
    const currentDate = new Date();
    const todayWeather = location.consolidated_weather.find(weather => new Date(weather.applicable_date).getDate() === currentDate.getDate());
    if (!todayWeather) {
        return <Error message="There is no weather for a such day" />;
    }

    return (
        <div>
            {location.title} | {todayWeather.applicable_date} | {Math.floor(todayWeather.the_temp)}
        </div>
    );
};

export default LocationWeatherItem;
