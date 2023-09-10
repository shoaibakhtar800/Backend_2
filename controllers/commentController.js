const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
    try {
        // fetch post from req.body
        const { post, user, body } = req.body;

        // two ways to insert data to db
        // 1. create a comment object and save it to db
        // create a comment object
        const comment = new Comment({
            post, user, body
        })

        // save the comment to db
        const savedComment = await comment.save();


        // 2. using the Comment.create() method
        // const savedComment = await Comment.create({ post, user, body });

        // push the comment to the post comments array field and save the post to db 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true } ).populate("comments").exec(); // populate the comments field

        // send response
        res.json({
            success: true,
            data: updatedPost,
            message: 'Comment created successfully'
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