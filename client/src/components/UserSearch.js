import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsersBySearch, fetchAllUsers } from "../api/users";

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

function UserSearch() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		const fetchResults = async () => {
			const cleaned = query.replace(/^[\s,#]+/, "");
			if (cleaned.trim() === "") {
				const fetchedData = await fetchAllUsers();
				setResults(
					fetchedData.users.filter(
						(user) => user.uid != localStorage.getItem("uid")
					)
				);
			} else if (
				/^\d+$/.test(query.trim()) ||
				/^\S+@\S+\.\S+$/.test(query.trim())
			) {
				setResults([]);
			} else {
				const fetchedData = await fetchUsersBySearch(query);
				setResults(
					fetchedData.users.filter(
						(user) => user.uid != localStorage.getItem("uid")
					)
				);
			}
		};
		fetchResults();
	}, [query]);

	return (
		<div
			style={{
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
				backgroundColor: "white",
				maxHeight: "90%",
			}}
		>
			<h1 style={{ padding: "0px" }}>User Search</h1>
			<input
				type="text"
				value={query}
				onChange={handleQueryChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
				placeholder="Jane Doe"
			/>
			<SearchResults results={results} />
		</div>
	);
}

export default UserSearch;
