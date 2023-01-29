import express from 'express'
import mime from './mime'
import icons from './icons'
import renderer from './renderer'
import styles from './styles'

const { Router } = express
const router = Router()

router.get('/icons/*.svg', icons)
router.get('/*.css', styles)
router.get(/.*\/([^\/\.]+)?\/?$/, renderer)
router.get(/.*\/[^\/]+\.\w+$/, mime)

export default router
