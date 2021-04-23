const { url, token } = require('../hyper')
const fetch = require('node-fetch')

function list(account) {
  return fetch(url('data') + '/_query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    body: JSON.stringify({
      selector: {
        account,
        type: 'note'
      }
    })
  }).then(r => r.json())
    .then(r => (console.log(r), r))
    .then(r => r.docs)
}

function create(account, note) {
  // TODO: validate note
  return fetch(url('data'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    body: JSON.stringify({
      type: 'note',
      account,
      ...note
    })
  }).then(r => r.json())
}

function get(account, id) {
  return fetch(url('data') + '/' + id, {
    headers: { Authorization: `Bearer ${token()}` }
  }).then(res => res.json())
}

module.exports = {
  list,
  create,
  get
}
