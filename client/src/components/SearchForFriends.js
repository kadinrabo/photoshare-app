import { useState, useEffect } from "react";
import Popup from "./Popup";
import { fetchUsersBySearch } from "../api";
import User from "./User";

function SearchResult({ user, onItemClick }) {
	const fname = user.fname;
	const lname = user.lname;
	return (
		<div
			onClick={() => onItemClick(user)}
			style={{
				padding: "2px",
				cursor: "pointer",
				transition: "background-color 0.2s ease-in-out",
				borderRadius: "5px",
				margin: "5px 0",
			}}
		>
			{fname} {lname}
		</div>
	);
}

function SearchResults({ results, onItemClick }) {
	return (
		<div style={{ maxHeight: "180px", overflowY: "auto" }}>
			{results.map((result) => (
				<SearchResult
					key={result.uid}
					user={result}
					onItemClick={onItemClick}
				/>
			))}
		</div>
	);
}

function SearchForFriends() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [user, setUser] = useState(null);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
	};

	const handleResultClick = (result) => {
		setUser(result);
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	useEffect(() => {
		const fetchResults = async () => {
			if (
				query.trim() !== "" &&
				!/^\d+$/.test(query.trim()) &&
				!/^\S+@\S+\.\S+$/.test(query.trim())
			) {
				const fetchedData = await fetchUsersBySearch(query);
				setResults(fetchedData.users);
			} else {
				setResults([]);
			}
		};
		fetchResults();
	}, [query]);

	return (
		<div
			style={{
				width: "200px",
				height: "250px",
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
				backgroundColor: "white",
			}}
		>
			<p style={{ padding: "0px" }}>Search for others</p>
			<input
				type="text"
				value={query}
				onChange={handleQueryChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
				}}
			/>
			<SearchResults results={results} onItemClick={handleResultClick} />
			<Popup onClose={handleClosePopup} isOpen={showPopup}>
				{user && (
					// Show the other user information here with user object
					<User user={user} />
				)}
			</Popup>
		</div>
	);
}

export default SearchForFriends;
