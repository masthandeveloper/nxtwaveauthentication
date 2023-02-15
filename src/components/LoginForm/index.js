import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', usernameError: false, submitError: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  success = () => {
    const {history} = this.props
    history.replace('/')
  }

  failure = submitError => {
    this.setState({usernameError: true, submitError})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success()
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {usernameError, username, password, submitError} = this.state
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="image"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="logodesktop"
          />
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            id="username"
            value={username}
            className="inputusername"
            type="text"
            placeholder="Username"
            onChange={this.onChangeUsername}
          />

          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            id="password"
            value={password}
            className="inputpassword"
            type="password"
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="button">
            Login
          </button>
          {usernameError && <p className="para">*{submitError}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
