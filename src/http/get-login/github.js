const fetch = require('node-fetch')

module.exports = async function github(code) {
  console.log('GITHUB', code)
  try {
    let result = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_url: process.env.GITHUB_REDIRECT
      })
    }).then(r => r.json())
    let token = result.access_token
    console.log('TOKEN: ', token)

    try {
      let user = await fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }).then(r => r.json())
      return {
        token,
        name: user.name,
        login: user.login,
        id: user.id,
        url: user.url,
        avatar: user.avatar_url
      }
    } catch (err) {
      return {
        error: err.message
      }
    }
  } catch (err) {
    return {
      error: err.message
    }
  }
}
