import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'

// Initialize express
const app = express()

// connect to MongoDB
await connectDB();

// Middleware
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the server!')
})
app.post('/clerk', express.json(), clerkWebhooks)
app.use('api/educator',express.json(), educatorRouter)

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
