import React from "react";
import './auth-page.css';
import NetworkService from "../network/network-service";
import {Link, Redirect} from "react-router-dom";
import {PATH} from "../route";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      access_token: undefined,
      redirect: false,
      error: false,
      error_text: ""
    };
  }

  onClickAuthorization() {
    const {email, password} = this.state;

    NetworkService.authorizationUser(email, password).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Неверно введен логин и(или) пароль")
      }
    }).then(json => {
      this.setState({access_token: json.id, redirect: true})
    }).catch(error => {
      this.setState({error: true, error_text: error.message})
    })
  };

  render() {
    const {redirect, access_token} = this.state;

    if (redirect) {
      return (
        <Redirect to={{
          pathname: PATH.TODO,
          state: {
            access_token: access_token,
          }
        }}/>
      )
    }

    return (
      <div id="auth-page" className={"page-component"}>
        <div id="auth-title" className={"page-title"}>
          Авторизация
        </div>
        <div id="auth-form">
          <input id="auth-login-input" type="text" placeholder="E-mail"
                 onChange={event => this.setState({email: event.target.value})}
          />

          <input id="auth-password-input" type="password" placeholder="Пароль"
                 onChange={event => this.setState({password: event.target.value})}
          />
        </div>
        <div id="auth-btn">
          <button onClick={() => this.onClickAuthorization()}> Авторизоваться</button>
        </div>

        <div className="alert">
          {
            this.state.error
              ? <div className="alert-danger" role="alert">
                {this.state.error_text}
              </div>
              : null
          }

        </div>
        <Link to={PATH.REG}>
          <div id="reg-ref">
            Регистрация
          </div>
        </Link>
      </div>
    );
  }
}

export default AuthPage
