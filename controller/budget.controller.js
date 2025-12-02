import Budget from "../model/budget.model.js"
import Transaction from "../model/transaction.model.js"



export const createBudget = async(req, res) =>{

  try {

    const { title, period, limit_amount, startDate, category } = req.body
    const user = req.user

    let start = ""
    let end = ""
    

    if(period){

      //console.log("period", period)

      if(period === "weekly"){
        start = new Date(startDate)
      
        end = new Date(start)
        end.setDate(start.getDate() + 6)

        /* console.log("start", start)
        console.log("end", end) */
      } else if(period === "monthly"){

        start = new Date(startDate)
        end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
       /*  console.log("start", start)
        console.log("end", end) */
      }
      
    
    }

    /* const totalSpent = await Transaction.aggregate([
      {
        $match: {
          user: user._id,
          type: "expense",
          category: category,
          date: {
            $gte: start,
            $lt: end,

          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum : "$amount" }
        }
      } 
    ])

    const amountSpent = totalSpent[0].total || 0

    console.log("amountSpent", amountSpent) */

    const budget = new Budget({
      user: user._id,
      limit_amount,
      period,
      start,
      end,
      title,
      category,
    })

    await budget.save()



    console.log("new budget created")


    
    res.status(201).json(budget)


  } catch (error) {
    console.error("Error in createBudget contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}

export const getMonthlyOverall = async (req, res) => {
  

  try {
    const user = req.user
    const { startDate } = req.body
    

    const start = new Date(startDate)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
    console.log("start", start)
    console.log("end", end)



    const budget = await Budget.aggregate([
      {
        $match: {
          user: user._id,

          start: {
            $gte: new Date(start.getFullYear(), start.getMonth(), 1),
            $lte: end
          }
          
          
        }
      },

      {
        $group: {
          _id: null,
          totalBudget: { $sum: "$limit_amount" },

        }
      },

      {
        $project: {
          _id: 0,
          totalBudget: 1,
        }
      }
    ])

    const spendings = await Transaction.aggregate([
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
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },

        }
      },
      {
        $project: {
          _id: 0,
          totalSpent: 1,
        }
      }
    ])


    const budgetCategory = await Budget.aggregate([
      {
        $match: {
          user: user._id,

          start: {
            $gte: new Date(start.getFullYear(), start.getMonth(), 1),
            $lte: end
          }
          
          
        }
      },

      {
        $group: {
          _id: "$category",
          totalBudget: { $sum: "$limit_amount" },

        }
      },

      {
        $project: {
          _id: 1,
          totalBudget: 1,
        }
      }
    ])

    const spendingsCategory = await Transaction.aggregate([
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
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" },

        }
      },
      {
        $project: {
          _id: 1,
          totalSpent: 1,
        }
      }
    ])


    const totalBudget = budget.length > 0 ? budget[0].totalBudget : 0
    const totalSpent = spendings.length > 0 ? spendings[0].totalSpent : 0
    

    const totalRemaining = totalBudget - totalSpent
    const percentSpent = 100 * (totalSpent / totalBudget)

    const categoryResult = budgetCategory.map((cat) =>{

      const spendings = spendingsCategory.find((item) => item._id === cat._id) 


      return{

        totalSpent: spendings.totalSpent,
        category: spendings._id,
        totalBudget: cat.totalBudget,
        remaining: cat.totalBudget - spendings.totalSpent,
        percent: 100 * (spendings.totalSpent / cat.totalBudget)

      }
    

    })

    //console.log("budget", budget)
    res.json({ totalBudget, totalSpent, totalRemaining, percentSpent, categoryResult })


  } catch (error) {
    console.error("Error in getMonthlyOverall contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}


export const getAllBudget = async (req, res) => {
  const user = req.user
  try {
    const budgets = await Budget.find({ user: user._id })

    if(!budgets){
      res.status(404).json({ success: false, message: "Budgets not found"})
    }

    const budget = budgets.reverse()
    res.status(200).json(budget)
  } catch (error) {
    console.error("Error in getAllBudget contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

