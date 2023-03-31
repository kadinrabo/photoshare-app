class Photo {
	constructor(data) {
		this.pid = data.pid;
		this.aid = data.aid;
		this.pdata = data.pdata;
		this.caption = data.caption || null;
	}
}

export default Photo;
