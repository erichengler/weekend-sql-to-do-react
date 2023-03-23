import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import '../App/App.css';

function TaskList () {
    let [taskArray, setTaskArray] = useState([]);
    let [taskName, setTaskName] = useState('');
    let [taskCompleted, setTaskCompleted] = useState('No');

    // Getting the task list from the database
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
    // End of GET request

    useEffect(() => {
        fetchTaskList();
    }, []);

    return (
        <>
        {/* Create a Task Form */}
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
        {/* End of Create a Task Form */}

        {/* Task Table Display */}
        <div className="taskTable">
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Complete</th>
                        <th>Delete</th>
                    </tr>
                </thead>
            {
            taskArray.map((task) => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    fetchTaskList={fetchTaskList}
                />
                ))}
            </table>
        </div>
        {/* End of Task Table Display */}
        </>
    )
}

export default TaskList;