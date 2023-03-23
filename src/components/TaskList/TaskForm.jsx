import React, {useState, useEffect} from 'react';
import axios from 'axios';

function TaskForm ( { taskName, setTaskName, taskCompleted, setTaskCompleted, fetchTaskList }) {


    const addTask = (event) => {
        event.preventDefault();

        // POST request to create a task
        axios.post('/todo', {
            task: taskName,
            completed: taskCompleted
        }).then((response) => {
            setTaskName('');
            setTaskCompleted('');
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in POST ${error}`);
            alert(`Something went wrong.`);
        })
    }

    return (
        <>
        {/* Create a Task Form */}
            <form onSubmit={addTask}>
                <h2>Create a Task</h2>
                <label htmlFor="task-input">Task: </label>
                <input id="task-input" onChange={e => setTaskName(e.target.value)} />
                <br />
                <br />
                <button id="createTaskButton">Create</button>
            </form>
        </>
    )
}

export default TaskForm;