const Like = require('../models/likeModel');
const Post = require('../models/postModel');

exports.makeLike = async (req, res) => {
    try {
        const { post, user } = req.body;

        const savedLike = await Like.create({ post, user });

        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true }).populate("likes").exec();

        res.json({
            success: true,
            data: updatedPost,
            message: 'Like created successfully'
        })
    } catch (error) {   
        console.log(error)
        return res.status(500).json({ 
            success: false,
            data: "Internal server error",
         }) 
    }
}

exports.unlike = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Two ways to delete a like
        // 1. Delete the like object and remove the like from the post likes array field
        const deletedLike = await Like.findByIdAndDelete({ _id: like });

        // 2. Remove like object from the like collection using like id and post id
        // const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true });

        
        // const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: like } }, { new: true }); // another way to remove like from the post likes array field

        res.json({
            success: true,
            data: updatedPost,
            message: 'Like deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        })
    }
}