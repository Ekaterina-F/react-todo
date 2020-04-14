import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import './todo-add-item.css'

class TodoAddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item_value: ""
    }
  }

  onClickAddItem = () => {
    const {func_add_todo_item} = this.props;
    const {item_value} = this.state;

    if (item_value !== "") {
      func_add_todo_item("Новая заметка", item_value);
      this.setState({item_value: ""})
    }
  };


  onChange(event) {

    const {target} = event;
    const item_value = target.value;
    this.setState({item_value: item_value})
  }

  render() {
    const {item_value} = this.state;

    return (
      <div id="todo-add-item">
        <button id="search-btn"
                onClick={() => {
                  this.onClickAddItem()
                }}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" color="deepskyblue"/>
        </button>

        <input type="text" value={item_value} placeholder="Добавьте новую заметку"
               onChange={event => this.onChange(event)}/>
      </div>
    )
  }
}

export default TodoAddItem
