let arc = require('@architect/functions')
let github = require('./github')

async function login(req) {

  const code = req.queryStringParameters.code
  console.log({ code })
  let account
  if (code) {
    try {
      account = await github(code)
      console.log('account: ', account)
    } catch (err) {
      console.log('ERROR', err)
      return {
        statusCode: err.code,
        body: err.message
      }
    }
    return {
      statusCode: 302,
      session: { account },
      location: '/notes'
    }
  } else {
    return {
      statusCode: 302,
      location: '/notes'
    }
  }

}

exports.handler = arc.http.async(login)