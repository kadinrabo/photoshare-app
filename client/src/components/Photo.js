import React from "react";

function Photo({ photo }) {
	return (
		<div>
			PHOTO HERE
			<p>pid: {photo.pid}</p>
			<p>aid: {photo.aid}</p>
			<p>pdata: {photo.pdata}</p>
			<p>caption: {photo.caption ? photo.caption : "____"}</p>
		</div>
	);
}

export default Photo;
