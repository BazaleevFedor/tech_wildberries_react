import React, { FunctionComponent } from 'react';
import { PopupType, TaskInfo } from '@/components/types';
import { Task } from '@/components/task';

interface BoardColumnProps {
    name: string;
    tasks: TaskInfo[];
    togglePopup: (type?: PopupType, task?: TaskInfo) => void;
}

export const BoardColumn: FunctionComponent<BoardColumnProps> = ({ name, tasks, togglePopup }) => {
    return (
        <div className='column'>
            <span className='column__name'>{ name }</span>
            <div className='column__tasks'>
                {
                    tasks.map((task, index) => (
                        <Task key={ index } task={ task } togglePopup={ togglePopup } />
                    ))
                }
            </div>
        </div>
    )
}
