const express = require('express');
const Recipie = require('../models/Recipe');
const router = express.Router()
const auth = require('../middleware/auth');

/***
 * api  endpoint to add a recipie to the recipie db
 */
router.post('/new', auth, async (req, res) => {
	const requestedData = req.body;

	if (
		!requestedData.title ||
		!requestedData.description ||
		!requestedData.ingredients ||
		!requestedData.instruction ||
		!requestedData.author
	) {
		return res
			.status(400)
			.json({ error: 'all required fields need to be filled' });
	}
	try {
		const recipie = new Recipie({
			author: requestedData.author,
			title: requestedData.title,
			description: requestedData.description,
			ingredients: requestedData.ingredients,
			instruction: requestedData.instruction,
			image_reference: requestedData.image_reference
				? requestedData.image_reference
				: null,
			youtube_reference: requestedData.youtube_reference
				? requestAnimationFrame.youtube_reference
				: null,
		});
		await recipie.save();
		return res
			.status(201)
			.json({ message: 'new recipie added successfully' });
	} catch (err) {
		console.error('error: while trying to add recipie', err);
		return res.status(500).json({ err: `Internal server error: ${err}` });
	}
});

router.post('/edit', auth, async (req, res) => {
});

router.post('/delete', auth, async (req, res) => {
	try {
		const postUuid = req.body.uuid;

		if (!postUuid) {
			return res.status(401).json({ error: 'required details missing' });
		}
		const deletedRecipie = await Recipie.findOneAndDelete({uuid : postUuid});
		res.status(200).json(deletedRecipie);
	} catch (err) {
		console.error('error: while deleting a recipie', err);
	}
});


module.exports = router;
