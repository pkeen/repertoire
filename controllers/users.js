const User = require('../models/user');

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('preferences');
        console.log(user.preferences);
        res.render('users/show', {
            user,
            title: user.name
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    show
}