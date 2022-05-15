// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UserListComponent } from './user-list/user-list.component';

import { StoreModule } from '@ngrx/store';
import { homeReducer } from './state/home.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './state/home.effects';

const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full',
    component: UserListComponent
  }
]

@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([HomeEffects]),
    StoreModule.forFeature('users', 
      homeReducer
    ),
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
