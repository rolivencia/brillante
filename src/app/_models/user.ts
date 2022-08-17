export class User {
    get welcomeName(): string {
        return `${this.avatar} ${this.firstName} ${this.lastName}`;
    }

    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    token: string;
    avatar: string;
    roles: Role[];
    email: string;
    hasFinishedRegistration: boolean;

    constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }
}

export class Role {
    id: number;
    description: string;
}
