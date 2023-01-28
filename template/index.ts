import express, { Request, Response, NextFunction }  from 'express'
import settings from './lib/settings'
import styles from './lib/styles'
import renderer from './lib/renderer'

const { publicDir } = settings

;(async function () {

  const app = express()
  app.use('/styles.css', styles)
  app.use(express.static(publicDir))
  app.use('*', renderer)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(200).contentType('text/plain').end('Hello, World')
  })
  app.listen(5173)

})()
