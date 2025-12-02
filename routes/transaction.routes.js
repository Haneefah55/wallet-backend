import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'
import { getTransactions, addTransactions, getMonthlySummary, weeklyExpense, getOverview, MonthlyCategoryOverview, getCategory, deleteTransaction, editTransaction } from '../controller/transaction.controller.js'

const router = express.Router()



router.get('/', protectRoute, getTransactions)
router.get('/summary', protectRoute, getMonthlySummary)



router.post('/week-expense', protectRoute, weeklyExpense)
router.post('/analytics', protectRoute, getOverview)
router.post('/analytics/category', protectRoute, MonthlyCategoryOverview)
router.post('/category', protectRoute, getCategory)

router.post('/', protectRoute, addTransactions)


router.patch('/', protectRoute, editTransaction)


router.delete('/:id', protectRoute, deleteTransaction)






export default router