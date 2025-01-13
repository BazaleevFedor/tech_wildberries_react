import { BoardData } from '@/components/types';

const BOARDS_STORAGE_KEY = 'boards_storage_key';

export class Storage {
    // ToDo: условие про защиту от порчи данных
    getBoards(): BoardData[] {
        const boards = localStorage.getItem(BOARDS_STORAGE_KEY);

        if (!boards) return [];

        return JSON.parse(boards);
    }

    setBoards(boards: BoardData[]) {
        localStorage.setItem(BOARDS_STORAGE_KEY, JSON.stringify(boards));
    }
}