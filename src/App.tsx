import React, { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";

export type Todo = {
    id: number,
    text: string,
    status: StatusType
}

export type StatusType = "未着手" | "進行中" | "完了済"
export type FilterStatus = "すべて" | "未着手" | "進行中" | "完了済"

const App: React.FC = () => {

    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "test1", status: "未着手" },
        { id: 2, text: "test2", status: "進行中" },
        { id: 3, text: "test3", status: "完了済" }
    ])
    const [TodoText, setTodoText] = useState<string>("")

    const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value)
    }

    const addTodo = () => {
        const newTodo: Todo = {
            id: todos.length + 1,
            text: TodoText,
            status: "未着手"
        }
        const newTodos: Todo[] = [...todos, newTodo]
        setTodos(newTodos)
        setTodoText("")
    }

    const deleteTodo = (id: number) => {
        const deleteTodoById: Todo[] = todos.filter((todo) => todo.id !== id)
        setTodos(deleteTodoById)
    }

    const updateTodo = (id: number, updateTodoText: string, updateStatus: StatusType) => {
        const updatedTodos: Todo[] = todos.map((todo) => (
            todo.id === id ? { ...todo, text: updateTodoText, status: updateStatus } : todo
        ))
        setTodos(updatedTodos)
    }

    const [filterStatus, setFilterStatus] = useState<FilterStatus>("すべて")
    const [statusFilteredTodos, setStatusFilteredTodos] = useState<Todo[]>([])

    const onChangeFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value as StatusType)
    }

    useEffect(() => {
        if (filterStatus === "すべて") {
            setStatusFilteredTodos(todos)
        } else {
            setStatusFilteredTodos(todos.filter((todo) => todo.status === filterStatus))
        }
    }, [filterStatus, todos])



    return (
        <div className="App">

            <h1>Todo</h1>

            <p>新規作成</p>
            <div className="addTodo">
                <input type="text" value={TodoText} onChange={onChangeTodoText} />
                <button onClick={addTodo}>追加</button>
            </div>

            <p>一覧表示</p>
            <div className="filter">
                <select value={filterStatus} onChange={onChangeFilterStatus}>
                    <option value="すべて">すべて</option>
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了済">完了済</option>
                </select>
            </div>
            <div className="indexTodo">
                {filterStatus === "すべて" ? (
                    todos.map((todo) => (
                        <TodoItem todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                        // <div className="todoitem">
                        //     <p>{todo.id} : {todo.text}</p>
                        //     <button onClick={() => onClickEdit(todo.id)}>編集</button>
                        //     <button onClick={() => deleteTodo(todo.id)}>削除</button>
                        // </div>
                    ))
                ) : (
                    statusFilteredTodos.map((todo) => (
                        <TodoItem todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                    ))
                )}

            </div>
        </div>
    )
}

export default App