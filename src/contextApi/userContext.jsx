import React, { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types library

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
    const [userData, setUserData] = useState('');
    //state 0: disconnected state 1: posts section state 2: profile
    const [currentState, setCurrentState] = useState(0);

    const modifyState = (newState) => {
        setCurrentState(newState)
    };
    const modifyUserContext = (data) => {
        setUserData(data)
    };

    const contextValues = {userData, currentState, modifyState, modifyUserContext};
    
    return (
        <UserContext.Provider value={contextValues}>
            {props.children}
        </UserContext.Provider>
    )
};

// Add prop validation for children prop
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};