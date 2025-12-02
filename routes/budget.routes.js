import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'
import { createBudget, getMonthlyOverall, getAllBudget } from '../controller/budget.controller.js'


const router = express.Router()

router.post('/', protectRoute, createBudget)
router.post('/overall', protectRoute, getMonthlyOverall)


router.get('/', protectRoute, getAllBudget)



export default router