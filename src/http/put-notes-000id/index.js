let arc = require('@architect/functions')
let template = require("@architect/shared/lib/template")
let { get, update } = require('@architect/shared/lib/notes/controller')
let { merge, path } = require('ramda')

async function updateNote(req) {
  const account = path(['session', 'account'], req)
  if (!account) { return { statusCode: 302, location: '/'}}
  const note = await get(account.login, req.query.id)
  const result = await update(account.login, merge(note, req.body))
  if (!result.ok) {
    return { html: template('notesError', { message: result.message }) }
  }
  return {
    html: template('notesUpdate', { id: result.id })
  }
}

exports.handler = arc.http.async(updateNote)

/*
const account = over(lens(prop('req'), assoc('account')), path(['session', 'account'])) 
const checkAccount = ctx => ctx.account ? Async.Resolved(ctx) : Async.Rejected({ message: 'not authorized'})
const getNote = ctx => Async.fromPromise(get)(ctx.account.login, ctx.req.query.id)
  .map(note => set(lensProp('note'), note, ctx))
const mergeNote = over(lensProp('note'), merge(ctx.req.body))
const updateNote = ctx => Async.fromPromise(update)(ctx.account.login, ctx.note)
  .map(result => set(lensProp('result'), result, ctx))
const checkUpdate = ctx => ctx.result.ok ? Async.Resolved(ctx) : Async.Rejected({ message: 'could not update note'})


const updateNote = async req => 
  Async({req})
    .map(account)
    .chain(checkAccount)
    .chain(getNote)
    .map(mergeNote)
    .chain(updateNote)
    .chain(checkUpdate)
    .fork(
      e => ({ html: template('notesError', { message: e.message })}),
      ctx => ({ html: template('notesUpdate', { id: ctx.result.id }) })
    )
*/
    


