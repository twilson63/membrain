const eta = require('eta')
const fs = require('fs')
const path = require('path')
const viewDir = path.resolve(__dirname + '/../views')

eta.configure({ views: viewDir })

const read = p => fs.readFileSync(viewDir + p, 'utf-8')

const views = {
  index: read('/index.html'),
  layout: reac('/_layout.html'),
  auth: read('/auth.html'),
  notes: read('/notes.html'),
  header: read('/header.html'),
  welcome: read('/welcome.html'),
  footer: read('/footer.html'),
  notesList: read('/notes/list.html'),
  notesForm: read('/notes/form.html'),
  notesSearch: read('/notes/search.html'),
  notesCreate: read('/notes/create.html'),
  notesError: read('/notes/error.html'),
  notesShow: read('/notes/show.html'),
  notesUpdate: read('/notes/update.html')
}

eta.templates.define('welcome', eta.compile(views.welcome))
eta.templates.define('header', eta.compile(views.header))
eta.templates.define('footer', eta.compile(views.footer))
eta.templates.define('notes-list', eta.compile(views.notesList))

module.exports = (view, data) => {
  if (!views[view]) {
    throw new Error('View Template is not defined! See lib/template.js')
  }
  return eta.render(views[view], data)
}
