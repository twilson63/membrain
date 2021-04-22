let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')
let { path } = require('ramda')
let { list } = require('@architect/shared/lib/notes/controller')

async function notes(req) {
  const account = path(['session', 'account'], req)
  if (!account) {
    return {
      statusCode: 302,
      location: '/'
    }
  }
  // get list of notes 
  let notes = await list(account.login)
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: template('notes', {
      account,
      title: 'Membrain - Notes',
      tailwind: arc.static('/tailwind.css'),
      notes
    })
  }
}

exports.handler = arc.http.async(notes)