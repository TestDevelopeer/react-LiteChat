import React, {useState} from 'react';

import landingLogo from "../../assets/images/logo/landing-logo.png";
import cloudLogo from "../../assets/images/login_signup/2.png";
import axios from "axios";

const Join = ({ onLogin }) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Заполните все поля');
        }
        const obj = {
            roomId,
            userName
        };
        setLoading(true);
        await axios.post('/litechat/rooms', obj);
        onLogin(obj);
    }

    return (
        <div className="login-page2 animat-rate">
            <div className="login-content-main">
                <div className="login-content">
                    <div className="login-content-header"><img className="img-fluid" src={landingLogo} alt="images"/>
                    </div>
                    <h4>Пожалуйста, авторизуйтесь.</h4>
                    <form className="form2">
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="inputEmail3">Room ID</label>
                            <input
                                value={roomId}
                                onChange={e => setRoomId(e.target.value)}
                                className="form-control"
                                type="text"
                                placeholder="Введите Room ID"/>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="inputPassword3">Ваше имя</label><span> </span>
                            <input
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                className="form-control"
                                type="text"
                                placeholder="Введите Ваше имя"/>
                        </div>
                        <div className="form-group mb-0">
                            <div className="buttons">
                                <button disabled={isLoading} onClick={onEnter} className="btn button-effect btn-primary">
                                    {isLoading ? 'Вход...': 'Войти'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="animation-block">
                <div className="bg_circle">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="cross"/>
                <div className="cross1"/>
                <div className="cross2"/>
                <div className="dot"/>
                <div className="dot1"/>
                <div className="top-circle"/>
                <div className="center-circle"/>
                <div className="bottom-circle1"/>
                <div className="right-circle"/>
                <div className="right-circle1"/>
                <div className="quarterCircle"/>
                <img className="cloud-logo" src={cloudLogo} alt="login logo"/>
                <img className="cloud-logo1" src={cloudLogo} alt="login logo"/>
                <img className="cloud-logo2" src={cloudLogo} alt="login logo"/>
                <img className="cloud-logo3" src={cloudLogo} alt="login logo"/>
                <img className="cloud-logo4" src={cloudLogo} alt="login logo"/>
                <img className="cloud-logo5" src={cloudLogo} alt="login logo"/>
            </div>
        </div>
    );
}

export default Join;