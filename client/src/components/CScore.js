import React, { useEffect, useState } from "react";
import { fetchTop5CScore } from "../api/users";

function CScore() {
	const [top5, setTop5] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetchTop5CScore();
			setTop5(fetchedData.users);
		}
		fetchData();
	}, []);

	return (
		<>
			<div
				className="top5-container"
				style={{
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
				}}
			>
				<h1 style={{ maxWidth: "90%" }}>Top 5 Users</h1>
				{top5.map((top) => (
					<div className="top" key={top.uid}>
						{top.fname} {top.lname}
					</div>
				))}
				<style jsx="true">{`
					.top5-container {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						flex-direction: row;
						height: auto;
						max-width: 100%;
					}
					.top {
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

export default CScore;
