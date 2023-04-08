import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import User from "./components/User";

function App() {
	return (
		<div>
			<Route exact path="/" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/home" component={Home} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/user/:uid" component={User} />
		</div>
	);
}

export default App;
