const User = require('../models/User');

module.exports = {
    async fetchOne (req, res, next) {
        let { id } = req.params;
        try {
            let user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: `User with id ${id} does not exist.` });
            }
            res.user = user;
            next();
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}