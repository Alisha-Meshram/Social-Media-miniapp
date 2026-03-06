import mongoose from "mongoose";
import { Post } from "../models/post.js";
import User from "../models/user.js";
import { Comment } from "../models/comment.js";



export const CreatePost = async (req, res) => {
  const { caption } = req.body;
  try {
    const image = `http://localhost:8000/uploads/${req.file.filename}`;

    await Post.create({ caption, image, author: req.user.id });

    res.status(201).json({ message: "Post create successfull" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username -_id")
      .populate("likes", "username -_id");

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ post: post._id })
          .populate("user", "username -_id");

        return {
          ...post.toObject(),
          comments
        };
      })
    );

    res.status(200).json(postsWithComments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOnePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('author','-_id username')
                                           .populate('likes','username -_id')


const comment=await Comment.find({post:id})
    res.status(200).json({post:post,comment:comment});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const UpdatePost =async (req,res)=>{
    const{caption}=req.body
    try {
      const UpPost=  await Post.findById(req.params.postId)

      if(!UpPost){
        return res.status(400).json({message:"Post not found"})
      }
      UpPost.caption=caption||UpPost.caption

      if(req.file){
         UpPost.image=`http://localhost:8000/uploads/${req.file.filename}`;
      }
      await UpPost.save()

        res.status(201).json({message:"update post successfully"})
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
export const DeletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    console.log("Deleting Post ID:", postId);

    // Check valid Mongo ID
    if (!postId) {
      return res.status(400).json({ message: "PostId missing" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Comment.deleteMany({ post: postId });

    await post.deleteOne();

    res.status(200).json({ message: "Delete post successfully" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const likes = async (req, res) => {
  try {
    const result = await Post.findById(req.params.postId);

    console.log(result);

    if (result.likes.includes(req.user.id)) {
      result.likes.pull(req.user.id);
    } else {
      result.likes.push(req.user.id);
    }

    await result.save();
       // ✅ POPULATE AGAIN
       const updatedPost = await Post.findById(req.params.postId)
       .populate("author", "username -_id")
       .populate("likes", "username -_id");

    res.status(200).json({ message: "liked", result:updatedPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createComments=async(req,res)=>{

try {
    const{text}=req.body
    const{postId}=req.params
    const userId=req.user.id
const post= await Post.findById(postId)

if(!post){
    return res.status(400).json({message:"Post not found"})
}


const comment=await Comment.create({text, post:postId,user:userId})



res.status(200).json({message:"comment create successfull",comment})
} catch (error) {
    res.status(500).json({ message: error });
}
}