import React, { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import CreateTodo from "./components/CreateTodo";
import { addDoc, collection, deleteDoc, doc, DocumentData, FirestoreDataConverter, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import db from "./firebase";
import { v4 as uuid } from "uuid";

export type Todo = {
    id: number,
    text: string,
    status: StatusType,
    timestamp: Date
    uuid: string
}

export type StatusType = "未着手" | "進行中" | "完了済"
export type FilterStatus = "すべて" | "未着手" | "進行中" | "完了済"

const App: React.FC = () => {

    const [todos, setTodos] = useState<Todo[]>([])
    const [todoText, setTodoText] = useState<string>("")
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("すべて")
    const [statusFilteredTodos, setStatusFilteredTodos] = useState<Todo[]>([])

    const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value)
    }

    const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // const newTodo: Todo = {
        //     id: todos.length + 1,
        //     text: todoText,
        //     status: "未着手"
        // }
        // const newTodos: Todo[] = [...todos, newTodo]
        // setTodos(newTodos)
        // setTodoText("")

        addDoc(collection(db, "todos"), {
            id: todos.length + 1,
            text: todoText,
            status: "未着手",
            timestamp: serverTimestamp(),
            uuid: uuid()
        })

    }

    const postConverter: FirestoreDataConverter<Todo> = {
        toFirestore(todo: Todo): DocumentData {
            return { ...todo }
        },
        fromFirestore(snapshot, options) {
            const data = snapshot.data(options)
            return {
                id: data.id,
                text: data.text,
                status: data.status,
                timestamp: data.timestamp,
                uuid: data.uuid
            }
        },
    }

    useEffect(() => {
        const fetchTodos = () => {
            const postData = collection(db, "todos").withConverter(postConverter)
            const q = query(postData, orderBy("timestamp", "asc"))
            onSnapshot(q, (QuerySnapshot) => {
                setTodos(QuerySnapshot.docs.map((doc) => doc.data()))
            })
        }
        fetchTodos()
    }, [])

    const deleteTodo = async (id: number, uuid: string) => {
        await deleteDoc(doc(db, "todos", uuid))
        const deleteTodoById: Todo[] = todos.filter((todo) => todo.id !== id)
        setTodos(deleteTodoById)
    }

    const updateTodo = (id: number, updateTodoText: string, updateStatus: StatusType) => {
        const updatedTodos: Todo[] = todos.map((todo) => (
            todo.id === id ? { ...todo, text: updateTodoText, status: updateStatus } : todo
        ))
        setTodos(updatedTodos)
    }

    const onChangeFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        (setFilterStatus(e.target.value as StatusType))
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
            <CreateTodo todoText={todoText} onChangeTodoText={onChangeTodoText} addTodo={addTodo} />


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