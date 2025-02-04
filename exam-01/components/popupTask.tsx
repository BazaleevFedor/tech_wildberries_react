import React, { FunctionComponent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BoardManager, Priority, Status, TaskInfo, Type, User } from '@/components/types';
import Image from 'next/image';
import { myStorage } from '@/pages/storage';

interface PopupTaskProps {
    task?: TaskInfo,
    boardManager: BoardManager,
    togglePopup: () => void,
}

export const PopupTask: FunctionComponent<PopupTaskProps> = ({ task, boardManager, togglePopup }) => {
    const [popupData, setPopupData] = useState<TaskInfo>({
        id: task?.id || uuidv4(),
        name: task?.name || '',
        description: task?.description || '',
        date: task?.date || new Date(),
        type: task?.type || Type.TASK,
        status: task?.status || Status.OPEN,
        priority: task?.priority || Priority.NORMAL,
        assignee: task?.assignee,
        place: task?.place || '',
        deadline: task?.deadline,
    });

    useEffect(() => {
        if (task) {
            setPopupData(task);
        }
    }, [task]);

    const handleInputChange = (field: keyof TaskInfo, value: string) => {
        setPopupData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSelectChange = (field: keyof TaskInfo, value: string) => {
        setPopupData((prev) => ({
            ...prev,
            [field]: value as any,
        }));
    };

    const handleSelectAssignee = (id: string) => {
        setPopupData((prev) => ({
            ...prev,
            assignee: myStorage.getUsers().find(user => user.id === id),
        }));
    }

    const onButtonClick = () => {
        if (task) {
            boardManager.updateTask(popupData);
        } else {
            boardManager.createTask(popupData);
        }

        togglePopup();
    };

    const onDeleteClick = () => {
        if (task) {
            boardManager.deleteTask(task.id);
        }

        togglePopup();
    };

    return (
        <div className='popup-background' onClick={ togglePopup }>
            <div className='popup' onClick={ (e) => e.stopPropagation() }>
                {
                    <>
                        <label className='popup__label'>
                            <span className='popup__text'>name</span>
                            <input className='popup__input' value={popupData?.name || ''} onChange={(e) => handleInputChange('name', e.target.value)}/>
                        </label>
                        <label className='popup__label'>
                            <span className='popup__text'>description</span>
                            <input className='popup__input' value={popupData?.description || ''} onChange={(e) => handleInputChange('description', e.target.value)}/>
                        </label>
                        <label className='popup__label'>
                            <span className='popup__text'>deadline</span>
                            <input className='popup__input' value={popupData?.deadline?.toString() || ''} onChange={(e) => handleInputChange('deadline', e.target.value)}/>
                        </label>
                        <label className='popup__label'>
                            <span className='popup__text'>place</span>
                            <input className='popup__input' value={popupData?.place || ''} onChange={(e) => handleInputChange('place', e.target.value)}/>
                        </label>
                    </>
                }

                {
                    <>
                        <label className='popup__label'>
                            <span className='popup__text'>type</span>
                            <select className='popup__select' value={ popupData.type } onChange={(e) => handleSelectChange('type', e.target.value)}>
                                {
                                    Object.values(Type).map((title: string) => (
                                        <option value={ title }>{ title }</option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className='popup__label'>
                            <span className='popup__text'>status</span>
                            <select className='popup__select' value={ popupData.status } onChange={(e) => handleSelectChange('status', e.target.value)}>
                                {
                                    Object.values(Status).map((title: string) => (
                                        <option value={ title }>{ title }</option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className='popup__label'>
                            <span className='popup__text'>priority</span>
                            <select className='popup__select' value={ popupData.priority } onChange={(e) => handleSelectChange('priority', e.target.value)}>
                                {
                                    Object.values(Priority).map((title: string) => (
                                        <option value={ title }>{ title }</option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className='popup__label'>
                            <span className='popup__text'>assignee</span>
                            <select className="popup__select" value={popupData.assignee?.id || 'none'} onChange={(e) => handleSelectAssignee(e.target.value) }>
                                {
                                    myStorage.getUsers().map((user: User) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                        </label>
                    </>
                }

                <button className='popup__btn-create' onClick={ onButtonClick }>
                    { task ? 'save task' : 'create task' }
                </button>

                <button className='popup__btn-trash' onClick={ onDeleteClick }>
                    <Image src='/trash.svg' alt='' className='popup__trush' width='26' height='26'></Image>
                </button>
            </div>
        </div>
    )
}