import React, { FunctionComponent } from 'react';
import { BoardColumn } from '@/components/boardColumn';
import { Priority, TaskData, Type, Status } from '@/components/types';

interface BoardProps {
    name: string;
    tasks: TaskData[];
}

export const Board: FunctionComponent<BoardProps> = ({ name, tasks }) => {
    const addTask = (name: string, type: Type, status: Status, description: string, priority: Priority) => {
        const newTask: TaskData = {
            id: `T-${tasks.length}`,
            name,
            type,
            status,
            description,
            date: new Date(),
            priority,
        }
    };

    return (
        <div className='board'>
            <span className='board__name'>{ name }</span>
            <div className='board__columns'>
                {
                    Object.values(Status).map((status, index) => (
                        <BoardColumn key={ index } name={ status } tasks={ tasks.filter(task => task.status === status) }/>
                    ))
                }
            </div>
        </div>
    )
}
