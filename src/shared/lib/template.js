const eta = require('eta')
const fs = require('fs')
const path = require('path')
const viewDir = path.resolve(__dirname + '/../views')

eta.configure({ views: viewDir })

const views = {
  index: fs.readFileSync(viewDir + '/index.html', 'utf-8'),
  layout: fs.readFileSync(viewDir + '/_layout.html', 'utf-8'),
  auth: fs.readFileSync(viewDir + '/auth.html', 'utf-8'),
  notes: fs.readFileSync(viewDir + '/notes.html', 'utf-8'),
  header: fs.readFileSync(viewDir + '/header.html', 'utf-8'),
  welcome: fs.readFileSync(viewDir + '/welcome.html', 'utf-8'),
  footer: fs.readFileSync(viewDir + '/footer.html', 'utf-8'),
  notesList: fs.readFileSync(viewDir + '/notes/list.html', 'utf-8'),
  notesForm: fs.readFileSync(viewDir + '/notes/form.html', 'utf-8'),
  notesSearch: fs.readFileSync(viewDir + '/notes/search.html', 'utf-8'),
  notesCreate: fs.readFileSync(viewDir + '/notes/create.html', 'utf-8'),
  notesShow: fs.readFileSync(viewDir + '/notes/show.html', 'utf-8')
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