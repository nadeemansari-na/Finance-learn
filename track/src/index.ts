import { Hono } from 'hono'
import { createPrisma } from './pr'
import { userrouter } from './routes/userrouter'
import {transaction} from './routes/transaction'
import { balance } from './routes/balance'
import { category } from './routes/category'
import { cors } from 'hono/cors'

interface Env {
  DATABASE_URL: string
  JWT_SECRET:string
}
const app = new Hono<{   Bindings: {
  DATABASE_URL: string
  JWT_SECRET: string
  } }>()

  app.use(cors())
app.route('/api/v1/userrouter',userrouter)
app.route('/api/v1/transaction',transaction)
app.route('/api/v1/balance',balance)
app.route('api/v1/category',category)
export default app
