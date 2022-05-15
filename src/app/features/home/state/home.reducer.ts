import * as HomeActions from './home.actions';
import { createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { UserState } from '../models/user.model';

const store: UserState = {
    userList: [],
    activeUser: null
}
export const homeReducer = createReducer<UserState>(
    store,

    on(HomeActions.createActiveUser, (state, action): UserState => {
        const user = state.userList.find(user => user.id === action.id) || null;
        
        return {
            ...state,
            activeUser: user,
        }
    }),

    on(HomeActions.updateActiveUser, (state, action): UserState => {
        console.log(action.user);
        return {
            ...state,
            activeUser: action.user
        }
    }),

    on(HomeActions.removeActiveUser, (state): UserState => {
        return {
            ...state,
            activeUser: null
        }
    }),

    on(HomeActions.loadUsersSuccess, (state, action): UserState => {
        return {
            ...state,
            userList: action.users
        }
    }),

    on(HomeActions.deletedSuccess, (state, action): UserState => {
        const newList = [...state.userList]
        const index = newList.findIndex(user => user.id === action.id);
        newList.splice(index,1);
        return {
            ...state,
            userList: newList
        }
    }),

    on(HomeActions.editUserSuccess, (state, action): UserState => {
        const userList = state.userList.map(
            user => {
                if(user.id === action.user.id){
                    return action.user;
                }
                return user;
            }
        );
        
        
        return {
            ...state,
            userList
        }
    })
);

// Selectors
const getHomeFeatureState = createFeatureSelector<UserState>('users');

export const getUserList = createSelector(
    getHomeFeatureState,
    state => state.userList
)

export const getActiveUser = createSelector(
    getHomeFeatureState,
    state => state.activeUser
)