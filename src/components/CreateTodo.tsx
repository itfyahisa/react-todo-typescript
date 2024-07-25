import React from 'react'

type CreateTodoProps = {
    todoText: string,
    onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addTodo: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CreateTodo: React.FC<CreateTodoProps> = ({ todoText, onChangeTodoText, addTodo }) => {
    return (
        <div className="addTodo">
            <input type="text" value={todoText} onChange={onChangeTodoText} />
            <button onClick={addTodo}>追加</button>
        </div>
    )
}

export default CreateTodo