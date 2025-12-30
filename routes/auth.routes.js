import express from 'express'

import { signup, login, getUser, logoutUser, authGoogle, callback, verifyToken, changeEmail, verifyNewEmail, deleteAccount, changeName, changePassword } from '../controller/auth.controller.js'

import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', protectRoute, getUser)
// post request to /api/auth/signup to register a new user
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', protectRoute, logoutUser)
router.post('/verify-token', verifyToken)
router.post('/change-email', protectRoute, changeEmail)
router.post('/change-name', protectRoute, changeName)
router.post('/change-password', protectRoute, changePassword)
router.post('/verify-new-email', protectRoute, verifyNewEmail)


router.get('/google', authGoogle)
router.get('/google/callback', callback)

router.delete('/', protectRoute, deleteAccount)
 


export default router