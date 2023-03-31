import Photo from "./Photo";

class Photos {
	constructor(photosData) {
		this.photos = photosData.map((photoData) => new Photo(photoData));
	}
}

export default Photos;
