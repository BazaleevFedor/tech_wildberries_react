import { BoardsInfo, User } from '@/components/types';

const BOARDS_STORAGE_KEY = 'boards_storage_key';
const BACKUP_BOARDS_STORAGE_KEY  = 'boards_storage_backup';
const USERS_STORAGE_KEY = 'users_storage_key';

class MyStorage {
    getBoards(): BoardsInfo {
        const boardsData = localStorage.getItem(BOARDS_STORAGE_KEY);

        try {
            if (!boardsData) throw new Error('No data found');

            const parsedData: BoardsInfo = JSON.parse(boardsData);

            if (!this.isValidBoardsInfo(parsedData)) throw new Error('Invalid data format');

            return parsedData;
        } catch (error) {
            const backupData = localStorage.getItem(BACKUP_BOARDS_STORAGE_KEY);
            if (backupData) {
                try {
                    const parsedBackup: BoardsInfo = JSON.parse(backupData);
                    if (this.isValidBoardsInfo(parsedBackup)) {
                        return parsedBackup;
                    }
                } catch {
                    console.warn('Backup data is also corrupted.');
                }
            }

            return {
                boards: [],
                currentBoardId: '',
            };
        }
    }

    setBoards(boards: BoardsInfo) {
        if (boards.currentBoardId === 'init') return;

        try {
            const currentData = localStorage.getItem(BOARDS_STORAGE_KEY);
            if (currentData) {
                localStorage.setItem(BACKUP_BOARDS_STORAGE_KEY, currentData);
            }

            localStorage.setItem(BOARDS_STORAGE_KEY, JSON.stringify(boards));
        } catch (error) {
            console.error('Error saving boards to localStorage:', error);
        }
    }

    getUsers(): User[] {
        return [{ id: 'none', name: 'none' }, { id: 'qwerty', name: 'Fedor Bazaleev' }, { id: 'asdfgh', name: 'Vitaliy Masich' }, { id: 'zxcvbn', name: 'Elena Lezina' } ];
    }

    private isValidBoardsInfo(data: any): data is BoardsInfo {
        return data && typeof data === 'object' && Array.isArray(data.boards) && typeof data.currentBoardId === 'string';
    }
}

export const myStorage = new MyStorage();
