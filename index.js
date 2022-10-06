const express = require("express")
const cors = require("cors")
const lowDb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const bodyParser = require("body-parser")
const { nanoid } = require("nanoid")
const db = lowDb(new FileSync('db.json'))
const host = '0.0.0.0'
const PORT = process.env.PORT  || 4000
db.defaults({ notes: [] }).write()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Server is running")
})

app.get('/notes', (req, res) => {
  const data = db.get("notes").value()
  return res.json(data)
})

app.post('/notes/new', (req, res) => {
  const note = req.body
  db.get("notes").push({
    ...note, id: nanoid()
  }).write()
  res.json({ success: true })
})

app.listen(PORT,host, () => {
  console.log(`Backend is running on http://localhost:${PORT}`)
})