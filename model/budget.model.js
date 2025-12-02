

import mongoose from 'mongoose'


const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  period: String,
  start: Date,
  end: Date,
  limit_amount: Number,
  category: String,
  

}, { timestamps: true })

const Budget = mongoose.model("Budget", budgetSchema)

export default Budget