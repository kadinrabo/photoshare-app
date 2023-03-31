import Tag from "./Tag";

class Tags {
	constructor(tagsData) {
		this.tags = tagsData.map((tagData) => new Tag(tagData));
	}
}

export default Tags;
