const Post = require('./../Models/postModel');
const User = require('./../Models/userModel');
const mongoose = require('mongoose');

const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.createPost = catchAsync(async (req, res, next) => {
    const { desc, image } = req.body;
    const userId = req.user.id;

    const newPost = await Post.create({
        userId,
        desc,
        image
    });

    res.status(200).json({
        status: 'success',
        message: 'Post Crated Successfully',
        data: {
            newPost
        }
    });
})

exports.updatePost = catchAsync(async (req, res, next) => {
    const { desc, image } = req.body;
    const postId = req.params.id
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
        return next(
          new AppError(
            'The user Post does not exist',
            404
          )
        );
      }
    if (post.userId === userId) {
        const newPost = await Post.updateOne({
            desc,
            image
        });
        res.status(200).json({
            status: 'success',
            message: 'Post updated Successfully!',
        });
    }
    else {
        res.status(403).json({
            status: 'fail',
            message: 'Authentication failed!',
        });
    }

})


exports.likePost = catchAsync(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return next(
              new AppError(
                'The user Id does not exist',
                404
              )
            );
          }
        if (post.likes.includes(userId)) {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({
                status: 'success',
                message: "Post disliked",

            });
        } else {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json(
                {
                    status: "success",
                    message: "Post liked"

                });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


  exports.getMyTimelinePosts = catchAsync(async (req, res) => {
    const userId = req.user.id
    
      const currentUserPosts = await Post.find({ userId: userId }).populate({
    path: 'userId',
    model: 'User',
    select: 'username firstname lastname profilePicture'
});
      if (!currentUserPosts) {
        return next(
          new AppError(
            'The user Id does not exist',
            404
          )
        );
      }
      const followingPosts = await User.aggregate([
        { 
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);

      // Extract the post IDs from the followingPosts
const postIds = followingPosts[0].followingPosts.map(post => post._id);

// Use the populate function to get the full post data
const populatedPosts = await Post.find({ _id: { $in: postIds } }).populate({
  path: 'userId',
  model: 'User',
  select: 'username firstname lastname profilePicture'
});

  
res.status(200).json(
  currentUserPosts
    .concat(...populatedPosts)
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
);
    
  });


  
exports.getTimelinePosts = catchAsync(async (req, res) => {
  const userId = req.params.id
    const currentUserPosts = await Post.find({ userId: userId });
    if (!currentUserPosts) {
      return next(
        new AppError(
          'The user Id does not exist',
          404
        )
      );
    }
    const followingPosts = await User.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const myPosts = await Post.find({ userId: userId })

  if (!myPosts) {
      return next(
          new AppError(
              'No posts found for this user',
              404
          )
      );
  }

  res.status(200).json({
      status: 'success',
      data: myPosts
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const Posts = await Post.find({ userId: userId })


  if (!Posts) {
      return next(
          new AppError(
              'No posts found for this user',
              404
          )
      );
  }

  res.status(200).json({
      status: 'success',
      data: Posts
  
  });
});


exports.getPost = factory.getOne(Post);
exports.deletePost = factory.deleteOne(Post);