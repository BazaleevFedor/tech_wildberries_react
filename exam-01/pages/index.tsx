import { Board } from '@/components/board';
import Image from 'next/image';

export default function Home() {
    const currentBoard = {
        name: 'test board',
    };

    return (
        <div>
            <div className='footer'>
                <Image src='/logo.svg' alt='' className='footer__logo' width='50' height='50'></Image>

                <h1 className='footer__title'>MyTrack</h1>

                <button className='footer__create-task-btn'>create task</button>
                <button className='footer__create-board-btn'>create board</button>
            </div>

            <div className='search'>
                <button className='search__board-list-btn'>
                    { currentBoard.name }
                    <Image src='/ring.svg' alt='' className='search__ring' width='16' height='16'></Image>
                </button>

                <input className='search__input' placeholder='Filter cards on the board'/>

                <button className='search__btn'>
                    <Image src='/search.svg' alt='' className='search__ring' width='16' height='16'></Image>
                </button>
            </div>

            <Board name='test' tasks={ [] }/>
        </div>
    );
}

