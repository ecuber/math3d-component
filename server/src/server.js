import express from 'express'
import { wrapAsync } from './utils.js'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import { createContext } from 'vm'
import Math3D from 'math3d-component'

import * as config from '../server_config'

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
  // create graphs if necessary
  try {
    graphs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'))
  } catch(err) {
    fs.appendFileSync(JSON_PATH, '{}')
    graphs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'))
  }

  fs.writeFile(JSON_PATH, JSON.stringify({ ...graphs, [req.body.id]: req.body.dehydrated }), 'utf8', (err) => {
    if (err) {
      next(err)
    } else {
      console.log(`successfully wrote graph ${req.body.id} to file`)
      res.sendStatus(200)
    }
  })
})

app.get('/dev/get/:id', (req, res) => {
  const graphs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'))
  res.json(graphs[req.params.id])
})

app.get('/dev/edit', (req, res) => {
  const { dehydrated } = req.body
  res.send(ReactDOMServer.renderToString(<Math3D dehydrated={dehydrated} />))
})

app.use(function(error, req, res, next) {
  console.group()
  console.warn('Server Error!')
  console.warn(error)
  console.groupEnd()
  res.status(500).json( { error: error.message } )
} )

