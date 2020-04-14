import React from "react";
import './reg-page.css';
import {Link} from "react-router-dom";
import NetworkService from "../network/network-service";
import {PATH} from "../route";

class RegPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
      success: false
    };
  }

  register = () => {
    const {email, password} = this.state;

    NetworkService.registerUser(email, password).then(response => {
      if (response.ok) {
        this.setState({error: false, success: true})
      } else {
        this.setState({error: true, success: false})
      }
    })
  };

  render() {
    return (
      <div id="reg-page" className={"page-component"}>
        <div id="reg-title" className={"page-title"}>
          Регистрация
        </div>
        <div id="reg-form">
          <input id="reg-login-input" type="text" placeholder="E-mail"
                 onChange={event => this.setState({email: event.target.value})}/>
          <input id="reg-password-input" type="password" placeholder="Пароль"
                 onChange={event => this.setState({password: event.target.value})}/>
        </div>
        <div id="reg-btn">
          <button onClick={() => this.register()}> Зарегистрироваться</button>
        </div>

        <div className="alert">
          {
            this.state.error
              ? <div className="alert-danger" role="alert">
                Ошибка при регистрации!
              </div>
              : null
          }
          {
            this.state.success
              ? <div className="alert-success" role="alert">
                Регистрация прошла успешно!<br/>
                Перейдите по ссылке ниже и авторизуйтесь
              </div>
              : null
          }
        </div>
        <Link to={PATH.AUTH}>
          <div id="auth-ref">Уже зарегистрированы? Авторизуйтесь</div>
        </Link>
      </div>
    )
  }
}

export default RegPage
