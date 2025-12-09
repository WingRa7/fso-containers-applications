const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos
        .map((todo) => {
          const doneInfo = (
            <>
              <span>This todo is done</span>
              <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
                <p>{todo._id}</p>
              </span>
            </>
          );

          const notDoneInfo = (
            <>
              <span>This todo is not done</span>
              <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
                <button onClick={onClickComplete(todo)}> Set as done </button>
                <p>{todo._id}</p>
              </span>
            </>
          );

          return (
            <div
              key={todo._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "70%",
                margin: "auto",
              }}
            >
              <span>{todo.text}</span>
              {todo.done ? doneInfo : notDoneInfo}
            </div>
          );
        })
        .reduce((acc, cur, idx) => [...acc, <hr key={"hr" + idx} />, cur], [])}
    </>
  );
};

export default TodoList;
