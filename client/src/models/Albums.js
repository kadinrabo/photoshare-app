import Album from "./Album";

class Albums {
	constructor(albumsData) {
		this.albums = albumsData.map((albumData) => new Album(albumData));
	}
}

export default Albums;
