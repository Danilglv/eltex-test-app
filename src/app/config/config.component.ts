import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  listControls: FormGroup;
  typeSetting = [
    'SSID', 
    'ChannelBonding', 
    'WPAKey', 
    'ExtendedChannel', 
    'UseChannelLimit', 
    'ChannelLimit',
  ];
  ngOnInit() {
    this.listControls = new FormGroup({
        setting: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
      ])
      });

    this.changeDate();
    this.listControls.valueChanges.subscribe((value) => localStorage.setItem('formConfigValue', JSON.stringify(value)));
  }
  changeDate() {
    if (localStorage.getItem('formUserValue')) {
      let formUser = JSON.parse(localStorage.getItem('formUserValue'));
      this.listControls = new FormGroup({
        setting: new FormArray([
        new FormControl(formUser.ssid),
        new FormControl(formUser.ChannelBonding),
        new FormControl(formUser.password),
        new FormControl(formUser.ExtendedChannel),
        new FormControl(formUser.UseChannelLimit),
        new FormControl(formUser.ChannelLimit),
      ])
      });
    }
  }

}
