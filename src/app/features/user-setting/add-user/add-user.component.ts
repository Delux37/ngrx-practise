import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, skip, startWith, Subject, take, takeUntil } from 'rxjs';
import { User } from '../../home/models/user.model';
import { NewUser, State } from '../model/add-user.state';
import * as HomeActions from '../../home/state/home.actions'
import * as AddUserActions from '../state/add-user.actions'
import { getNewUser } from '../state/add-user.reducer';
import { jobs } from '../shared/jobs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit, OnDestroy {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  jobs = jobs;

  private $errors = new BehaviorSubject<string[]>([]);
  private destroyed$ = new Subject<boolean>();
  errors$ = this.$errors.asObservable();

  currentUser$ = this.store.select(getNewUser)
    .pipe(
      map(user => {
        return [
          { key: 'firstName', value: user.firstName },
          { key: 'lastName', value: user.lastName },
          { key: 'job', value: user.job },
          { key: 'gender', value: user.gender },
          { key: 'nickName', value: user.nickName },
        ]
      })
    );

  onSubmit(): void {
    const user: User = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }

    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.store.dispatch(
        HomeActions.addUser({ user })
      )
  
      this.store.dispatch(
        AddUserActions.addUser({ 
          user: { 
            firstName: '',
            lastName: '',
            nickName: '',
            job: '',
            gender: ''
           }
         })
         )
      this.$errors.next([]);
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      return;
    }

    const errorsArr: string[] = [];

    const firstKeys = [
      'firstName',
      'lastName',

    ]
    const secondKeys = [
      'job',
      'gender',
      'nickName'
    ]

    firstKeys.forEach(key => {
      const control = this.firstFormGroup.get(key)
      if(control?.errors?.hasOwnProperty('required'))
        errorsArr.push(`${key} field is required`)
    })

    secondKeys.forEach(key => {
      const control = this.secondFormGroup.get(key)
      if(control?.errors?.hasOwnProperty('required'))
        errorsArr.push(`${key} field is required`)
    })

    this.$errors.next(errorsArr);

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      nickName: ['', Validators.required],
      job: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.store
      .select('add-user')
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(state => {
        const { firstName, lastName, job, gender, nickName } = state;
        this.firstFormGroup.setValue({ firstName, lastName }, { emitEvent: false});
        this.secondFormGroup.setValue({ job, gender, nickName }, { emitEvent: false });
      })

    // Listen form value changes and update state
    const form = combineLatest(
      this.firstFormGroup.valueChanges
      .pipe(startWith({ firstName: '', lastName: '' })),
      this.secondFormGroup.valueChanges
      .pipe(startWith({ nickName: '', job: '', gender: '' }))
    )
    .pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroyed$),
      map(([firtStep, secondStep]) => {
        return { ...firtStep, ...secondStep }
      })
    )
    .subscribe(
      (user: NewUser) => 
        this.store.dispatch(AddUserActions.addUser({ user }))
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<State>
    ) {}
}
