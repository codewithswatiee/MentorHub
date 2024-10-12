const Tag = require('../models/Tags');

exports.createTag = async (req, res) => {
    try{
        const {name, description} = req.body;
        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All Feilds are required'
            })
        }

        const tagDetails = await Tag.create({
            name,
            description
        });

        return res.status(200).json({
            success: true,
            message: "Tag created Successfully!"
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to create Tag'
        })
    }
}


exports.showAllTags = async (req, res) => {
    try{
        const allTags = await Tag.find({}, {name: true, description: true});
        return res.status(200).json({
            success: true,
            message: "All Tags returned Successfully!"
        })
    }   catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to get Tags'
        })
    }
}

