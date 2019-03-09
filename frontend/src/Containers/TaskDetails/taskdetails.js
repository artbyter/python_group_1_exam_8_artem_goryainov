import React, {Component} from 'react'

import {NavLink} from "react-router-dom";
import axios from 'axios';
import {BASE_URL, TASKS_URL} from "../../apiurls";
import TaskCard from '../../Components/TaskCard/taskcard'
import TaskForm from '../../Components/TaskForm/taskform'

class TaskDetails extends Component {
    state = {
        task: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(BASE_URL + TASKS_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }

    render() {
       if(!this.state.task) return null

       return <TaskForm props={this.props} task={this.state.task} edit={true}/>
    }
}

export default TaskDetails