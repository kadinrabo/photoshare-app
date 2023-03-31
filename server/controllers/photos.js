const client = require("../util/database");

// Handler for http://localhost:8080/photos
exports.getAllPhotos = (req, res, next) => {
	client.query("SELECT * FROM phototable", (err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows);
	});
};

// Handler for http://localhost:8080/photos/tag
exports.getPhotosByTag = (req, res, next) => {
	const tag = req.params.tag;

	// Check if tag is in the form 'tag'
	if (tag.split(",").length === 1) {
		const search = "%" + "#" + req.params.tag + "%";
		const query = `
	SELECT * FROM phototable WHERE pid IN (
	    SELECT pid FROM hastag WHERE tid IN (
	        SELECT tid FROM tagtable
	        WHERE tag ILIKE $1)
	);`;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
	// Check if tag is in the form 'tag1,tag2,tag3'
	else if (tag.split(",").length > 1) {
		const tags = tag.split(","); // Split the tag variable into an array of tags
		const placeholders = tags.map((t, i) => `$${i + 1}`).join(","); // Create an array of placeholders for the query
		const search = tags.map((t) => "%" + "#" + t.trim() + "%"); // Create an array of search strings
		const query = `
    SELECT * FROM phototable WHERE pid IN (
      SELECT pid FROM hastag WHERE tid IN (
        SELECT tid FROM tagtable
        WHERE tag ILIKE ANY ($1)
      )
    );`;
		client.query(query, [search], (err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result.rows);
		});
	}
};
