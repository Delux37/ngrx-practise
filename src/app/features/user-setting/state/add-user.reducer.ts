import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { NewUser } from "../model/add-user.state";
import * as AddUserActions from "./add-user.actions";

const initialStore: NewUser = {
    firstName: '',
    lastName: '',
    job: '',
    nickName: '',
    gender: '',
}

export const addUserReducer = createReducer<NewUser>(
    initialStore,

    on(AddUserActions.addUser, (state, actions): NewUser => {
        return {
            ...state,
            ...actions.user
        }
    }),
);

// Selectors
const getAddUserFeatureState = createFeatureSelector<NewUser>('add-user');

export const getNewUser = createSelector(
    getAddUserFeatureState,
    state => state
)