let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')
let { path } = require('ramda')
let { create } = require('@architect/shared/lib/notes/controller')

async function createNote(req) {
  let account = path(['session', 'account'], req)
  if (!account) {
    return {
      statusCode: 302,
      location: '/'
    }
  }
  const result = await create(account.login, req.body)

  if (!result.ok) {
    return template('notesError', {
      account,
      message: 'Membrain could not save note'
    })
  }

  return {
    html: template('notesCreate', {
      account,
      note: {
        id: result.id
      }
    })
  }
}

exports.handler = arc.http.async(createNote)