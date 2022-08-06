import React, {Dispatch, SetStateAction} from "react";
import TrackerItem from "./TrackerItem";
import {iTracker} from "../types/data";
interface  TrackerList {
    items : iTracker[]
    setNewTracks: Dispatch<SetStateAction<iTracker[]>>
}
const TrackerList: React.FC<TrackerList> = (props) => {
    const { items, setNewTracks}= props;

    return(
        <div>
            {
                items.map((tracker,index) =>
                <TrackerItem
                    key ={tracker.id} {...tracker}
                    setNewTracks={setNewTracks}
                    index = {index}
                    items={items}
                    id = {tracker.id}
                />)
            }
        </div>
    )
}
export default TrackerList;
