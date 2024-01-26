export const enum Role {
    student = "student",
    teacher = "teacher",
    headteacher = "headteacher",
    admin = "admin",
}

export interface IUserRole {
    id: number;
    name: Role;
    description: string;
}

export interface IUserSchool {
    uuid: string;
}

export interface DecodedToken {
    email: string;
    uuid: string;
    fullname?: string;
    roles: IUserRole[];
    school: IUserSchool;
}

export interface User extends DecodedToken {
    rolesName: Role[];
}