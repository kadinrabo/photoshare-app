import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {
	return (
		<div>
			<Route exact path="/" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/home" component={Home} />
			<Route exact path="/profile" component={Profile} />
		</div>
	);
}

export default App;
