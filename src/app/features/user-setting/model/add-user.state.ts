import * as AppState from '../../../state/app.state';

export interface NewUser {
    firstName: string;
    lastName: string;
    nickName: string;
    gender: string;
    job: string;
}

export interface State extends AppState.State {
    'add-user': NewUser
}
