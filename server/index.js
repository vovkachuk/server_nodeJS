const app = require('./app');
const database = require('./database');
const config = require('./config');

database().then(info => {
  console.log(`Connected to ${info.host}:${info.post}/${info.name}`);
  app.listen(config.PORT, () => {
    console.log(`Example app listening at http://localhost:${config.PORT}`)
  })
}).catch(() => {
  console.error("[!]  ERROR");
  process.exit(1);
})
