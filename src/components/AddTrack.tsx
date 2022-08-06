import React, {Dispatch, SetStateAction, useState} from "react";
import {iTracker} from "../types/data";

interface AddTrackInt {
    items: iTracker[]
    setNewTracks: Dispatch<SetStateAction<iTracker[]>>
}

const AddTrack: React.FC<AddTrackInt> = ({items, setNewTracks}) => {
    var date = new Date()
    var month = date.getMonth() + 1
    var defaultTrackName = `${date.getDate()}/${month.toString().padStart(2, '0')}/${date.getFullYear()}`
    const [trackName, setTrackName] = useState('')
    const [timeOn, setTimeOn] = useState(true)
    const [time, setTime] = useState(0)

    const CreateNewTrack = (): void => {
        setTimeOn(true)
        setTime(0)
        setNewTracks([{
            id: Date.now(),
            name: trackName,
            time: time,
            timeOn: timeOn
        }, ...items])
    }
    const TrackerName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTrackName(e.target.value)
        if (!e.target.value) {
            setTrackName(defaultTrackName)
        }
    }
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            CreateNewTrack();
            e.target.value = ''
            if (!e.target.value) {
                setTrackName(defaultTrackName)
            }
        }
    }
    return (
        <div className="AddTrack">
            <input
                type="text"
                placeholder="Enter tracker name"
                onChange={TrackerName}
                onKeyDown={handleKeyDown}
                maxLength={25}
            />
            <button type="reset" onClick={() => {
                CreateNewTrack()
            }}>
          <span className="material-icons">
            play_circle
          </span>
            </button>
        </div>
    );
}
export default AddTrack