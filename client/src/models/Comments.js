import Comment from "./Comment";

class Comments {
	constructor(commentsData) {
		this.comments = commentsData.map((commentData) => new Comment(commentData));
	}
}

export default Comments;
