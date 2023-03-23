import axios from 'axios';

function TaskItem ({ task, fetchTaskList }) {
    
    // DELETE request to delete a task from the database 
    // and then fetch the task list
    const removeTask = (event) => {
        console.log( `removeTask ${task.id}` );
        axios.delete(`/todo/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log( `Error in removeTask ${error}` )
            alert( 'Something went wrong!' )
        })
    }

    // PUT request to update a task completed from 'No' to 'Yes' 
    // and then fetch the task list
    const completeTask = (event) => {
        axios.put( `/todo/${task.id}` ).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log( `Error in PUT ${error}` )
            alert( 'Something went wrong!' );
        })
    }

    // Changes background color of completed tasks to DarkSeaGreen
    const getColor = () => {
        if( task.completed === 'Yes' ) {
            return 'DarkSeaGreen';
        } else {
            return;
        }
    }

    return (
        <>
        {/* Task Table Data and Buttons  */}
        <tbody key={task.id}>
            <tr style={{ backgroundColor: getColor() }}>
                <td>{task.task}</td>
                <td><button onClick={ (event) => completeTask(event) }>{task.completed}</button></td>
                <td><button onClick={ (event) => removeTask(event) }>Delete</button></td>
            </tr>
        </tbody>
        </>
    )
}

export default TaskItem;





