import React, { FunctionComponent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BoardInfo, BoardManager } from '@/components/types';

interface PopupBoardProps {
    boardManager: BoardManager,
    togglePopup: () => void,
}

export const PopupBoard: FunctionComponent<PopupBoardProps> = ({ boardManager, togglePopup }) => {
    const [popupData, setPopupData] = useState<BoardInfo>({
        id: '',
        name: '',
        tasks: [],
    });

    const handleInputChange = (field: keyof BoardInfo, value: string) => {
        setPopupData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const onButtonClick = () => {
        boardManager.addBoard({
            id: uuidv4(),
            name: popupData.name,
            tasks: [],
        });
    };

    return (
        <div className='popup-background' onClick={ togglePopup }>
            <div className='popup' onClick={(e) => e.stopPropagation()}>
                {
                    <label className='popup__label'>
                        <span className='popup__text'>name</span>
                        <input className='popup__input' onChange={(e) => handleInputChange('name', e.target.value)}/>
                    </label>
                }

                <button className='popup__btn' onClick={onButtonClick}>
                    create board
                </button>
            </div>
        </div>
    )
}