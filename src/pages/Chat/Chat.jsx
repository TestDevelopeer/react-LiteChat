import React, {useEffect, useRef, useState} from 'react';
import socket from "../../socket";

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [messageValue, setMessageValue] = useState('');
    const messageRef = useRef(null);

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        });
        onAddMessage({
            userName,
            text: messageValue,
            isMe: true
        });
        setMessageValue('');
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999);
    });

    return (
        <div className="chitchat-container sidebar-toggle">
            <aside className="chitchat-left-sidebar left-disp">
                <div className="recent-default dynemic-sidebar active">

                    <div className="chat custom-scroll">
                        <ul className="chat-cont-setting">
                            <li><a href="#" data-toggle="modal" data-target="#msgchatModal"><span>new chat</span>
                                <div className="icon-btn btn-outline-primary button-effect btn-sm"><i data-feather="message-square"/></div>
                            </a></li>
                        </ul>
                        <div className="theme-title">
                            <div className="media">
                                <div>
                                    <h2>Комната: {roomId}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="theme-tab tab-sm chat-tabs">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="chat" role="tabpanel" aria-labelledby="chat-tab">
                                    <div className="theme-tab">
                                        <ul className="nav nav-tabs" id="myTab1" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link button-effect active" id="direct-tab"
                                                   data-toggle="tab" href="#" role="tab" aria-controls="direct"
                                                   aria-selected="false" data-to="chating">Онлайн ({users.length}):</a>
                                            </li>

                                        </ul>
                                        <div className="tab-content" id="myTabContent1">
                                            <div className="tab-pane fade show active" id="direct" role="tabpanel" aria-labelledby="direct-tab">
                                                <ul className="chat-main">
                                                    <li data-to="blank">
                                                        <div className="chat-box">
                                                            <div className="details">
                                                                {users.map((name, index) => <h5 key={name + index}>{name}</h5>)}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="chitchat-main small-sidebar" id="content">
                <div className="chat-content tabto active">
                    <div ref={messageRef} className="messages custom-scroll active" id="chating">
                        <div className="contact-chat">
                            <ul className="chatappend">
                                {messages.map((message) => (
                                    <li className={!message.isMe ? "sent" : "replies"}>
                                        <div className="media">
                                            <div className="media-body">
                                                <div className="contact-name">
                                                    <h5>{message.userName}</h5>
                                                    <ul className="msg-box">
                                                        <li className="msg-setting-main">
                                                            <h5>{message.text} </h5>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="message-input">
                        <div className="wrap emojis-main">
                            <input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} className="setemoj" id="setemoj" type="text"
                                   placeholder="Введите сообщение..."/>
                            <button onClick={onSendMessage} className="nav-link button-effect active" id="send-msg" disabled={!messageValue}>Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;