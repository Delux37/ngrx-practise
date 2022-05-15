import { createAction, props } from "@ngrx/store";
import { NewUser } from "../model/add-user.state";

export const addUser = createAction(
    '[add-user] Updates add-user state',
     props<{ user: NewUser }>()
    )