import React, {useState, useEffect} from 'react';
import axios from 'axios';

function TaskTable () {
    let [taskName, setTaskName] = useState('');
    let [taskCompleted, setTaskCompleted] = useState('No');
    let [taskArray, setTaskArray] = useState([]);

    const fetchTaskList = () => {
        axios.get('/todo').then((response) => {
            // WHY IS taskArray still empty after this line?
            setTaskArray(response.data);
            console.log('test', taskArray);
        }).catch((error) => {
            console.log(`Error in GET ${error}`);
            alert(`Something went wrong.`);
        })
    }

    useEffect(() => {
        fetchTaskList();
    }, []);

    const addTask = (event) => {
        event.preventDefault();

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
        <div className="taskTable">
            <form onSubmit={addTask}>
                <h2>Create a Task</h2>
                <label htmlFor="task-input">Task:</label>
                <input id="task-input" onChange={e => setTaskName(e.target.value)} />
                <br />
                <button id="createTaskButton">Create</button>
            </form>
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Completed</th>
                        <th>Delete</th>
                    </tr>
                </thead>
            {
            taskArray.map((task) => (
                <tbody key={task.id}>
                    <tr>
                        <td>{task.task}</td>
                         <td><button className="completeButton">{task.completed}</button></td>
                         <td><button className="deleteButton">Delete</button></td>
                     </tr>
                </tbody>
                ))
            }
            </table>
        </div>
    )
}

export default TaskTable;