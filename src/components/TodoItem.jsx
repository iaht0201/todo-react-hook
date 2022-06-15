import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { TodoContext } from "../pages/Todo";

export default function ({ todo }) {
  const { state, dispatch, inputRef, setSave } = useContext(TodoContext);
  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETED", id: todo.id });
  };
  const handleDelete = (todo) => {
    dispatch({ type: "DELETE", id: todo.id });
  };

  return (
    <>
      <div className="todo">
        <input
          type="checkbox"
          className="input-checkTodo"
          checked={todo.complete}
          onChange={() => handleComplete(todo)}
        />

        <label className={`todo-title ${todo.complete ? "todo-line" : ""}`}>
          {todo.task}
        </label>

        {/* <AiFillDelete/> */}
        <div className="todo-function">
          {todo.complete ? (
            <div
              className={`btnDelete ${todo.id}`}
              onClick={() => handleDelete(todo)}
            >
              <DeleteOutlined />
            </div>
          ) : (
            <div className="editTodo">
              <button
                onClick={() => {
                  inputRef.current.focus();
                  inputRef.current.value = todo.task;

                  setSave({
                    complete: true,
                    data: todo,
                  });
                }}
              >
                <FormOutlined />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
