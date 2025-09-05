const express = require('express');
const Recipie = require('../models/Recipe');
const router = express.Router();

router.post('/new', async (req, res) => {
	const reqestedData = req.body;

	if (
		!reqestedData.title ||
		!reqestedData.description ||
		!reqestedData.ingredients ||
		!reqestedData.instruction ||
		!reqestedData.author
	) {
		return res
			.status(400)
			.json({ error: 'all required felilds need to be filled' });
	}
	try {
		const recipie = new Recipie({
			author: reqestedData.author,
			title: reqestedData.title,
			description: reqestedData.description,
			ingredients: reqestedData.ingredients,
			instruction: reqestedData.instruction,
			image_reference: reqestedData.image_reference
				? reqestedData.image_reference
				: null,
			youtube_reference: reqestedData.youtube_reference
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

module.exports = router;
