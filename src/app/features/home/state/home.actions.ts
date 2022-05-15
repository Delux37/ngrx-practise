import { createAction, props } from "@ngrx/store";
import { NewUser } from "../../user-setting/model/add-user.state";
import { User } from "../models/user.model";

export const createActiveUser = createAction(
  '[Home] Creates active user',
  props<{ id: string }>()
)

export const removeActiveUser = createAction(
    '[Home] Removes active user'
)

export const updateActiveUser = createAction(
    '[Home] Saves active user',
    props< { user: User } >()
)


// C R U D

export const addUser = createAction(
    '[Home] Adds user in list',
     props<{ user: NewUser }>()
)

export const addUserSuccess = createAction(
    '[Home] Added user in list successful',
)

export const loadUsers = createAction(
    '[Home] Fetch users list'
)

export const loadUsersSuccess = createAction(
    '[Home] Users successfuly loaded',
    props< { users: User[] } >()
)

export const editUser = createAction(
    '[Home] Edits user in list with given id',
    props< { user: User } >()
)

export const editUserSuccess = createAction(
    '[Home] Edited user successfully',
    props< { user: User } >()
)

export const deleteUser = createAction(
    '[Home] Deletes user in list with given id',
    props< { id: string } >()
)

export const deletedSuccess = createAction(
    '[Home] Deletes user in list with given id',
    props< { id: string } >()
)
