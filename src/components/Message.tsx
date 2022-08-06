import React, {Dispatch, SetStateAction} from "react";
import {iTracker} from "../types/data";
interface Message {
    id : number;
    items: iTracker[]
    messageClear: () => void;
    setNewTracks: Dispatch<SetStateAction<iTracker[]>>
}
const RemoveMessage: React.FC<Message> = (props) => {
    const { id  , messageClear   , items , setNewTracks} = props;
    const removeTodo = (id: number): void => {
        setNewTracks(items.filter(tracker => tracker.id !== id))
    }
    return(
        <div className="message-wrapper">
            <div className="message">
                <h1>Do you really want to delete this tracker?</h1>
                <button onClick={()=>{removeTodo(id)}}>Delete</button>
                <button onClick={()=> {
                    messageClear()
                }}>Cancel</button>
            </div>
        </div>
    )
}
export default RemoveMessage;
