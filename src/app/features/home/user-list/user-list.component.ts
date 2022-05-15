import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../models/user.model';
import { getUserList } from '../state/home.reducer';
import * as HomeActions from '../state/home.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users$ = this.store.select(getUserList)   

  onEdit(id: string){
    this.store.dispatch(HomeActions.createActiveUser({id}))
    this.router.navigate(['settings/edit-user']);
  }
  
  onDelete(id: string){
    this.store.dispatch(HomeActions.deleteUser({id}))
  }

  ngOnInit(): void {
    this.store.dispatch(HomeActions.loadUsers());
  }

  constructor(
    private store: Store<State>,
    private router: Router,
  ) {}
}
