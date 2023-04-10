import React, { useState, useEffect } from "react";
import { fetchCommentsByPid, fetchAddComment } from "../api/comments";
import { fetchUsersBySearch } from "../api/users";

function Comments({ photo }) {
	const [comments, setComments] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [addComment, setAddComment] = useState("");
	const [users, setUsers] = useState([]);
	const [addCommentReady, setAddCommentReady] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");

	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			if (user) {
				setLoggedInUser(user);
			}
		}
		fetchUser();
	}, [uid]);

	useEffect(() => {
		async function fetchComments() {
			const fetchedComments = await fetchCommentsByPid(photo.pid);
			setComments(fetchedComments.comments);
		}
		fetchComments();
	}, [photo.pid]);

	const handleAddCommentChange = (event) => {
		setAddComment(event.target.value);
	};

	useEffect(() => {
		async function createNewComment() {
			await fetchAddComment(localStorage.getItem("uid"), addComment, photo.pid);
			const fetchedComments = await fetchCommentsByPid(photo.pid);
			setComments(fetchedComments.comments);
		}
		if (addCommentReady && addComment) {
			createNewComment();
		}
	}, [addCommentReady]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (addComment !== "") {
			setAddCommentReady(true);
		}
	};

	useEffect(() => {
		async function fetchUsers() {
			const fetchedUsers = [];
			const filteredComments = comments.filter((comment) =>
				comment.ctext.toLowerCase().includes(searchTerm.toLowerCase())
			);
			for (const comment of filteredComments) {
				const fetchedUser = await fetchUsersBySearch(comment.uid);
				fetchedUsers.push(fetchedUser);
			}
			setUsers(fetchedUsers);
		}
		fetchUsers();
	}, [comments, searchTerm]);

	const filteredComments = comments.filter((comment) =>
		comment.ctext.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div style={{ display: "inline-block" }}>
			<div
				style={{
					width: "160px",
					height: "250px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
					overflowY: "auto",
				}}
			>
				<h3 style={{ textAlign: "left" }}>
					{comments.length} {comments.length < 2 ? "Comment" : "Comments"}
				</h3>
				<div style={{ marginBottom: "10px" }}>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{
							padding: "5px",
							border: "1px solid #ddd",
							borderRadius: "5px",
							marginBottom: "10px",
							maxWidth: "90%",
						}}
						placeholder="Search comments..."
					/>
				</div>
				<ul style={{ listStyle: "none", padding: 0 }}>
					{filteredComments.map((comment, index) => (
						<li key={comment.cid}>
							{users[index] && (
								<>
									<p
										style={{
											display: "inline-block",
											fontSize: "14px",
											color: "#999",
										}}
									>
										{users[index].fname} {users[index].lname}:{" "}
									</p>
								</>
							)}{" "}
							{comment.ctext}
						</li>
					))}
				</ul>
				{localStorage.getItem("uid") && loggedInUser && (
					<div style={{ marginBottom: "10px" }}>
						<input
							type="text"
							value={addComment}
							onChange={handleAddCommentChange}
							style={{
								padding: "5px",
								border: "1px solid #ddd",
								borderRadius: "5px",
								marginBottom: "10px",
								maxWidth: "90%",
							}}
							placeholder="Add comment..."
						/>
						<button onClick={handleSubmit}>Post</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Comments;
