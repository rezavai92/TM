import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
	AppointmentStatusList,
	AppointmentTypeList,
} from '../../constants/appointment.constants';
import { IAppointmentSearchFilter } from '../../interfaces/appointment.interface';

@Component({
	selector: 'app-appointments-search-filter',
	templateUrl: './appointments-search-filter.component.html',
	styleUrls: ['./appointments-search-filter.component.scss'],
})
export class AppointmentsSearchFilterComponent implements OnInit,OnChanges {

	@Input() searchFilter!: IAppointmentSearchFilter;
	@Output() close: EventEmitter<boolean> = new EventEmitter();
	@Output() apply: EventEmitter<IAppointmentSearchFilter> = new EventEmitter();
	filterForm!: FormGroup;
	constructor(private fb : FormBuilder) {}
	
	typeList = [...AppointmentTypeList];
	statusList = [...AppointmentStatusList];


	ngOnChanges(changes: SimpleChanges): void {
		
		if (changes && changes['searchFilter'] && changes['searchFilter'].currentValue) {
			console.log("changes", changes);
			this.initForm();
		}
	}


	ngOnInit(): void { 
		this.initForm();
	}

	


	initForm() {
		this.filterForm = this.fb.group({
			AppointmentType: [this.searchFilter  ? this.searchFilter.AppointmentType : ''],
			AppointmentStatus  : [this.searchFilter ? this.searchFilter.AppointmentStatus : '']
		})
	}

	get FormControls() {
		return this.filterForm.controls;
	}

	hasError(control: AbstractControl) {
		//	console.log(control.errors, control.touched);
		return control.errors && control.touched;
	}
	
	onApply() {
		const filterObject = this.constructFilterObject();
		this.apply.emit(filterObject);
	}

	onClose() {
		this.close.emit(true);
	}

	onClearAll() {
		this.resetForm();
	}

	clearDropdown(formControlName: string) {
		this.FormControls[formControlName].reset();
	}

	constructFilterObject() {
		const formValue: IAppointmentSearchFilter = this.filterForm.getRawValue();
		return formValue;
	}

	resetForm() {
		this.filterForm.reset();
	}
}
