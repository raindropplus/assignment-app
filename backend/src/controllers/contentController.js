const Content = require('../models/contentModel');
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        await Content.findByIdAndUpdate(req.content.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.getAllContents = base.getAll(Content);
exports.getContent = base.getOne(Content);

// Don't update password on this 
exports.updateContent = base.updateOne(Content);
exports.deleteContent = base.deleteOne(Content);