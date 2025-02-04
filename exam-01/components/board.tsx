import React, { FunctionComponent } from 'react';
import { BoardColumn } from '@/components/boardColumn';
import { Status, BoardInfo, TaskInfo, PopupType } from '@/components/types';

interface BoardProps {
    data: BoardInfo;
    togglePopup: (type?: PopupType, task?: TaskInfo) => void;
}

export const Board: FunctionComponent<BoardProps> = ({ data, togglePopup }) => {
    return (
        <div className='board'>
            <div className='board__columns'>
                {
                    Object.values(Status).map((status, index) => (
                        <BoardColumn key={ index } name={ status } tasks={ data.tasks.filter(task => task.status === status) } togglePopup={ togglePopup }/>
                    ))
                }
            </div>
        </div>
    )
}
