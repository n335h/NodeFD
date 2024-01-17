const logoutUser = (req, res) => {
	req.logout();
	res.redirect('/');
};

module.exports = { logoutUser };
