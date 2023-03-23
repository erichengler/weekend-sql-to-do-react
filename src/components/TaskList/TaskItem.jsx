import axios from 'axios';

function TaskItem ({ task, fetchTaskList }) {
    
    const removeTask = (event) => {
        console.log( `removeTask ${task.id}` );
        axios.delete(`/todo/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log( `Error in removeTask ${error}` )
            alert( 'Something went wrong!' )
        })
    }

    const completeTask = (event) => {
        axios.put( `/todo/${task.id}` ).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log( `Error in PUT ${error}` )
            alert( 'Something went wrong!' );
        })
    }

    const getColor = () => {
        if( task.completed === 'Yes' ) {
            return 'lime';
        } else {
            return 'silver';
        }
    }

    return (
        <>
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





