const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();

/** /auth/register
 *  this api takes in { email, username, password } from req.body
 *  this adds a new user to -> test/users
 */
router.post('/register', async (req, res) => {
	try {
		const { email, username, password } = req.body;
		// hash the password and if email, username are valuid Hash the password and save the info
		if (!email || !username || !password) {
			return res.status(400).json({ error: 'all Fields are required.' });
		}
		const emailExist = await User.findOne({ email: email });
		if (emailExist) {
			return res.status(409).json({ error: 'Email already exists' });
		}
		const usernameExist = await User.findOne({ username: username });
		if (usernameExist) {
			return res.status(409).json({ error: 'Username already exists' });
		}
		const hash = await bcrypt.hash(password, 10);
		const user = new User({
			email: email,
			username: username,
			password: hash,
		});
		await user.save();
		return res.status(201).json({ message: 'Successfully registered' });
	} catch (err) {
		console.error('Registration error: ', err);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const {username, password} = req.body;
		if (!username || !password) {
			return res.status(400).json({error: 'username or password'});
		}
		const user = await User.findOne({username});
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({error: 'username or password'});
		}

		const token = jwt.sign(
			{ userId: user.uuid, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		);

		return res.json({
			success: true,
			token,
			user: {id: user.uuid, email: user.email, username: user.username},
		});
	} catch (err){
		console.error('Error while logining user', err);
		return res.status(500).json({error: 'Internal server error'});
	}
});

router.delete('/delete', async(req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ error: 'username and password are required' });
	}
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({error: 'user deoesnt exists'});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch){
			// Use 401 for "Unauthorized" or invalid credentials
			return res.status(401).json({error: 'Invalid credentials'});
		}
		await User.findByIdAndDelete({_id: user._id});
		return res.status(200).json({message: 'Successfully deleted'});
	} catch (error){
		console.error('Error while deleting user', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

// router.post('/update', async(req, res) => {
//
// });


module.exports = router;
