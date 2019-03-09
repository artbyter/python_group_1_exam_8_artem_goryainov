import React from 'react';
import TaskCard from '../TaskCard/taskcard'
import axios from 'axios'
import {BASE_URL, TASKS_URL} from '../../apiurls'
import {NavLink} from "react-router-dom";


class TaskList extends React.Component {

    state = {
        tasks: null
    }

    componentDidMount() {
        axios.get(BASE_URL+TASKS_URL)
            .then(response => {
                // console.log(response.data);
                return response.data;
            })
            .then(
                tasks => {

                    let stTasks = []
                    tasks.map(task => {


                        if(task.status == this.props.status) stTasks.push(task)
                    })
                    console.log(stTasks)
                    this.setState({tasks:stTasks})
                })
            .catch(error => console.log(error));
    }

    render() {
        if (!this.state.tasks) return null

        return (
            <div className='border border-dark mt-3 '>
                <h2>{this.props.title}</h2>
                {this.state.tasks.map(task => {
                    let link=TASKS_URL+task.id
                    return <NavLink key={task.id} to={link}><TaskCard  task={task}/></NavLink>
                })
                }
            </div>
        )
    }
}

export default TaskList;
