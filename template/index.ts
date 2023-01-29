import express, { Request, Response, NextFunction }  from 'express'
import settings from './lib/settings'
import styles from './lib/styles'
import errors from './lib/errors'
import router from './lib/router'

const { publicDir } = settings

;(async function () {

  const app = express()
  app.use('/styles.css', styles)
  app.use(express.static(publicDir))
  app.use('/', router)
  app.use(errors)
  app.listen(5173)

})()
