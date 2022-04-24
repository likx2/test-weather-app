import React, { ChangeEvent, FC } from "react";

interface UserInputProps {
    onChange: (value: string) => void
    label?: string,
    placeholder?: string,
}

const UserInput: FC<UserInputProps> = ({ label= '', placeholder = '', onChange }) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <div>
            <label>{label}</label>
            <input placeholder={placeholder} onChange={onChangeHandler} />
        </div>
    );
};

export default UserInput;
