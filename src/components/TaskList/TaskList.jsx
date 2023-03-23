import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm.jsx'

function TaskList () {
    let [taskArray, setTaskArray] = useState([]);
    let [taskName, setTaskName] = useState('');
    let [taskCompleted, setTaskCompleted] = useState('No');

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

    return (
        <>
        <div>
            <TaskForm 
                taskName={taskName}
                setTaskName={setTaskName}
                taskCompleted={taskCompleted}
                setTaskCompleted={setTaskCompleted}
                fetchTaskList={fetchTaskList}
            />
                <br />
                <br />
        </div>

        <div className="taskTable">
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
        </>
    )
}

export default TaskList;