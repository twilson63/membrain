let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')

async function logout(req) {
  let clientID = process.env.GITHUB_CLIENT_ID
  let redirectURL = process.env.GITHUB_REDIRECT

  let href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_url=${redirectURL}`

  return {
    session: {},
    statusCode: 200,
    html: template('welcome', { title: 'Membrain', tailwind: arc.static('/tailwind.css'), login: href })
  }
}

exports.handler = arc.http.async(logout)