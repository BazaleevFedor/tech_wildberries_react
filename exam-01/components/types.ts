export const Priority = {
    MINOR: 'minor',
    NORMAL: 'normal',
    MAJOR: 'major',
} as const;

export const Status = {
    OPEN: 'open',
    IN_PROGRESS: 'in progress',
    CLOSE: 'close',
    DONE: 'done',
} as const;

export const Type = {
    TASK: 'task',
    BUG: 'bug',
} as const;

export const FilterType = {
    STATUS: 'status',
    TYPE: 'type',
    PRIORITY: 'priority',
    USER: 'user',
    NAME: 'name',
} as const;

export type Priority = typeof Priority[keyof typeof Priority];
export type Status = typeof Status[keyof typeof Status];
export type Type = typeof Type[keyof typeof Type];
export type FilterType = typeof FilterType[keyof typeof FilterType];

export type User = {
    id: string;
    name: string;
};

export type TaskInfo = {
    id: string;
    name: string;
    description: string;
    date: Date;
    type: Type;
    status: Status;
    priority: Priority;

    assignee?: User;
    place?: string;
    deadline?: Date;
}

export type BoardInfo = {
    id: string;
    name: string;
    tasks: TaskInfo[];
};

export type BoardsInfo = {
    boards: BoardInfo[];
    currentBoardId: string;
};

export const PopupType = {
    TASK: 'task',
    BOARD: 'board',
} as const;

export type PopupType = typeof PopupType[keyof typeof PopupType];

export type PopupStatus = {
    isOpen: boolean;
    type?: PopupType;
    task?: TaskInfo;
} | null;

export type BoardManager = {
    createTask: (newTask: TaskInfo) => void;
    deleteTask: (taskId: string) => void;
    updateTask: (updateTask: TaskInfo) => void;
    addBoard: (board: BoardInfo) => void;
    changeBoard: (boardId: string) => void;
    filterTasks: (tasks: TaskInfo[], filter: Filter) => TaskInfo[];
}

export type Filter = {
    type: FilterType;
    value: string;
}
