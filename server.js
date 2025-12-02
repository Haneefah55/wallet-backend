import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDb } from './db/connectDb.js'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'
import budgetRoutes from './routes/budget.routes.js'


dotenv.config()

const app = express()

const port = process.env.PORT || 5000


app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))
app.use(cors())


app.use("/api/auth", authRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/budget", budgetRoutes)

app.get('/', (req, res) =>{
  res.send("backend working")
})








app.listen(port, '0.0.0.0', () =>{
  connectDb()
  console.log(`server running on port ${port}`)
})
