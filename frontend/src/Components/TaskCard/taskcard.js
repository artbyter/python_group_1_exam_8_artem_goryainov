import React from 'react';
import './taskcard.css'

function TaskCard(props) {

    const d=Date.parse(props.task.due_date)
    let ts=new Date(d)

    return (
        <div className="card border border-dark rounded-pill my-3">
            <div className="card-body">
                <h5 className="card-title">{props.task.summary}</h5>

                <div className="row">
                    <i className="col-2 far fa-arrow-alt-circle-left pt-2"></i>
                    <p className=" col-8 card-text">{props.task.description}</p>
                    <i className="col-2 far fa-arrow-alt-circle-right pt-2"></i>
                </div>

                <h6 className="card-subtitle mb-2 text-muted d-inline-block float-left ml-3">До: {ts.toLocaleDateString()}</h6>
                <h6 className="card-subtitle mb-2 text-muted d-inline-block float-right mr-3">Время: {props.task.time_planned}ч</h6>

            </div>
        </div>
    )
}

export default TaskCard