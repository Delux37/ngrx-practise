import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, tap } from "rxjs";
import { State, User } from "../models/user.model";
import { UserService } from "../services/user.service";
import * as HomeActions from './home.actions';

const cache = new Map<string, User[]>();

@Injectable()
export class HomeEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store: Store<State>,
        private router: Router
    ) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HomeActions.loadUsers),
            mergeMap(_ => this.userService.fetchUsers().pipe(
                map(users => HomeActions.loadUsersSuccess({users}))
            ))
        )
    )

    deleteUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HomeActions.deleteUser),
            mergeMap((action) => this.userService.deleteUser(action.id)
                .pipe(
                    tap(
                        _ => HomeActions.deletedSuccess({ id: action.id })
                    ),
                )
            )
        )
    })

    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HomeActions.addUser),
            mergeMap((action) => this.userService.addUser(action.user)
                .pipe(
                    map(
                        _ =>  HomeActions.addUserSuccess()
                    )
                )
            )
        )
    })

    editUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HomeActions.editUser),
            mergeMap(({ user }) => this.userService.editUser(user)
                .pipe(
                    map(
                        _ => { 
                            this.store.dispatch(HomeActions.removeActiveUser());
                            this.router.navigate(['/']);
                            return HomeActions.editUserSuccess({user})
                         }
                    )
                )
            )
        )
    })
}