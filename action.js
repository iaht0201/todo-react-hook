import Todo from "./src/pages/Todo";

export const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETED":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case "DELETE":
      return state.filter((todo) => {
        return todo.id !== action.id;
      });
    case "ADD":
      return [
        {
          id: action.id,
          task: action.task,
          complete: false,
        },
        ...state,
      ];
    case "UPDATE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, task: action.task };
        } else {
          return todo;
        }
      });
    case "SORT_COMPLETED":
      return state.filter((todo) => {
        return todo.complete;
      });
    case "SORT_ALL":
      return state.filter((todo) => { return todo})
    case "SORT_ACTIVE":
      return state.filter((todo) => {
        return !todo.complete;
      });
    default:
      return state;
  }
};
