import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Custom middleware
const log = (req, res, next) => {
  console.log('logging')
  next()
}

app.use(log)
// Needed to add router
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('hello world12')
})

router.get('/route', (req, res) => {
  res.send('am in router')
})

app.get('/data', (req, res) => {
  console.log('am in')
  res.send({ message: 'hello world' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Server running on 3000')
  })
}
