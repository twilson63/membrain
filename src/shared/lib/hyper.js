const jwt = require('jsonwebtoken')

let connectionString = process.env.HYPER
let u = new URL(connectionString)

module.exports = {
  url: (svc = 'data') => `https://${u.host}/${svc}${u.pathname}`,
  token: () => jwt.sign({ sub: u.username }, u.password)
}