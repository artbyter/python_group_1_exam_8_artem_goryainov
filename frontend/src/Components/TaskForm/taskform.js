import React, {Component} from 'react';
import {BASE_URL, TASKS_URL} from '../../apiurls'
import axios from 'axios';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TaskForm extends Component {

    constructor(props) {
        super(props)
        const task_desc = {
            summary: "",
            description: "",
            due_date: "",
            status: "",
            time_planned: "",
        }
        console.log(props.props.task)
        this.state = props.task ? {task: props.task} : {task: task_desc}
        this.state.alert = null
        this.state.submitDisabled = false


    }



    updateTaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };


    dateChanged = (field, date) => {

        this.updateTaskState(field, date.toISOString());
    };


    selectChanged = (field, values) => {
        const category_ids = ['queued', 'in work', 'done'];
        this.updateTaskState(field, values.value);
    };


    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        console.log(this.state.task)
        if (this.props.edit == false) {
            axios.post(BASE_URL + TASKS_URL, this.state.task)
                .then(response => {

                    if (response.status === 201) return response.data;
                    throw new Error('Task was not created');
                })

                .then(task => {

                    this.props.props.history.replace('/tasks/' + task.id)
                })
                .catch(error => {
                    console.log(error);
                    this.setState(prevState => {
                        let newState = {...prevState};
                        newState.alert = {type: 'danger', message: `Task was not added!`};
                        newState.submitDisabled = false;
                        return newState;
                    });
                });
        }
        else {
             axios.put(BASE_URL + TASKS_URL+this.state.task.id +'/', this.state.task)
                .then(response => {

                    if (response.status === 200) return response.data;
                    throw new Error('Task was not created');
                })

                .then(task => {
                        console.log(task)
                    this.props.props.history.replace('/tasks/')
                })
                .catch(error => {
                    console.log(error);
                    this.setState(prevState => {
                        let newState = {...prevState};
                        newState.alert = {type: 'danger', message: `Task was not added!`};
                        newState.submitDisabled = false;
                        return newState;
                    });
                });
        }
    }


    render() {
        const select_options = [
            {value: 'queued', label: "Queued"},
            {value: 'in work', label: "In work"},
            {value: 'done', label: "Done"}
        ]
        const {summary, description, due_date, status, time_planned} = this.state.task;

        const due_date_selected = due_date ? new Date(due_date) : null;

        let disable=this.props.edit ? null : 'isDisabled'
        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="summary" value={summary}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дедлайн</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={due_date_selected} className="form-control"
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Планируемое время</label>
                    <input type="number" step="0.1" className="form-control" name="time_planned" value={time_planned}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <Select options={select_options} isMulti={false} name='status' isDisabled={disable} defaultValue={select_options[0]}
                            onChange={(values) => this.selectChanged('status', values)}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить
                </button>
            </form>
        </div>;
    }
}

export default TaskForm
