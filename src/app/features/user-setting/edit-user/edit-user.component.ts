import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import * as HomeActions from "../../home/state/home.actions";
import { User } from '../../home/models/user.model';
import { getActiveUser } from '../../home/state/home.reducer';
import { State } from '../model/add-user.state';
import { jobs } from '../shared/jobs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
  public editUserForm!: FormGroup;
  public jobs = jobs;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.editUserForm = this._formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nickName: ['', Validators.required],
      job: ['', Validators.required],
      gender: ['', Validators.required]
    })

    // Listen form valuechanges to update state
    this.editUserForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(val => this.store.dispatch(HomeActions.updateActiveUser({user: val})))

    this.store.select(getActiveUser)
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe(
      currentUser => {
        if(currentUser)
          this.editUserForm.setValue(currentUser, { emitEvent: false });
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSave(): void {
    if(this.editUserForm.valid) {
      const user: User = this.editUserForm.value
      this.store.dispatch(HomeActions.editUser({user}))
    }
  }
}
