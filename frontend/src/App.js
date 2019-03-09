import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import TasksList from './Containers/TasksList/taskslist'
import TaskDetails from './Containers/TaskDetails/taskdetails'
import TaskAdd from './Containers/TaskAdd/taskadd'




class App extends Component {


    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/tasks/add" component={TaskAdd}/>
                        {/*/!* :id обозначает переменную id *!/*/}
                        <Route path="/tasks/:id" component={TaskDetails}/>
                        <Route path="/" component={TasksList}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
