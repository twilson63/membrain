const arc = require('@architect/functions')
const template = require('@architect/shared/lib/template')

async function auth(req) {
  let account = req.session && req.session.account
  console.log('SESSION: ', req.session)

  let clientID = process.env.GITHUB_CLIENT_ID
  let redirectURL = process.env.GITHUB_REDIRECT

  let href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_url=${redirectURL}`

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: template('auth', { account, href })
  }
}

exports.handler = arc.http.async(auth)