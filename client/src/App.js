import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Tag from "./pages/Tag";

function App() {
	return (
		<div>
			<Route exact path="/" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/home" component={Home} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/user/:uid" component={User} />
			<Route exact path="/tag/:txt" component={Tag} />
		</div>
	);
}

export default App;
