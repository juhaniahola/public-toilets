if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const dbUrl = process.env.DB_URL || '';
const port = process.env.PORT || 3001;

module.exports = {
  dbUrl,
  port,
};
