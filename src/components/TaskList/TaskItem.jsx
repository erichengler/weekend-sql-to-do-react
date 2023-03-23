import axios from 'axios';


function TaskItem ({ task, fetchTaskList }) {
    
    const removeTask = (event) => {
        axios.delete(`/todo/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in removeTask ${error}`)
            alert('Something went wrong!')
        })
    }

    return (
        <>
        <tbody key={task.id}>
            <tr>
                <td>{task.task}</td>
                <td><button className="completeButton">{task.completed}</button></td>
                <td><button onClick={ (event) => removeTask(event) }>Delete</button></td>
            </tr>
        </tbody>
        </>
    )
}

export default TaskItem;





