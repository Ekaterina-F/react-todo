import {faCheck, faPen, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './app-todo-items.css';

class AppTodoItems extends React.Component {

  onClickDeleteItem = () => {
    const {id_value, func_delete_todo_item} = this.props;
    func_delete_todo_item(id_value);
  };


  onClickDoneItem = () => {
    const {id_value, func_update_is_done_todo_item} = this.props;
    func_update_is_done_todo_item(id_value);
  };

  onClickComeToEditPage = () => {
    const {id_value, button_come_to_edit_page} = this.props;
    button_come_to_edit_page(id_value);
  };

  render() {

    const {is_done_value, title_value, body_value} = this.props;

    let classNames = 'app-todo-items';

    if (is_done_value) {
      classNames += ' done'
    }

    return (
      <div className={classNames}>
        <div className="todos-items-header-title">{title_value}</div>
        <div className="todos-items-body">
          <div className="todos-items-body-text">{body_value}</div>
          <div className="todos-items-body-buttons">
            <button id="button-trash" className={"buttons"}
                    onClick={() => {
                      this.onClickDeleteItem()
                    }}>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#c70000"/>
            </button>

            <button id="button-edit" className={"buttons"}
                    onClick={() => {
                      this.onClickComeToEditPage()
                    }}>
              <FontAwesomeIcon icon={faPen} size="lg" color="#ffa500"/>
            </button>

            <button id="button-check" className={"buttons"}
                    onClick={() => {
                      this.onClickDoneItem()
                    }}>
              <FontAwesomeIcon icon={faCheck} size="lg" color="green"/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AppTodoItems
