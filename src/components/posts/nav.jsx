import React, {useState, useContext} from "react";
import { LogOut } from "./logout";
import { UserContext } from "../../contextApi/userContext";
import facebook from "../../images/logo/facebook.svg";
export const NavBar = () => {
    const { modifyState } = useContext(UserContext); //to profile of the user
    const [showLogout, setShowLogout] = useState(false);

    const handleLogoutClick = () => {
    setShowLogout(!showLogout);
    };

    return (
        <div className="nav">
            <div className="nav-bar">

                <section className="top">
                    <img src={facebook} alt="logo"/>
                    <i className="bi bi-plus-lg"></i>
                    <i className="bi bi-search"></i>
                    <i className="bi bi-messenger"></i>
                </section>
                <section className="bottom">
                    <i className="bi bi-house-door-fill"></i>
                    <i className="bi bi-people"></i>
                    <i className="bi bi-play-btn"></i>
                    <i className="bi bi-shop"></i>
                    <i className="bi bi-bell"></i>
                    <i className="bi bi-person-circle"
                    onClick={() => modifyState(2)}
                    ></i>
                    <i 
                    className="bi bi-box-arrow-in-left"
                    onClick={handleLogoutClick}>
                    </i>
                </section>
            </div>
            {showLogout && (
            <div id="handle-logout">
                <LogOut
                showLogout={showLogout}
                setShowLogout={setShowLogout}
                handleLogout={handleLogoutClick}
                 />
            </div>
            )}
        </div>
    )
}