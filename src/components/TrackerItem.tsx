import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {iTracker} from "../types/data";
import RemoveMessage from "./Message";

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
        var messageText =
            <RemoveMessage
                id={id}
                items={items}
                messageClear={messageClear}
                setNewTracks={setNewTracks}
            />
        setMessage(messageText)
    }

    const messageClear = (): void => {
        setMessage('')
    }
    return (
        <div className='TrackerItem'>
            <li className="tracker">
                <h4>{items[index].name}</h4>
                <div>
                    <span>{('0' + Math.floor(time / 3600000) % 100).slice(-2)}:</span>
                    <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span>{('0' + (time / 10) % 100).slice(-2)}</span>
                </div>
                <div className="trackerButtons">
                    {!timeOn && (
                        <button className="start" onClick={() => {
                            setTimeOn(true)
                            setNewTracks((prevState) => {
                                const newState = [...prevState]
                                newState[index].timeOn = !timeOn;
                                newState[index].time = time;
                                return newState
                            })

                        }}
                        >
	      		    	<span className="material-icons">
	      		        	play_circle
		      			</span>
                        </button>
                    )}
                    {timeOn && (
                        <button className="pause" onClick={() => {
                            setTimeOn(false)
                            setNewTracks((prevState) => {
                                const newState = [...prevState]
                                newState[index].timeOn = !timeOn;
                                newState[index].time = time;
                                return newState
                            })
                        }}>
			  		    <span className="material-icons">
			  		    	pause_circle
			  		    </span>
                        </button>
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
