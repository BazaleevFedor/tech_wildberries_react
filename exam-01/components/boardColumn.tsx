import React, { FunctionComponent } from 'react';
import { TaskData } from '@/components/types';
import { Task } from '@/components/task';

interface BoardColumnProps {
    name: string;
    tasks: TaskData[];
}

export const BoardColumn: FunctionComponent<BoardColumnProps> = ({ name, tasks }) => {
    return (
        <div className='column'>
            <span className='column__name'>{ name }</span>
            <div className='column__tasks'>
                {
                    tasks.map((task, index) => (
                        <Task key={ index } task={ task } />
                    ))
                }
            </div>
        </div>
    )
}
