import express from 'express'
import { Login, Profile, Register } from '../controller/user.js'
import auth from '../middlewere/auth.js'

const router=express.Router()

router.post('/register',Register)

router.post('/login',Login)
router.get('/profile',auth,Profile)


export default router