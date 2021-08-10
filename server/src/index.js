import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'

import * as config from '../server_config.js'

const JSON_PATH = '../app/src/myGraphs.json'
const PORT = process.env.PORT || 5000

const app = express()

// get json from request bodies
app.use(bodyParser.json())


app.listen(PORT, () => {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`)
} )

app.post('/dev/save', (req, res) => {
  let graphs
  // create graphs file if necessary
  try {
    graphs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'))
  } catch(err) {
    fs.appendFileSync(JSON_PATH, '{}')
    graphs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'))
  }

  const { dehydrated } = req.body
  const { id } = dehydrated.metadata

  console.log('dehydrated', dehydrated)
  console.log('id', id)

  fs.writeFile(JSON_PATH, JSON.stringify({ ...graphs, [id]: dehydrated }), 'utf8', (err) => {
    if (err) {
      next(err)
    } else {
      console.log(`successfully wrote graph ${id} to file`)
      res.sendStatus(200)
    }
  })
})

app.use(function(error, req, res, next) {
  console.group()
  console.warn('Server Error!')
  console.warn(error)
  console.groupEnd()
  res.status(500).json( { error: error.message } )
} )

