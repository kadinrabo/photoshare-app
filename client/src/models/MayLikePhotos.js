import MayLikePhoto from "./MayLikePhoto";

class MayLikePhotos {
	constructor(photosData) {
		this.photos = photosData.map((photoData) => new MayLikePhoto(photoData));
	}
}

export default MayLikePhotos;
