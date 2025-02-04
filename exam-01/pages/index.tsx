import { Board } from '@/components/board';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { BoardInfo, Filter, PopupStatus, PopupType, TaskInfo } from '@/components/types';
import { createPortal } from 'react-dom';
import { PopupTask } from '@/components/popupTask';
import { PopupBoard } from '@/components/popupBoard';
import classnames from 'classnames';
import { useBoardManager } from './boardManager';

export default function Home() {
    const [boardListStatus, setBoardListStatus] = useState(false);
    const [popupStatus, setPopupStatus] = useState<PopupStatus>(null);

    const [filter, setFilter] = useState<Filter>();

    const { boardsInfo, boardManager } = useBoardManager();

    const togglePopup = useCallback((type?: PopupType, task?: TaskInfo) => {
        setPopupStatus((prevState) => {
            if (prevState?.isOpen || !type) {
                return { isOpen: false };
            }

            if (!task) {
                return { type, isOpen: true };
            }

            return { type: PopupType.TASK, isOpen: true, task };
        });
    }, []);

    const openBoardList = useCallback(() => {
        setBoardListStatus(prevState => !prevState);
    }, []);

    const changeFilterString = useCallback((filterString: string) => {
        const string = filterString.trim().toLowerCase();

        if (!string) setFilter(undefined);
        else if (string.at(0) === '#') setFilter({ type: 'type', value: string.slice(1) });
        else if (string.at(0) === '@') setFilter({ type: 'priority', value: string.slice(1) });
        else setFilter({ type: 'name', value: string });
    }, []);

    const boardOriginal = boardsInfo.boards.find(board => board.id === boardsInfo.currentBoardId);
    const board: BoardInfo | undefined = boardOriginal ? {
        id: boardOriginal.id,
        name: boardOriginal.name,
        tasks: [...boardOriginal.tasks],
    } : undefined;

    if (board?.tasks && filter) board.tasks = boardManager.filterTasks(board.tasks, filter);

    return (
        <>
            { popupStatus?.isOpen &&
                <>
                    { popupStatus.type === PopupType.TASK && createPortal(<PopupTask boardManager={ boardManager } togglePopup={ togglePopup } task={ popupStatus.task } />, document.body)}
                    { popupStatus.type === PopupType.BOARD && createPortal(<PopupBoard boardManager={ boardManager } togglePopup={ togglePopup } />, document.body)}
                </>
            }
            <div>
                <div className='footer'>
                    <Image src='/logo.svg' alt='' className='footer__logo' width='50' height='50'></Image>

                    <h1 className='footer__title'>MyTrack</h1>

                    <button className={ classnames('footer__create-task-btn', `${!board ? 'disabled' : ''}`) } disabled={!board} onClick={() => togglePopup(PopupType.TASK)}>create task</button>
                    <button className='footer__create-board-btn' onClick={() => togglePopup(PopupType.BOARD)}>create board</button>
                </div>

                <div className='search'>
                    <button className='search__board-list-btn' onClick={openBoardList}>
                        <span className='board-list-btn__text' title={ board ? board.name : 'You need create board' }>{ board ? board.name : 'You need create board' }</span>
                        { boardsInfo?.boards.length > 1 && <Image src='/ring.svg' alt='' className='search__ring' width='16' height='16'></Image> }

                        {  boardsInfo?.boards.length > 1 && boardListStatus &&
                            <div className='search__board-list'>
                                {
                                    Object.values(boardsInfo.boards).map(board => (
                                        board.id !== boardsInfo.currentBoardId &&
                                        <div className='board-list__item' onClick={ () => boardManager.changeBoard(board.id) }> { board.name } </div>
                                    ))
                                }
                            </div>
                        }
                    </button>

                    <input className='search__input' placeholder='ipput task name to filter or type (#bug) or priority (@minor)' onChange={ e => changeFilterString(e.target.value) }/>

                    <button className='search__btn'>
                        <Image src='/search.svg' alt='' className='search__ring' width='16' height='16'></Image>
                    </button>
                </div>

                <div>{board && <Board data={ board } togglePopup={ togglePopup }/>}</div>
            </div>
        </>
    );
}

