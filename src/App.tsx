import React, {useEffect, useState} from 'react';
import './App.css';
import {iTracker} from "./types/data";
import AddTrack from "./components/AddTrack";
import TrackerList from "./components/TrackerList";

const App: React.FC = () => {
    const [tracks, setNewTracks] = useState<iTracker[]>(() => {
        const saved = localStorage.getItem('key')
        const initialValue: [] = JSON.parse(saved || '')
        return initialValue || []
    })
    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(tracks))
    }, [tracks])

    return (
        <div className='App'>
            <div className="TimeTracker">
                <h1>Tracker</h1>
                <AddTrack
                    items={tracks}
                    setNewTracks={setNewTracks}
                />
            </div>
            <TrackerList items={tracks} setNewTracks={setNewTracks}/>
        </div>
    )
}
export default App;
