const { url, token } = require('../hyper')
const fetch = require('node-fetch')

function list() {
  console.log(url('data'))
  return fetch(url('data') + '/_query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    body: JSON.stringify({
      selector: {
        account: 'twilson63',
        type: 'note'
      }
    })
  }).then(r => r.json()).then(r => r.matches)
}

module.exports = {
  list
}