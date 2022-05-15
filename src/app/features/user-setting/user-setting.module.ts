import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { addUserReducer } from './state/add-user.reducer';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserGuard } from 'src/app/core/edit-user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddUserComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [EditUserGuard]
  }
]

@NgModule({
  declarations: [
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('add-user', addUserReducer)
  ]
})
export class UserSettingModule { }
