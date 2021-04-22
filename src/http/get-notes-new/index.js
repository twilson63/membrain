let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')
let { path } = require('ramda')

async function newNote(req) {
  let account = path(['session', 'account'], req)
  // check for session - if no session return welcome

  return {
    statusCode: 200,
    html: template('notesForm', {
      title: 'Membrain - New Note',
      tailwind: arc.static('/tailwind.css'),
      note: {
        title: '',
        tags: [],
        body: ''
      },
      account
    })
  }
}

exports.handler = arc.http.async(newNote) 