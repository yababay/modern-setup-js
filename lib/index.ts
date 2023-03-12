import express, { Request, Response, NextFunction } from 'express'
import { proxyPort } from './settings'

const app = express()

app.use(express.static('public'))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err)
	res.status(500).end(err.message)
})

app.get('/favicon.ico', (req, res) => res.sendFile(`${process.cwd()}/lib/assets/favicon.ico`))

app.listen(proxyPort, () => console.log(`Listening on ${proxyPort}`))

