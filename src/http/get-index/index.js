let arc = require('@architect/functions')
let template = require('@architect/shared/lib/template')

// learn more about HTTP functions here: https://arc.codes/primitives/http
async function index(req) {
  let clientID = process.env.GITHUB_CLIENT_ID
  let redirectURL = process.env.GITHUB_REDIRECT

  let href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_url=${redirectURL}`

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: template('index', { title: 'Membrain', tailwind: arc.static('/tailwind.css'), login: href })
  }
}

exports.handler = arc.http.async(index)