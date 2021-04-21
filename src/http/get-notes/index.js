let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')
let { path } = require('ramda')

async function notes(req) {
  if (!path(['session', 'account'], req)) {
    return {
      statusCode: 302,
      location: '/'
    }
  }
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: template('notes', {
      account: path(['session', 'account'], req),
      title: 'Membrain - Notes',
      tailwind: arc.static('/tailwind.css')
    })
  }
}

exports.handler = arc.http.async(notes)