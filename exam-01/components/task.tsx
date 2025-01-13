import React, { FunctionComponent } from 'react';
import { TaskData } from '@/components/types';

interface TaskProps {
    task: TaskData;
}

export const Task: FunctionComponent<TaskProps> = ({ task }) => {
    return (
        <div className='task'>
            <span className='task__id'> { task.id }</span>
            <span className='task__name'>{ task.name }</span>
            <span className='task__priority'>{ task.priority }</span>
        </div>
    )
}
