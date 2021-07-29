import React, {useEffect, useReducer} from "react";
import Join from "./pages/Join/Join";
import socket from "./socket";
import reducer from "./reducer";
import axios from 'axios';
import Chat from "./pages/Chat/Chat";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        });
        socket.emit('ROOM:JOIN', obj);
        const {data} = await axios.get(`rooms/${obj.roomId}`);
        dispatch({
            type: 'SET_DATA',
            payload: data
        });
    }

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        });
    }

    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        });
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);

    return (<>
        {!state.joined ? <Join onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage} />}
        </>
    );
}

export default App;
