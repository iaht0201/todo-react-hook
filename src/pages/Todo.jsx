import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  FormOutlined,
} from "@ant-design/icons";
import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { reducer } from "../../action";
import { initialState } from "../../store";
import TodoItem from "../components/TodoItem";
// import { AiFillDelete } from 'react-icons/fa';
export const TodoContext = createContext();
export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [save, setSave] = useState({
    complete: false,
    data: [],
  });
  const inputRef = useRef();
  const saveRef = useRef(false);
  const [sort, setSort] = useState("all");
 
  const handleUpdate = (todo) => {
    if (inputRef.current.value === "")
      return alert("Không hợp lệ xin vui lòng nhập lại !");
    dispatch({ type: "UPDATE", id: todo.id, task: inputRef.current.value });
    setSave(false);

    inputRef.current.value = "";
  };

  const handleAdd = () => {
    if (inputRef.current.value === "")
      return alert("Không hợp lệ xin vui lòng nhập lại !");
    dispatch({
      type: "ADD",
      id: state.length + 1,
      task: inputRef.current.value,
    });
    inputRef.current.value = "";
  };

  return (
    <TodoContext.Provider value={{ state, dispatch, inputRef ,save, setSave }}>
      <div className="todo-header">todos</div>
      <div className="todo-body">
        <div className="container">
          <div className="addTodo">
            <input
              type="text"
              placeholder="Hãy nhập một giá trị "
              className="input-addTodo"
              ref={inputRef}
            ></input>

            {!save.complete ? (
              <button onClick={() => handleAdd()} className="btnAdd">
                {" "}
                + Thêm mới
              </button>
            ) : (
              <>
                <CloseOutlined
                  className="btnClose"
                  onClick={() => {
                    setSave({ ...save, complete: false });
                    inputRef.current.value = "";
                  }}
                />
                <button
                  onClick={() => {
                    handleUpdate(save.data);
                  }}
                  className="btnAdd"
                >
                  {" "}
                  Lưu lại
                </button>
              </>
            )}
            {/* <button onClick={() => handleAdd()} className="btnAdd">
              {" "}
              + Thêm mới
            </button> */}
          </div>
          <div className="todoapp">
            {sort === "all" ? (
              <>
                {state.map((todo) => (
                  <TodoItem todo={todo} />
                ))}
              </>
            ) : (
              <></>
            )}
            {sort === "active" ? (
              <>
                {state.map(
                  (todo) => todo.complete === false && <TodoItem todo={todo} />
                )}
              </>
            ) : (
              <></>
            )}
            {sort === "completed" ? (
              <>
                {state.map(
                  (todo) => todo.complete === true && <TodoItem todo={todo} />
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="todo-sort">
            {" "}
            <div onClick={() => setSort("all")}>All</div>
            <div onClick={() => setSort("completed")} className="sortCompleted">
              Completed
            </div>
            <div onClick={() => setSort("active")}>Active</div>
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
}
