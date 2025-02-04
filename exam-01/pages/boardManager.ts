import { useState, useEffect, useCallback } from "react";
import { TaskInfo, BoardsInfo, BoardInfo, Filter } from '@/components/types';
import { myStorage } from "@/pages/storage";

export const useBoardManager = () => {
    const [boardsInfo, setBoardInfo] = useState<BoardsInfo>({ boards: [], currentBoardId: 'init' });

    useEffect(() => {
        setBoardInfo(myStorage.getBoards());
    }, []);

    useEffect(() => {
        myStorage.setBoards(boardsInfo);
    }, [boardsInfo]);

    const createTask = useCallback((newTask: TaskInfo) => {
        setBoardInfo((prevState) => {
            const newBoards = prevState.boards.map((board) => {
                if (board.id === prevState.currentBoardId) {
                    return { ...board, tasks: [...board.tasks, newTask] };
                }

                return board;
            });

            return { ...prevState, boards: newBoards };
        });
    }, []);

    const updateTask = useCallback((updateTask: TaskInfo) => {
        setBoardInfo((prevState) => {
            const newBoards = prevState.boards.map((board) => {
                if (board.id === prevState.currentBoardId) {
                    return { ...board, tasks: board.tasks.map((task) => (task.id === updateTask.id ? updateTask : task)) };
                }

                return board;
            });

            return { ...prevState, boards: newBoards };
        });
    }, []);

    const deleteTask = useCallback((taskId: string) => {
        setBoardInfo((prevState) => ({
            ...prevState,
            boards: prevState.boards.map((board) =>
                board.id === prevState.currentBoardId
                    ? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
                    : board
            ),
        }));
    }, []);

    const addBoard = useCallback((board: BoardInfo) => {
        setBoardInfo(prevState => ({
            boards: [...prevState.boards, board],
            currentBoardId: board.id,
        }));
    }, []);

    const changeBoard = useCallback((boardId: string) => {
        setBoardInfo(prevState => {
            prevState.currentBoardId = boardId;

            return prevState;
        });
    }, []);

    const filterTasks = useCallback((tasks: TaskInfo[], filter: Filter): TaskInfo[] => {
        switch (filter.type) {
            case 'name': return tasks.filter(task => task.name.includes(filter.value));
            case 'type': return tasks.filter(task => task.type === filter.value);
            case 'priority': return tasks.filter(task => task.priority === filter.value);
            default: return [];
        }
    }, []);

    return { boardsInfo, boardManager: { createTask, deleteTask, updateTask, addBoard, changeBoard, filterTasks } };
};
