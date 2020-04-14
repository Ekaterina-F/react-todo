import React from 'react';
import './todo-page.css';
import AppTodos from "./components/app-todos";
import TodoAddItem from "./components/todo-add-item";
import {Redirect} from "react-router-dom";
import NetworkService from "../network/network-service";
import {PATH} from "../route";

class TodoPage extends React.Component {

  constructor(props) {
    super(props);

    const {state} = props.location;

    let access_token = undefined;
    if (state !== undefined) {
      access_token = state.access_token
    }

    this.state = {
      access_token: access_token,
      todo_list: [],
      logout: false,
      edit_page: false,
      item: {}
    };
  }

  // Функция по созданию объектов (тудушек)
  createTodoItem(id, title_value, body_value, is_done) {
    return {
      "id": id,
      "title": title_value,
      "body": body_value,
      "is_done": is_done
    };
  }

  getItemById(id) {
    const {todo_list} = this.state;

    const item_in_array = todo_list.findIndex((item) => item.id === id);
    return todo_list[item_in_array]
  }

  // Функция добавляет новую тудуху в массив
  addTodoItem = (title_value, body_value) => {
    const {access_token} = this.state;

    NetworkService.addTodo(access_token, title_value, body_value).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(json => {
      const {id, title, body, done} = json;

      const item = this.createTodoItem(id, title, body, done);
      this.setState((state) => {
        return {todo_list: [...state.todo_list, item]};
      })
    })
  };

  deleteTodoItem = (id) => {

    this.setState(({todo_list}) => {
      const {access_token} = this.state;
      const index_item_in_array = todo_list.findIndex((item) => item.id === id);

      NetworkService.deleteTodo(access_token, id);

      todo_list.splice(index_item_in_array, 1);

      return {todo_list_old: todo_list};
    });
  };

  // Обновляет is_done у элемента
  updateIsDoneTodoItem = (id) => {
    const {todo_list, access_token} = this.state;

    const item_in_array = todo_list.findIndex((item) => item.id === id);
    const item = todo_list[item_in_array];

    item.is_done = !item.is_done;

    NetworkService.changeTodo(access_token, id, item.is_done).then(response => {
      if (response.ok) {
        this.setState({todo_list_old: todo_list});
      }
    })
  };

  //Функция для получения заметок
  getTodoFromBack = () => {
    const {access_token} = this.state;

    NetworkService.getTodoFromUser(access_token).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    }).then(response_json => {

      response_json.map(json_item => {
        const {id, title, body, done} = json_item;

        const item = this.createTodoItem(id, title, body, done);

        this.setState((state) => {
          return {todo_list: [...state.todo_list, item]};
        })
      });
    })
  };

  componentDidMount() {
    const {access_token} = this.state;

    if (access_token !== undefined) {
      this.getTodoFromBack()
    }
  }

  logout = () => {
    this.setState({logout: true})
  };

  comeToEditPage = (id) => {
    const item = this.getItemById(id);

    this.setState({edit_page: true, item: item})
  };

  render() {

    const {item, edit_page, logout, access_token, todo_list} = this.state;

    if (access_token === undefined || logout) {
      return (
        <Redirect to={{
          pathname: PATH.AUTH
        }}/>
      )
    }

    if (edit_page) {
      return (
        <Redirect to={{
          pathname: PATH.EDIT,
          state: {
            access_token: access_token,
            item: item
          }
        }}/>
      )
    }

    return (
      <div id="app-main" className={"page-component"}>
        <div id="out-btn">
          <button onClick={() => {
            this.logout()
          }}>Выйти
          </button>
        </div>
        <div id="app-title" className={"page-title"}>
          Заметки
        </div>

        <TodoAddItem func_add_todo_item={this.addTodoItem}/>

        {/* Передаём значения через атрибут todo_list_data*/}
        <AppTodos todo_list_data={todo_list}
                  func_delete_todo_item={this.deleteTodoItem}
                  func_update_is_done_todo_item={this.updateIsDoneTodoItem}
                  button_come_to_edit_page={this.comeToEditPage}/>
      </div>
    );
  }
}

export default TodoPage;
