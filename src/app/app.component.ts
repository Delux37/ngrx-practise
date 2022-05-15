import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { State } from './features/home/models/user.model';
import { getActiveUser } from './features/home/state/home.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showEditing$ = this.store.select(getActiveUser)
    .pipe(map(user => !!user))

  constructor(
    private store: Store<State>
  ) {}
}
