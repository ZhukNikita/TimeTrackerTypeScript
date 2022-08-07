import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {iTracker} from "../types/data";
import RemoveMessage from "./Message";
import TrackerTime from "./TrackerTime";
import ButtonStartStop from "./ButtonStartStop";

interface TrackerItemInt extends iTracker {
    id: number;
    index: number;
    items: iTracker[];
    setNewTracks: Dispatch<SetStateAction<iTracker[]>>
}

const TrackerItem: React.FC<TrackerItemInt> = (props) => {
    const {id, index, items, setNewTracks} = props
    const [message, setMessage] = useState<string | JSX.Element>('');
    const [timeOn, setTimeOn] = useState<boolean>(() => {
        if (items[index]) {
            return items[index].timeOn
        } else {
            return false
        }
    })
    const [time, setTime] = useState(() => {
        if (items[index]) {
            return items[index].time
        } else {
            return 0
        }
    })

    function StartStop(bool : boolean){
        setTimeOn(bool)
        setNewTracks((prevState) => {
            const newState = [...prevState]
            newState[index].timeOn = !timeOn;
            newState[index].time = time;
            return newState
        })
    }
    window.onbeforeunload = () => {
        setNewTracks((prevState) => {
            const newState = [...prevState]
            newState[index].time = time;
            return newState
        })
    };

    useEffect(() => {
        let interval: any = null;
        if (timeOn) {
            interval = setInterval(() => {
                setTime(prevState => prevState + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timeOn])

    function Message() {
        const messageText =
            <RemoveMessage
                id={id}
                items={items}
                setNewTracks={setNewTracks}
                setMessage={setMessage}
            />
        setMessage(messageText)
    }

    return (
        <div className='TrackerItem'>
            <li className="tracker">
                <h4>{items[index].name}</h4>
                <TrackerTime time={time}/>
                <div className="trackerButtons">
                    {!timeOn && (
                        <ButtonStartStop classname={'start'} title={'play_circle'} param={true} StartStop={StartStop}/>
                    )}
                    {timeOn && (
                        <ButtonStartStop classname={'pause'} title={'pause_circle'} param={false} StartStop={StartStop}/>
                    )}
                    <button className="delete" onClick={Message}>
                        <span className="material-icons">
                            remove
                        </span>
                    </button>
                </div>
                {message}
            </li>
            <hr/>
        </div>
    )
}
export default TrackerItem;
