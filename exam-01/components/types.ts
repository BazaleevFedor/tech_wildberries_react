export const Priority = {
    MINOR: 'Minor',
    NORMAL: 'Normal',
    MAJOR: 'Major',
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

export type Priority = typeof Priority[keyof typeof Priority];
export type Status = typeof Status[keyof typeof Status];
export type Type = typeof Type[keyof typeof Type];

export type User = {
    id: string;
    name: string;
};

export type TaskData = {
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

export type BoardData = {
    id: string;
    name: string;
    tasks: TaskData[];
};
