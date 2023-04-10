import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTagsByQuery, fetchAllTags } from "../api/tags";

function SearchResult({ tag }) {
	return (
		<div
			style={{
				padding: "0px",
				cursor: "pointer",
				transition: "background-color 0.2s ease-in-out",
				borderRadius: "1px",
				margin: "0px",
			}}
		>
			<Link
				to={`/tag/${tag.tag.substring(1)}`}
				style={{
					display: "inline-block",
					marginRight: "10px",
					color: "#3478f6",
					textDecoration: "none",
					margin: "0px",
					padding: 2,
				}}
			>
				{tag.tag}
			</Link>
		</div>
	);
}

function SearchResults({ results }) {
	return (
		<div style={{ maxHeight: "180px", overflowY: "auto" }}>
			{results.map((result) => (
				<SearchResult key={result.tid} tag={result} />
			))}
		</div>
	);
}

function TagSearch() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		const fetchResults = async () => {
			const cleaned = query.replace(/^[\s,#]+/, "");
			if (cleaned.trim() === "") {
				const fetchedData = await fetchAllTags();
				setResults(fetchedData.tags);
			} else if (
				cleaned.indexOf("#") !== -1 ||
				!(cleaned.split(",").length === 1 || cleaned.split(",").length > 1)
			) {
				setResults([]);
			} else {
				if (/,,/g.test(cleaned)) {
					setResults([]);
				} else if (!(cleaned.slice(-1) === ",")) {
					const fetchedData = await fetchTagsByQuery(cleaned);
					const uniqueTags = fetchedData.tags.filter((tag, index, self) => {
						return (
							index ===
							self.findIndex((existingTag) => existingTag.tag === tag.tag)
						);
					});
					setResults(uniqueTags);
				} else {
					const fetchedData = await fetchTagsByQuery(cleaned.slice(0, -1));
					const uniqueTags = fetchedData.tags.filter((tag, index, self) => {
						return (
							index ===
							self.findIndex((existingTag) => existingTag.tag === tag.tag)
						);
					});
					setResults(uniqueTags);
				}
			}
		};
		fetchResults();
	}, [query]);

	return (
		<>
			<div
				style={{
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
					maxHeight: "90%",
				}}
			>
				<h1 style={{ padding: "0px" }}>Tag Search</h1>
				<input
					type="text"
					value={query}
					onChange={handleQueryChange}
					placeholder="#fish"
					style={{
						padding: "5px",
						border: "1px solid #ddd",
						borderRadius: "5px",
						marginBottom: "10px",
						maxWidth: "90%",
					}}
				/>
				<SearchResults results={results} />
			</div>
		</>
	);
}

export default TagSearch;
