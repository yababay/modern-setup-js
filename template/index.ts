import express from 'express'
import livereload from 'livereload'
import connectLiveReload from 'connect-livereload'

import settings from './lib/settings'
import errors   from './lib/errors'
import router   from './lib/router'

const { publicDir } = settings

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

;(async function () {

  const app = express()
  app.use(connectLiveReload())
  app.use(express.static(publicDir))
  app.use('/', router)
  app.use(errors)
  app.listen(5173)

})()
