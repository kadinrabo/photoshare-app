import React, { useEffect, useState } from "react";
import { fetchTop10PopularTags } from "../api";

function TrendingTags() {
	const [topTags, setTopTags] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetchTop10PopularTags();
			setTopTags(fetchedData.tags);
		}
		fetchData();
	}, []);

	return (
		<>
			<div
				className="trending-tags-container"
				style={{
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
				}}
			>
				<h1>Top 10 Trending Tags</h1>
				{topTags.map((tag) => (
					<div className="tag" key={tag.tid}>
						{tag.tag}
					</div>
				))}
				<style jsx="true">{`
					.trending-tags-container {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
					}
					.tag {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #fff;
						border-radius: 8px;
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
							0 1px 3px rgba(0, 0, 0, 0.08);
						color: #333;
						font-size: 16px;
						font-weight: bold;
						height: 40px;
						margin: 8px;
						padding: 0 16px;
						text-align: center;
						text-transform: uppercase;
						transform: translateY(-4px);
						max-width: 90%;
						word-wrap: break-word;
					}
				`}</style>
			</div>
		</>
	);
}

export default TrendingTags;
