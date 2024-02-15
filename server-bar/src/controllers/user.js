// user.js
const newUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'New User',
        body
    });
};

const loginUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'Login User',
        body
    });
};

module.exports = { newUser, loginUser };
