class MayLikePhoto {
	constructor(data) {
		this.pid = data.pid;
		this.aid = data.aid;
		this.pdata = data.pdata;
		this.caption = data.caption || null;
		this.common_count = data.common_count;
	}
}

export default MayLikePhoto;
