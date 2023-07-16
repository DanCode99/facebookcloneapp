import { useState, useContext } from "react";
import { UserContext } from "../../contextApi/userContext";
import  facebook  from "../../images/logo/facebook.svg";
import  meta from "../../images/logo/meta-med.svg";

export const Login = () => {
const { modifyState, modifyUserContext } = useContext(UserContext);
  // State hooks for managing form input values and error messages
const [firstName, setFirstName] = useState(''); // State for first name input value
const [lastName, setLastName] = useState(''); // State for last name input value
const [birthDate, setBirthDate] = useState(''); // State for birthdate input value
const [username, setUsername] = useState(''); // State for username input value
const [password, setPassword] = useState(''); // State for password input value
const [errorMessage, setErrorMessage] = useState(''); // State for error message
const [isSignup, setIsSignup] = useState(false); // State to manage signup mode
const [users, setUsers] = 
useState(() => JSON.parse(localStorage.getItem('users')) || []); // State for storing user data fetched from local storage

// Function to validate email format
const validateEmail = (email) => {
  // Regular expression to validate email format
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};

// Event handler for first name input change
const handleFirstNameChange = (e) => {
  setFirstName(e.target.value);
};

// Event handler for last name input change
const handleLastNameChange = (e) => {
  setLastName(e.target.value);
};

// Event handler for birthdate input change
const handleBirthdateChange = (e) => {
  setBirthDate(e.target.value);
};

// Event handler for username input change
const handleUsernameChange = (e) => {
  setUsername(e.target.value);
};

// Event handler for password input change
const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

// Event handler for login button click
const handleLogin = () => {
  if (!validateEmail(username)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }

  if (!username || !password) {
    setErrorMessage('Username and password are required.');
    return;
  }

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    modifyState(1)
    // Store logged-in user data in usercontext state
      modifyUserContext(user);
  } else {
    setErrorMessage('Invalid username or password.');
  }
};

// Event handler for signup button click
// Event handler for signup button click
const handleSignup = () => {
  if (!validateEmail(username)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }

  if (!username || !password || !firstName || !lastName || !birthDate) {
    setErrorMessage('All fields are required.');
    return;
  }

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    setErrorMessage('Email already exists.');
  } else {
    // Regular expression to check for numbers or symbols
    const regex = /^[a-zA-Z\s]+$/;

    if (!regex.test(firstName) || !regex.test(lastName)) {
      setErrorMessage('First name and last name should only contain letters.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
      return;
    }

    const newUser = { firstName, lastName, birthDate, username, password };
    setUsers([...users, newUser]); // Update users state with new user
    localStorage.setItem('users', JSON.stringify([...users, newUser])); // Update local storage with new user
    alert('User created successfully!');

    // Automatically log in the new user
    // Store logged-in user data in usercontext state
    modifyState(1);
    modifyUserContext(newUser);

    setIsSignup(false); // Reset signup mode after successful signup

    // Clear input field values
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setBirthDate('');

    // Perform signup logic here (e.g., setting authentication state)
    setErrorMessage('');
  }
};

// Event handler for toggle mode button click
const handleToggleMode = () => {
  setIsSignup(!isSignup);
  setErrorMessage(''); // Reset error message when toggling
}

    return (
       <div className="login">
        <div className="login-container">
          <div className="login-logo">
            <img src={facebook} alt="Facebook Logo" className="logo"/>
            <h1>Connect with friends and the world around you on Facebook.</h1>
          </div>
            <div className="big-login">
            {!isSignup && (
            <div>
              <form className="login-form">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={username} 
                  onChange={handleUsernameChange} 
                  required/>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin();
                    }
                  }}
                />
                {errorMessage && <p>{errorMessage}</p>}
                <button type="button" className="button1" onClick={handleLogin}>
                  Log in
                </button>
                  <p>or</p>
                {!isSignup && (
                  <button type="button" className="button2" onClick={handleToggleMode}>
                    Create new account
                  </button>
                )}
              </form>
            </div> )}
            {/*signup section*/}
            {isSignup && (
          <div className="signup">
            <p onClick={handleToggleMode}><i className="bi bi-x-circle"></i></p>
            <form>
              <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
              <input type="email" placeholder="Email" value={username} onChange={handleUsernameChange} />
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              <input type="date" placeholder="Birth Date" 
                value={birthDate} onChange={handleBirthdateChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSignup();
                  }
                }}
              />
              <button type="button" className="signup-btn"onClick={handleSignup}>
                Sign Up
              </button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
          )}
            </div>
        </div>
          <footer className="login-footer">
                <p>Note: You&apos;ll need to create an account to Log in, it
                   will be saved in your local storage. You can make posts, comment, press like in posts, 
                   see your profile and log out.</p>
              <div className="login-lang">
                <ul className="one">
                  <li>English (US)</li>
                  <li>Français (France)</li>
                  <li>Deutsch</li>
                  <li>中文(简体)</li>
                </ul>
                <ul className="two">
                  <li>Español</li>
                  <li>Português (Brasil)</li>
                  <li>Italiano</li>
                  <li>Svenska</li>
                </ul>
              </div>
              <ul className="about">
                  <li>About</li>
                  <li>Terms</li>
                  <li>Help</li>
                </ul>
              <p>Meta <img src={meta} className="meta" /> © 2023</p>
            </footer>
        </div>
    )
};