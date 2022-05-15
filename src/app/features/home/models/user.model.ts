import * as AppState from '../../../state/app.state';

export interface User {
    id: string;
    firstName: string;
    lastName: string
    nickName: string;
    job: string;
    gender: string;
}

export interface UserState {
    userList: User[]
    activeUser: null | User
}

export interface State extends AppState.State {
    users: UserState
}
