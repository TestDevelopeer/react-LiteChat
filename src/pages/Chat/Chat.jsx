import React, {useEffect, useRef, useState} from 'react';
import socket from "../../socket";
import directChat from '../../assets/images/directChat.png';
import groupChat from '../../assets/images/groupChat.png';
import userImage from '../../assets/images/user.png';
import background from '../../assets/images/wallpaper/2.jpg';

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [messageValue, setMessageValue] = useState('');
    const [openMobileChat, setMobileChat] = useState(false);
    const messageRef = useRef(null);

    const onSendMessage = () => {
        const date = new Date();
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue,
            date: `${date.getHours()}:${date.getMinutes()}`
        });
        onAddMessage({
            userName,
            text: messageValue,
            isMe: true,
            date: `${date.getHours()}:${date.getMinutes()}`
        });
        setMessageValue('');
    }

    const onKeyUpValue = (e) => {
        if (e.which === 13) {
            if (messageValue) onSendMessage();
        }
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999);
    });

    return (
        <>
            <div className={`chitchat-container sidebar-toggle ${openMobileChat === true ? 'mobile-menu' : ''}`}>
                <aside className="chitchat-left-sidebar left-disp">
                    <div className="recent-default dynemic-sidebar active">
                        <div className="chat custom-scroll">
                            <ul className="chat-cont-setting">
                                <li><a href="#" data-toggle="modal" data-target="#msgchatModal"><span>new chat</span>
                                    <div className="icon-btn btn-outline-primary button-effect btn-sm"><i data-feather="message-square"/></div>
                                </a></li>
                            </ul>
                            <div className="theme-tab chat-tabs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" data-to="chat-content">
                                        <a className="nav-link button-effect" href="#">
                                            <i data-feather="message-square"> </i>
                                            {users.length < 3 ? 'Личный чат' : 'Групповой чат'}
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="chat" role="tabpanel" aria-labelledby="chat-tab">
                                        <div className="theme-tab">

                                            <div className="tab-content" id="myTabContent1">
                                                <div className="tab-pane fade show active" id="group" role="tabpanel" aria-labelledby="group-tab">
                                                    <ul className="group-main">
                                                        <li onClick={() => setMobileChat(true)} className={openMobileChat === true ? 'active' : ''} data-to="group_chat">
                                                            <div className="group-box">
                                                                <div className="profile"><img className="bg-img" src={users.length < 3 ? directChat : groupChat}
                                                                                              alt="Avatar"/></div>
                                                                <div className="details">
                                                                    <a className="nav-link button-effect active"
                                                                       href="#">{openMobileChat ? `Комната: ${roomId}` : `Войти в комнату: ${roomId}`}</a>

                                                                </div>
                                                                <div className="date-status">
                                                                    <ul className="grop-icon">
                                                                        {users.length < 3 ?
                                                                            users.map((name, index) =>
                                                                                    <li key={`onlineUsers_${index}`}><a className="group-tp" href="#" data-tippy-content={name}> <img
                                                                                    src={userImage} alt="group-icon-img"/></a></li>
                                                                                ) : <>
                                                                            <li><a className="group-tp" href="#" data-tippy-content="Josephin"> <img
                                                                                src={userImage} alt="group-icon-img"/></a></li>
                                                                            <li><a className="group-tp" href="#" data-tippy-content="Jony "> <img
                                                                            src={userImage} alt="group-icon-img"/></a></li>
                                                                            <li><a className="group-tp" href="#" data-tippy-content="Pabelo"> <img
                                                                            src={userImage} alt="group-icon-img"/></a></li>
                                                                            </>
                                                                        }
                                                                        <li>({users.length})</li>
                                                                    </ul>
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
                            <div className="theme-tab chat-tabs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" data-to="chat-content"><a className="nav-link button-effect" href="#"><i
                                        data-feather="message-square"> </i>Пользователи:</a></li>
                                </ul>
                                <div className="tab-content" id="myTabContent2">
                                    <div className="tab-pane fade show active">
                                        <div className="theme-tab">
                                            <div className="tab-content" id="myTabContent3">
                                                <div className="tab-pane fade show active">
                                                    <ul className="chat-main">
                                                        {users.map((name, index) => <li key={`chatUser_${index}`} data-to="blank">
                                                            <div className="chat-box">
                                                                <div className="profile online bg-size"
                                                                     style={{backgroundImage: 'url(' + userImage + ')', backgroundSize: 'cover', backgroundPosition: 'center center', display: 'block'}}>
                                                                    <img className="bg-img" src={userImage} alt="Avatar"
                                                                         style={{display: 'none'}}/></div>
                                                                <div className="details">
                                                                    <h5>{name}</h5>
                                                                </div>
                                                            </div>
                                                        </li>)}
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
                    <div className={`chat-content tabto ${openMobileChat === true ? 'active' : ''}`}>
                        <div ref={messageRef} className="messages custom-scroll active" id="chating" style={{backgroundImage: 'url(' + background + ')', backgroundBlendMode: 'unset', backgroundColor: 'transparent'}}>
                            <div className="contact-details">
                                <div className="row">
                                    <form className="form-inline search-form">
                                        <div className="form-group">
                                            <input className="form-control-plaintext" type="search" placeholder="Search.."/>
                                            <div className="icon-close close-search"/>
                                        </div>
                                    </form>
                                    <div className="col-7">
                                        <div className="media left">
                                            <div className="media-left mr-3">
                                                <ul>
                                                    <li><a onClick={() => setMobileChat(false)} className="icon-btn btn-light button-effect mobile-sidebar" href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                             className="feather feather-chevron-left">
                                                            <polyline points="15 18 9 12 15 6"/>
                                                        </svg>
                                                    </a></li>
                                                </ul>
                                            </div>
                                            <div className="media right">
                                                <h5>Ваше имя: {userName}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-chat">
                                <ul className="chatappend">
                                    {messages.map((message) => <li className={!message.isMe ? "sent" : "replies"}>
                                            <div className="media">
                                                <div className="profile mr-4"><img className="bg-img" src={userImage} alt="Avatar"/>
                                                </div>
                                                <div className="media-body">
                                                    <div className="contact-name">
                                                        <h5>{message.userName}</h5>
                                                        <h6>{message.date}</h6>
                                                        <ul className="msg-box">
                                                            <li className="msg-setting-main">
                                                                <h5>{message.text}</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="message-input">
                            <div className="wrap emojis-main">
                                <input onKeyDown={(e) => onKeyUpValue(e)} value={messageValue} onChange={(e) => setMessageValue(e.target.value)} className="setemoj" id="setemoj"
                                       type="text"
                                       placeholder="Введите сообщение..."/>
                                <button onClick={onSendMessage} className={`icon-btn btn-primary ${!messageValue ? 'disabled' : ''}`} disabled={!messageValue}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                         className="feather feather-send">
                                        <line x1="22" y1="2" x2="11" y2="13"/>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                    </svg>
                                    <i data-feather="send"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;