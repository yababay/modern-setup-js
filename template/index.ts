import express, { Request, Response, NextFunction }  from 'express'

;(async function () {

  const app = express()
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(200).contentType('text/plain').end('Hello, World')
  })
  app.listen(5173)

})()
