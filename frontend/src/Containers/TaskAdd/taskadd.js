import React, {Component} from 'react';
import TaskForm from '../../Components/TaskForm/taskform'


function TaskAdd(props) {

   return <TaskForm props={props} edit={false}/>

}

export default TaskAdd