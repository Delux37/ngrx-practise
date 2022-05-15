import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'
import { UserListComponent } from './features/home/user-list/user-list.component';
import { HomeModule } from './features/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home', 
    component: UserListComponent
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/user-setting/user-setting.module').then(m => m.UserSettingModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    RouterModule.forRoot(routes),
    StoreDevtoolsModule.instrument({
      name: 'NGRX Demo devtool',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
