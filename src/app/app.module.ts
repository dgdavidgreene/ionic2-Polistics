import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Polistics } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CrudPage } from '../pages/crud/crud';
import { TabsPage } from '../pages/tabs/tabs';
import { BackandService } from '../providers/backandService';

@NgModule({
  declarations: [
    Polistics,
    LoginPage,
    SignupPage,
    CrudPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(Polistics)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Polistics,
    LoginPage,
    SignupPage,
    CrudPage,    
    TabsPage
  ],
  providers: [
    BackandService
  ]
})
export class AppModule {}
