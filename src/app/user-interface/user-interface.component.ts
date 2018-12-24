import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {
	form: FormGroup;
	displayChannelLimit: boolean = false;
	displayExtendedChannel: boolean = false;
	ChannelRanges = [
		[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165],
		[36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165],
		[36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161],
		[36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161]
	];
	rangeNumber: number;
	constructor(){
	}
	ngOnInit() {
	    this.form = new FormGroup({
	      ssid: new FormControl('', [
	      		Validators.required
	      	]),
	      password: new FormControl('', [
	      		Validators.required,
	      		Validators.minLength(8),
	      		Validators.maxLength(63)
	      	]),
	      ChannelBonding: new FormControl(),
	      ExtendedChannel: new FormControl(),
	      UseChannelLimit: new FormControl(),
	      ChannelLimit: new FormControl(),
	      submit: new FormControl('Применить')
	    });
	    this.changeDate();
	    this.form.valueChanges.subscribe((value) => this.checkCondition(value.ChannelBonding, value.ExtendedChannel));
	    this.form.valueChanges.subscribe((value) => this.displayChannel(value.UseChannelLimit));
	    // this.form.valueChanges.subscribe((value) => console.log(value));	    
	}
	onClick() {
		localStorage.setItem('formUserValue', JSON.stringify(this.form.value));
	}
	changeDate() {
		if (localStorage.getItem('formConfigValue')) {
			let formConfig = JSON.parse(localStorage.getItem('formConfigValue'));
			console.log(formConfig.setting[3]);
			this.form = new FormGroup({
		      ssid: new FormControl(formConfig.setting[0], [
		      		Validators.required
		      	]),
		      ChannelBonding: new FormControl(formConfig.setting[1]),
		      password: new FormControl(formConfig.setting[2], [
		      		Validators.required,
		      		Validators.minLength(8),
		      		Validators.maxLength(63)
		      	]),
		      ExtendedChannel: new FormControl(formConfig.setting[3]),
		      UseChannelLimit: new FormControl(formConfig.setting[4]),
		      ChannelLimit: new FormControl(formConfig.setting[5]),
		      submit: new FormControl('Применить')
		    });
		    formConfig.setting[3] = true ? this.displayExtendedChannel = true : this.displayExtendedChannel = false;
			this.displayChannelLimit = formConfig.setting[5];
	}	
}
	isControlInvalid(controlName: string): boolean {
		const control = this.form.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}		
	checkCondition(ChannelBonding, ExtendedChannel) {
		if ((ChannelBonding <= 10) || (ChannelBonding == 20 && ExtendedChannel)) {
			this.rangeNumber = 0;
		} else if (ChannelBonding == 20 && !ExtendedChannel) {
			this.rangeNumber = 1;
		} else if ((ChannelBonding == 40 && ExtendedChannel) || (ChannelBonding == 80 && ExtendedChannel)) {
			this.rangeNumber = 2;
		} else if ((ChannelBonding == 40 && !ExtendedChannel) || (ChannelBonding == 80 && !ExtendedChannel)) {
			this.rangeNumber = 3;
		}
		if(ChannelBonding <= 10) {
		this.displayExtendedChannel = false;
		} else if(ChannelBonding > 10) {
		this.displayExtendedChannel = true;
		} 			  	
	}
	displayChannel(UseChannelLimit) {
		if(!UseChannelLimit) {
		this.displayChannelLimit = false;
		} else if(UseChannelLimit) {
		this.displayChannelLimit = true;
		}
	}
}
