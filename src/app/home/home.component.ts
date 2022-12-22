import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { ShareLibService } from 'share-lib';
import { CustomManifest, PluginOptions } from '../model/mf.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  options: PluginOptions[] = [];
  

  constructor(private readonly shareLib: ShareLibService) {}

  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();
    this.options = Object.values(manifest).filter(
      (v) => v.withInPage === true
    ) as PluginOptions[];

    
  }

  sendData() {
    this.shareLib.addName('test');
  }
}
