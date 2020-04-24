if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

module.exports = {
  dbUrl,
  port
}