import React from "react";
interface TimerInt {
    time : number
}
const TrackerTime: React.FC<TimerInt> = (props) => {
    const {time} = props
    return(
        <div>
            <span>{('0' + Math.floor(time / 3600000) % 100).slice(-2)}:</span>
            <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{('0' + (time / 10) % 100).slice(-2)}</span>
        </div>
    )
}
export default TrackerTime;

