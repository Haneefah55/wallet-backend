

import mongoose from 'mongoose'


const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: String,
  title: String,
  amount: Number,
  category: String,
  date: Date,
  

}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction