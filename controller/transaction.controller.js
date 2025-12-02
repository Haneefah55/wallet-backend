
import Budget from "../model/budget.model.js"
import Transaction from "../model/transaction.model.js"



function getWeek(){


  const today = new Date() //2025-10-30T11:41:48.692Z
  const dayOfWeek = today.getDay()  //4

  const diffToSun = dayOfWeek === 0 ? 7 : dayOfWeek


  const startofWk = new Date(today)
  startofWk.setDate(today.getDate() - diffToSun)

  const endofWk = new Date(today)
  endofWk.setDate(startofWk.getDate() + 6)

 return { startofWk, endofWk }

}

function getDatesInRange (start, end) {


  const dates = []
  const days = []
  let currentDate = new Date(start)


  while(currentDate <= end) {
    dates.push(currentDate.toISOString().split("T")[0])
    days.push(currentDate.toDateString())
    currentDate.setDate(currentDate.getDate() + 1)
       
  }



  
  
  return { dates, days }
}

function getSixMonth(start) {
  const [startyear, startmonth] = start.split("-").map(Number)
  const months = []
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  for (let i = 0; i < 6; i++) {
    const index = (startmonth - 1 + i) % 12
    const year  = startyear + Math.floor((startmonth - 1 + i) / 12)
    months.push({
      label: `${monthNames[index]} ${year}`,
      year: year,
      month: index + 1
    })
  }

  return months
}


export const getTransactions = async(req, res) =>{

  try {
    const user = req.user

    const transactions = await Transaction.find({ user: user._id })

    if(!transactions){
      res.status(404).json({ success: false, message: "Transactions not found"})
    }

    const transaction = transactions.reverse()
    res.status(200).json(transaction)
  } catch (error) {
    console.error("Error in getTransactions contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }



  
}

export const addTransactions = async(req, res) =>{

  try {
    const { type, title, amount, category, date } = req.body   
    const user = req.user
    //console.log("date", date)
    const numAmount = Number(amount)
    const transaction = new Transaction({
      user: user._id,
      type,
      title,
      amount: numAmount,
      category,
      date,

    })

    await transaction.save()
    console.log("new transaction created")
   

    
    res.status(201).json(transaction)


  } catch (error) {
    console.error("Error in addTransactions contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}

export const editTransaction = async (req, res) => {
  
  try {
    const { id } = req.params
    const user = req.user
    const { type, title, amount, category, date } = req.body

    const transaction = await Transaction.findOne({ user: user._id, _id: id })

    if(!transaction){

      return res.status(404).json({ message: "Transaction not found" })
    }

    transaction.type = type
    transaction.title = title
    transaction.amount = amount
    transaction.category = category
    transaction.date = date

    await transaction.save()

    console.log("Transaction updated Successfully")

    res.status(200).json({ message: "Transaction updated Successfully" })


  } catch (error) {
    console.error("Error in edit Transactions contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}


export const getMonthlySummary = async(req, res) =>{
  try {
    const user = req.user

    const today = new Date()
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    

    const financialSummary = await Transaction.aggregate([
      
      {
        $match: {
          user: user._id,
          date: {
            $gte: monthStart,
            $lt: monthEnd,

          }
        }
      },

      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"]}, "$amount", 0]
            }
          },
          totalExpenses: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"]}, "$amount", 0]
            }
          },

          transactionCount: { $sum: 1 }
        }
      },

      {
        $project: {
          _id: 0,
          totalIncome: 1,
          totalExpenses: 1,
          balance: { $subtract: ["$totalIncome", "$totalExpenses"] },
          transactionCount: 1
        }
      }

      
    ])

    const { totalIncome, totalExpenses, balance, transactionCount } = financialSummary[0] || { totalIncome: 0, totalExpenses: 0, balance: 0, transactionCount: 0 }

    const summary = { totalIncome, totalExpenses, balance, transactionCount }

    


    //console.log("income", totalIncome)
    res.json({ summary })
  } catch (error) {
    console.error("Error in getMonthlySummary contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }


}



export const weeklyExpense = async(req, res) =>{


  try {
    const { startDate } = req.body
   

    const start = new Date(startDate)
    const user = req.user
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    /* console.log("start", start)
    console.log("end", end) */
    

    


    const expense = await Transaction.aggregate([
      {
        $match: {
          user: user._id,
          type: "expense",
          date: {
            $gte: start,
            $lt: end

          }
        }
      }, 

      {
        $group:{
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          expenses: { $sum: "$amount" },
        }
      },
      {
        $sort: { _id: 1 }
      },

    ])

    const { dates } = getDatesInRange(start, end)
      
    const data = dates.map(date =>{
      const foundData = expense.find(item => item._id === date)
      
      const day = new Date(date).toLocaleDateString('en-Us', { weekday: 'short' })
      return {
        date,
        day,
        expense: foundData?.expenses || 0,
        
      }
    })

    res.json(data)
  } catch (error) {
    console.error("Error in weeklyExpense contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
  


  //console.log(data)

  //const result = [...data, days]

  
 
}

export const getOverview = async(req, res) =>{


  try {
    const { startMonth } = req.body


    const user = req.user

    const start = new Date(startMonth + '-01')
    const end = new Date(start)
    end.setMonth(end.getMonth() + 5)
    end.setDate(new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate())


    const summary = await Transaction.aggregate([
      {
        $match: {
          user: user._id,
          date: {
            $gte: start,
            $lt: end

          }
        }
      }, 
      {
        $group: {
          _id: {
            year: { $year: "$date"},
            month: { $month: "$date"}
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"]}, "$amount", 0]
            }
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"]}, "$amount", 0]
            }
          },

        }
      },

      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          income: 1,
          expenses: 1,
          balance: { $subtract: ["$income", "$expenses"] }
        }
      },
      
    ])

    const months = getSixMonth(startMonth)

    //console.log(months)
      
    const data = months.map(period => {
      const foundData = summary.find(item => item.year === period.year && item.month === period.month)
       
      //const day = new Date(date).toLocaleDateString('en-Us', { weekday: 'short' })
      return {
        period: period.label,
        year: period.year,
        //day,
        expense: foundData?.expenses || 0,
        income: foundData?.income || 0,
        
        
        
      }
    })

    res.json(data)
  } catch (error) {
    console.error("Error in weeklySummary contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}

export const MonthlyCategoryOverview = async(req, res) =>{
  try {

    const { startMonth } = req.body
   
    const user = req.user
    const start = new Date(startMonth)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)

    

    const result = await Transaction.aggregate([
      // Optional: Filter documents for a specific month or user
      {
        $match: {
          user: user._id,
        
          date: {
            $gte: start,
            $lt: end

          }
        }
      },

      // Split the pipeline into two branches to get total income and expenses by category
      {
        $facet: {
          totalIncome: [
            { $match: { type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          totalExpenses: [
            { $match: { type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          expensesByCategory: [
            { $match: { type: "expense" } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
          ],
          incomeByCategory: [
            { $match: { type: "income" } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
          ]
        }
      },

      // Restructure the data to make it easier to work with
      {
        $project: {
          totalIncome: { $arrayElemAt: ["$totalIncome.total", 0] },
          totalExpenses: { $arrayElemAt: ["$totalExpenses.total", 0] },
          expensesByCategory: "$expensesByCategory",
          incomeByCategory: "$incomeByCategory",
        }
      },

      // Create a separate document for each expense category
      {
        $unwind: "$expensesByCategory"
      },
      {
        $unwind: "$incomeByCategory"
      },

      // Calculate the percentage of total income for each category
      {
        $project: {
          _id: 0,
          expensesCategory: "$expensesByCategory._id",
          expenses: "$expensesByCategory.total",
          income: "$incomeByCategory.total",
          percentageOfIncome: {
            $cond: {
              if: { $eq: ["$totalIncome", 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: ["$expensesByCategory.total", "$totalIncome"] },
                  100
                ]
              }
            }
          }
        }
      }
    ])

    const incomeResult = await Transaction.aggregate([
      // Optional: Filter documents for a specific month or user
      {
        $match: {
          user: user._id,
        
          date: {
            $gte: start,
            $lt: end

          }
        }
      },

      // Split the pipeline into two branches to get total income and expenses by category
      {
        $facet: {
          totalIncome: [
            { $match: { type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          incomeByCategory: [
            { $match: { type: "income" } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
          ]
        }
      },

      // Restructure the data to make it easier to work with
      {
        $project: {
          totalIncome: { $arrayElemAt: ["$totalIncome.total", 0] },
          incomeByCategory: "$incomeByCategory",
        }
      },

      // Create a separate document for each expense category
      {
        $unwind: "$incomeByCategory"
      },

      // Calculate the percentage of total income for each category
      {
        $project: {
          _id: 0,
          totalIncome: "$totalIncome",
          incomeCategory: "$incomeByCategory._id",
          amountSpent: "$incomeByCategory.total",
          percentageOfIncome: {
            $cond: {
              if: { $eq: ["$totalIncome", 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: ["$incomeByCategory.total", "$totalIncome"] },
                  100
                ]
              }
            }
          }
        }
      }
    ])


    const expensesResult = await Transaction.aggregate([
      // Optional: Filter documents for a specific month or user
      {
        $match: {
          user: user._id,
        
          date: {
            $gte: start,
            $lt: end

          }
        }
      },

      // Split the pipeline into two branches to get total income and expenses by category
      {
        $facet: {
          
          totalExpenses: [
            { $match: { type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          totalIncome: [
            { $match: { type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          expensesByCategory: [
            { $match: { type: "expense" } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
          ],
          
        }
      },

      // Restructure the data to make it easier to work with
      {
        $project: {
        
          totalExpenses: { $arrayElemAt: ["$totalExpenses.total", 0] },
          totalIncome: { $arrayElemAt: ["$totalIncome.total", 0] },
          expensesByCategory: "$expensesByCategory",
  
        }
      },

      // Create a separate document for each expense category
      {
        $unwind: "$expensesByCategory"
      },

      // Calculate the percentage of total income for each category
      {
        $project: {
          _id: 0,
          totalExpense: "$totalExpenses",
          totalIncome: "$totalIncome",
          expensesCategory: "$expensesByCategory._id",
          amountSpent: "$expensesByCategory.total",
          percentageOfExpenses: {
            $cond: {
              if: { $eq: ["$totalExpenses", 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: ["$expensesByCategory.total", "$totalExpenses"] },
                  100
                ]
              }
            }
          },
          percentageOfIncome: {
            $cond: {
              if: { $eq: ["$totalIncome", 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: ["$expensesByCategory.total", "$totalIncome"] },
                  100
                ]
              }
            }
          }
        }
      }
    ])

    const incomeSummary = [ ...incomeResult ] 
    const expensesSummary = [ ...expensesResult ] 

    res.json({ incomeSummary, expensesSummary })
  } catch (error) {
     console.error("Error in MonthlyCategoryOverview contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}

export const getCategory = async(req, res) =>{

  try {
    const { category } = req.body

    const user = req.user

    const transactions = await Transaction.find({ user: user._id, category: category})

    if(!transactions){
      res.status(404).json({ success: false, message: "Transactions not found"})
    }

    const transaction = transactions.reverse()

    console.log("category fecthed")
    res.status(200).json(transaction)


  } catch (error) {
    console.error("Error in getCategory contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}


export const deleteTransaction = async (req, res) =>{


  try {
    const { id } = req.params

    const user = req.user

    const deleted = await Transaction.findOneAndDelete({ user: user._id, _id: id })

    if(!deleted){
      res.status(500).json({ success: false, message: "Transactions not deleted" })
    }

  

    console.log("category deleted")
    res.status(200).json({ success: true, message: "Transactions deleted" })

    
  } catch (error) {
    console.error("Error in delete transaction contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}

