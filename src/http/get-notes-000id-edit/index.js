let arc = require('@architect/functions')
let { get } = require('@architect/shared/lib/notes/controller')
let template = require('@architect/shared/lib/template')

let { path } = require('ramda')

async function editNote(req) {
  let account = path(['session', 'account'], req)
  if (!account) { return { statusCode: 302, location: '/' } }
  let id = req.params.id
  const note = await get(account.login, id)
  console.log(note)
  return {
    html: template('notesForm', {
      title: 'Membrain - Edit Note',
      tailwind: arc.static('/tailwind.css'),
      account,
      note
    })
  }

}

exports.handler = arc.http.async(editNote)

