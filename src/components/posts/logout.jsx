import React, { useContext } from "react";
import { UserContext } from "../../contextApi/userContext";
import PropTypes from "prop-types";

export const LogOut = ({ showLogout, handleLogout }) => {
  const { modifyState } = useContext(UserContext);

  const handleLogoutConfirmation = () => {
    modifyState(0);
  };

  return (
    <div>
      {showLogout && (
        <div id="logout">
          <h1>Are you sure you want to logout?</h1>
          <div>
            <button className="yes" onClick={handleLogoutConfirmation}>
              Yes
            </button>
            <button className="no" onClick={handleLogout}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

LogOut.propTypes = {
  showLogout: PropTypes.bool,
  handleLogout: PropTypes.func,
};