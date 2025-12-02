import express from 'express'

import { signup, login, getUser, logoutUser, authGoogle, callback } from '../controller/auth.controller.js'

import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', protectRoute, getUser)
// post request to /api/auth/signup to register a new user
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', protectRoute, logoutUser)


router.get('/google', authGoogle)
router.get('/google/callback', callback)
 


export default router