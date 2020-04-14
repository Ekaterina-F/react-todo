import React from "react";
import AppTodoItems from "../app-todo-items/app-todo-items"
import './app-todos.css'

class AppTodos extends React.Component {
  render() {

    const {todo_list_data, func_delete_todo_item, func_update_is_done_todo_item, button_come_to_edit_page} = this.props;

    return (
      <div id="app-todos">
        {
          todo_list_data.map(item => {
            const {id, title, body, is_done} = item;

            return (

              <AppTodoItems key={id}
                            id_value={id}
                            title_value={title}
                            body_value={body}
                            is_done_value={is_done}
                            func_delete_todo_item={func_delete_todo_item}
                            func_update_is_done_todo_item={func_update_is_done_todo_item}
                            button_come_to_edit_page={button_come_to_edit_page}
              />
            );
          })
        }
      </div>
    )
  }
}

export default AppTodos;
