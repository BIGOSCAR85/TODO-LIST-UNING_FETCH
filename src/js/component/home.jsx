import React, { useState, useEffect } from "react";

const Home = () => {
  let initialState = { label: "", done: false };
  let urlBase = "https://assets.breatheco.de/apis/fake/todos/user";
  const [listaTareas, setListaTareas] = useState(initialState);
  const [lista, setLista] = useState([]);

  const handleChange = (event) => {
    setListaTareas({
      ...listaTareas,
      [event.target.name]: event.target.value,
    });
  };

  const getTasks = async () => {
    try {
      let response = await fetch(`${urlBase}/bigoscar85`);
      let data = await response.json();
      console.log(response.status);
      if (response.status == 404) {
        createTodos();
      } else {
        setLista(data);
      }
    } catch (error) {
      //En caso de algun un error
      console.log(error);
    }
  };

  const createTodos = async () => {
    try {
      let response = await fetch(`${urlBase}/bigoscar85`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      let data = await response.json();
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    try {
      let response = await fetch(`${urlBase}/bigoscar85`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...lista, listaTareas]),
      });
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    let newListTask = lista.filter((item, index) => id !== index);
    try {
      let response = await fetch(`${urlBase}/bigoscar85`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListTask),
      });
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAll = async () => {
    try {
      let response = await fetch(`${urlBase}/bigoscar85`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container rounded">
      <h1 className="text-center display-1 mb-2 mt-5">todos</h1>
      <div className="form shadow mb-5 bg-body rounded">
        <card className="list">
          <input
            maxLength={45}
            className="input"
            type="text"
            name="label"
            onKeyDown={(event) => {
              if (event.key === "Enter" && listaTareas.label.trim() !== "") {
                // setLista([...lista, listaTareas])
                addTask();
                setListaTareas(initialState);
              }
            }}
            // onChange={(event) => setListaTareas(event.target.value)}
            onChange={handleChange}
            value={listaTareas.label}
            placeholder="Add a New Task!"
          ></input>
        </card>
        <div className="list">
          {lista.map((elementLista, index) => {
            return (
              <li
                key={index}
                className="todolist d-flex justify-content-between"
              >
                {elementLista.label}
                <button
                  className="button d-flex"
                  type="button"
                  onClick={() => {
                    deleteTask(index);
                  }}
                >
                  <i className="fas fa-xmark"></i>
                </button>
              </li>
            );
          })}
          <span className="tasks d-flex">
            {lista.length === 0
              ? "No Tasks, add a Task!"
              : lista.length === 1
              ? lista.length + " Item Left"
              : lista.length + " Items Left"}
          </span>
          <button
            className="btn btn-outline-dark mb-3 shadow"
            type="button"
            onClick={() => {
              deleteAll();
            }}
          >
            <em>Delete All!</em>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
