import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsersBySearch } from "../api";

function SearchResult({ user }) {
	return (
		<div
			style={{
				padding: "2px",
				cursor: "pointer",
				transition: "background-color 0.2s ease-in-out",
				borderRadius: "5px",
				margin: "5px 0",
			}}
		>
			<Link
				to={`/user/${user.uid}`}
				style={{ color: "#3478f6", textDecoration: "none" }}
			>
				{user.fname} {user.lname}
			</Link>
		</div>
	);
}

function SearchResults({ results }) {
	return (
		<div style={{ maxHeight: "180px", overflowY: "auto" }}>
			{results.map((result) => (
				<SearchResult key={result.uid} user={result} />
			))}
		</div>
	);
}

function SearchForFriends() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		const fetchResults = async () => {
			if (
				query.trim() !== "" &&
				!/^\d+$/.test(query.trim()) &&
				!/^\S+@\S+\.\S+$/.test(query.trim())
			) {
				const fetchedData = await fetchUsersBySearch(query);
				setResults(
					fetchedData.users.filter(
						(user) => user.uid != localStorage.getItem("uid")
					)
				);
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
			<SearchResults results={results} />
		</div>
	);
}

export default SearchForFriends;
