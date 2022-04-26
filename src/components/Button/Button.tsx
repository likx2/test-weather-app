import React, { FC, MouseEvent } from "react";

interface ButtonProps {
    label: string,
    onClick: () => void,
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        onClick();
    };

    return (
        <button onClick={onClickHandler}>{label}</button>
    );
};

export default Button;
