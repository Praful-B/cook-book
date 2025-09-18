const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'your-secret-key'
		);
		req.user = decoded; // Just userId and email
		next();
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' });
	}
};
