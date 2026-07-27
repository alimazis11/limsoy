import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { Sequelize, DataTypes } from 'sequelize'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize(
  process.env.DB_NAME || 'wedding',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
)

const Wish = sequelize.define('Wish', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wish: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('hadir', 'tidakHadir', 'ragu'),
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'wishes',
  timestamps: true
})

sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected')
    sequelize.sync({ alter: true })
      .then(() => console.log('Database synced'))
      .catch(err => console.error('Sync error:', err))
  })
  .catch(err => {
    console.error('MySQL connection error:', err)
  })

app.get('/api/wishes', async (req, res) => {
  try {
    const wishes = await Wish.findAll({
      order: [['createdAt', 'DESC']]
    })
    res.json(wishes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/wishes', async (req, res) => {
  try {
    const { name, wish, status, date } = req.body
    
    if (!name || !status) {
      return res.status(400).json({ error: 'Nama dan status harus diisi' })
    }
    
    const newWish = await Wish.create({
      name,
      wish: wish || '',
      status,
      date
    })
    
    res.status(201).json(newWish)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/wishes/stats', async (req, res) => {
  try {
    const total = await Wish.count()
    const hadir = await Wish.count({ where: { status: 'hadir' } })
    const tidakHadir = await Wish.count({ where: { status: 'tidakHadir' } })
    const ragu = await Wish.count({ where: { status: 'ragu' } })
    
    res.json({
      total,
      hadir: hadir + 5,
      tidakHadir: tidakHadir + 3,
      ragu
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
