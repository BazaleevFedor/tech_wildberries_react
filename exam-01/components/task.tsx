import React, { FunctionComponent } from 'react';
import { PopupType, TaskInfo, Type } from '@/components/types';
import classnames from 'classnames';

interface TaskProps {
    task: TaskInfo;
    togglePopup: (type?: PopupType, task?: TaskInfo) => void;
}

export const Task: FunctionComponent<TaskProps> = ({ task, togglePopup }) => {
    return (
        <div className='task' onClick={ () => togglePopup(Type.TASK, task) }>
            <span className='task__id'> { task.id.slice(0, 6) }</span>
            <span className='task__name'>{ task.name }</span>
            <span className={ classnames('task__priority', `task__priority--${task.priority}`) }>{ task.priority }</span>
        </div>
    )
}
