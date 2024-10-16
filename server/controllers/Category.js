const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try{
        const {name, description} = req.body;
        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All Feilds are required'
            })
        }

        const categoryDetails = await Category.create({
            name,
            description
        });

        return res.status(200).json({
            success: true,
            message: "Category created Successfully!"
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to create Category'
        })
    }
}


exports.showAllCategory = async (req, res) => {
    try{
        const allCategory = await Category.find({}, {name: true, description: true});
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

