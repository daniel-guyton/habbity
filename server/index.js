const server = require('./server')

const PORT = process.env.PORT || 5432

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})
