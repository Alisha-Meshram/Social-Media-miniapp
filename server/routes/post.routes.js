import express from 'express'
import auth from '../middlewere/auth.js'
import { createComments, CreatePost, deleteComment, DeletePost, getAllPosts,getOnePost, likes, UpdatePost } from '../controller/post.js'
import Upload from '../middlewere/multer.js'


const router=express.Router()

router.post('/:postId/like',auth,likes)


router.post('/comment/:id',()=>{})

router.post('/:postId/comment',auth,createComments)
router.delete('/deleteComment/:commentId',auth,deleteComment)
router.post('/create-post',auth,Upload.single('photo'),CreatePost)
router.get('/posts',auth,getAllPosts)
router.get('/posts/:id',auth,getOnePost)
router.put('/:postId/update-post',auth,Upload.single('photo'),UpdatePost)
router.delete('/:postId/delete-post',auth,DeletePost)


export default router