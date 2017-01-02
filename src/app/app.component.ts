import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Title }     from '@angular/platform-browser';
import {BackandService} from '../providers/backandService'


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class Polistics {
  rootPage = TabsPage;

  constructor(
    platform: Platform, 
    private backandService:BackandService,
    private titleService: Title
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      backandService.setIsMobile(platform.is('mobile'));
      backandService.setAppName('polistics');
      backandService.setSignUpToken('9f30637f-3383-417b-9525-880fb3b37fbb');
      backandService.setAnonymousToken('04742838-b51e-4af6-afa1-c30cdb116c16');
      this.setTitle("Polistics");
    });
  }
  
  public setTitle( newTitle: string) {
      this.titleService.setTitle( newTitle );
  };
}
