let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')
let { get } = require('@architect/shared/lib/notes/controller')
let { path } = require('ramda')
let marked = require('marked')

async function getNote(req) {
  const account = path(['session', 'account'], req)
  if (!account) { return { statusCode: 302, location: '/' } }

  const note = await get(account.login, req.params.id)
  if (!note) { return '<h1>Not Found</h1>' }

  return {
    html: template('notesShow', {
      title: 'Membrain - View Note',
      tailwind: arc.static('/tailwind.css'),
      note: {
        html: marked(note.body || '_no content_'),
	id: req.params.id,
        ...note
      }
    })
  }
}

exports.handler = arc.http.async(getNote)
