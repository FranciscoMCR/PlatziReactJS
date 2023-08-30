import React from 'react';
import './App.css';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { EmptyTodos } from '../EmptyTodos';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { TodoContext } from '../TodoContext';


function AppUI() {
    const {
        searchedTodos,
        completeTodo,
        deleteTodo,
        loading,
        error,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext);
    return (
        <>
            <TodoCounter />
            <TodoSearch />
            <TodoList>
                {loading &&
                    <>
                        <TodosLoading />
                        <TodosLoading />
                        <TodosLoading />
                    </>
                }
                {error && <TodosError />}
                {!loading && searchedTodos.length === 0 && <EmptyTodos />}

                {searchedTodos.map(todo => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>


            <CreateTodoButton 
                setOpenModal={setOpenModal}
            />

            {openModal && (
            <Modal>
               <TodoForm />
            </Modal>
            )}

        </>
    );
}

export { AppUI };