import {HOST} from "../route";

class NetworkService {
  registerUser = (email, password) => {
    return fetch(`${HOST.API}/Users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    }).then(response => {
      return response;
    })
  };

  authorizationUser = (email, password) => {
    return fetch(`${HOST.API}/Users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    }).then(response => {
      return response;
    })
  };

  getTodoFromUser(access_token) {
    return fetch(`${HOST.API}/tasks?access_token=${access_token}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => {
      return response;
    })
  };

  deleteTodo(access_token, id) {
    fetch(`${HOST.API}/tasks/${id}?access_token=${access_token}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => {
      return response;
    })
  };

  addTodo(access_token, title_value, body_value) {
    return fetch(`${HOST.API}/tasks?access_token=${access_token}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "title": title_value,
        "body": body_value,
      })
    }).then(response => {
      return response;
    })
  };

  changeTodo(access_token, id, is_done) {
    return fetch(`${HOST.API}/tasks/${id}?access_token=${access_token}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "done": is_done,
      })
    }).then(response => {
      return response;
    })
  }

  editTodo(access_token, id, title, body) {
    fetch(`${HOST.API}/tasks/${id}?access_token=${access_token}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "title": title,
        "body": body,
      })
    })
  }
}

export default new NetworkService()
