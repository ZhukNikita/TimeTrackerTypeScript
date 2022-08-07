import React from "react";

interface ButtonStartStop {
    classname: string;
    title: string;
    param: boolean
    StartStop: (timeOn: boolean) => void;
}

const ButtonStartStop: React.FC<ButtonStartStop> = (props) => {
    return (
        <button className={props.classname} onClick={() => {
            props.StartStop(props.param)
        }}
        >
            <span className="material-icons">
                {props.title}
            </span>
        </button>
    )
}
export default ButtonStartStop;

