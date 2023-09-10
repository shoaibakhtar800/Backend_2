const postModel = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        const response = await postModel.create({ title, body });

        res.json({
            success: true,
            data: response,
            message: 'Post created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await postModel.findById({ _id: id }).populate("comments").populate("likes").exec();
        // const posts = await postModel.find({}).populate("comments").populate("likes").exec(); // fetch all posts

        res.json({
            success: true,
            data: posts,
            message: 'Posts fetched successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}
