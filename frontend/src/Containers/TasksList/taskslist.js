import React, {Component} from 'react';

import TaskList from '../../Components/TaskList/tasklist'

class TasksList extends Component {
    colTitles = ['На очереди', "В работе", "Закончены"]
    state = {
        statuses: ['Queued', 'In work', 'Done']
    }

    render() {
        return (

            <div className="container">
                <div className="row ">
                    {this.colTitles.map((title, index) => {
                        return <div className='col-4 ' key={index}><TaskList title={title}
                                                                             status={this.state.statuses[index]}/></div>
                    })}
                </div>
            </div>

        );
    }
}

export default TasksList;