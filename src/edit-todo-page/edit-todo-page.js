import React, {Component} from 'react';
import './edit-todo-page.css';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Redirect} from "react-router-dom";
import {PATH} from "../route";
import NetworkService from "../network/network-service";

export default class EditTodoPage extends Component {

  constructor(props) {
    super(props);

    const {state} = props.location;

    let access_token = undefined;
    let item = undefined;
    if (state !== undefined) {
      access_token = state.access_token;
      item = state.item
    }

    this.state = {
      access_token: access_token,
      item: item,
      close: false,
      is_save: true
    };
  }


  onClickEditTodo = () => {
    const {access_token, item} = this.state;

    const {id, title, body} = item;

    NetworkService.editTodo(access_token, id, title, body);
    this.setState({is_save: true})
  };

  closeEditor = () => {
    const {is_save} = this.state;

    let is_close = true;

    if (!is_save) {
      is_close = window.confirm("Вы точно хотите уйти, не сохранив изменения?");
    }

    this.setState({close: is_close});


  };

  render() {
    const {access_token, item, close} = this.state;


    if (access_token === undefined || close) {
      return (
        <Redirect to={{
          pathname: PATH.TODO,
          state: {
            access_token: access_token,
          }
        }}/>
      )
    }


    const {title, body} = item;

    return (
      <div className="page-component">
        <div style={{flexDirection: 'row'}}>
          <button type="button"
                  onClick={() => {
                    this.closeEditor()
                  }}
                  id="button-close">
            <FontAwesomeIcon icon={faTimes} size="lg" color="#c70000"/>
          </button>
          <div id="edit-name">
            Редактирование заметки
          </div>
        </div>

        <div style={{flexDirection: 'column'}} className="bottom-edit-todo">
          <textarea id="textarea-title"
                    cols="52"
                    rows="1"
                    defaultValue={title}
                    onChange={event => {
                      item.title = event.target.value;
                      this.setState({item: item, is_save: false})
                    }}/>
          <textarea id="textarea-body"
                    cols="52"
                    rows="1"
                    defaultValue={body}
                    onChange={event => {
                      item.body = event.target.value;
                      this.setState({item: item, is_save: false})
                    }}/>
          <button type="button"
                  onClick={() => {
                    this.onClickEditTodo()
                  }}
                  id="button-component-save"> Сохранить
          </button>
        </div>
      </div>
    );
  };
};

