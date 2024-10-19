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

exports.categoryPageDetails = async (req, res) => {
    try{
        // category id
        // get all the courses corresponding to the categroy
        // validation
        // get courses for diff categories
        // get top selling courses
        // return res
        const categoryId = req.body;
        const selectedCategory =  await Category.findById(categoryId).
        populate("courses").exec();

        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Courses not found"
            })
        }

        const differentCategories = await Category.findById({_id: {$ne: categoryId}}).populate("courses").exec();

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory: selectedCategory,
                differentCategories: differentCategories
            },
        })
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Failed to get Category Page Details'
        })
    }
}

