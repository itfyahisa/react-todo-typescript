import React, { useState } from 'react'
import { StatusType, Todo } from '../App'

type TodoItemProps = {
    todo: Todo,
    deleteTodo: (id: number, uuid: string) => void
    updateTodo: (id: number, text: string, status: StatusType) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, updateTodo }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [editText, setEditText] = useState(todo.text)
    const [editStatus, setEditStatus] = useState(todo.status)

    const onClickEdit = () => {
        setIsEdit(!isEdit)
    }
    const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value)
    }
    const handleUpdate = () => {
        updateTodo(todo.id, editText, editStatus)
        onClickEdit()
    }
    const onChangeEditStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditStatus(e.target.value as StatusType)
    }

    return (
        <div>
            <div className="todoitem" key={todo.id}>
                {!isEdit ? (
                    <>
                        <p>{todo.id} : {todo.text} : {todo.status}</p>
                        <button onClick={onClickEdit}>編集</button>
                        <button onClick={() => deleteTodo(todo.id, todo.uuid)}>削除</button>
                    </>
                ) : (
                    <>
                        <p>{todo.id} : &nbsp;</p>
                        <input type="text" value={editText} onChange={onChangeEditText} />
                        <select value={editStatus} onChange={onChangeEditStatus}>
                            <option value="未着手">未着手</option>
                            <option value="進行中">進行中</option>
                            <option value="完了済">完了済</option>
                        </select>
                        <button onClick={handleUpdate}>更新</button>
                        <button onClick={onClickEdit}>編集キャンセル</button>
                    </>
                )}

            </div>
        </div>
    )
}

export default TodoItem