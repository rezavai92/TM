import { Component, OnInit } from '@angular/core';
import { AppointmentStatusList, AppointmentTypeList } from '../../constants/appointment.constants';

@Component({
  selector: 'app-appointments-search-filter',
  templateUrl: './appointments-search-filter.component.html',
  styleUrls: ['./appointments-search-filter.component.scss']
})
export class AppointmentsSearchFilterComponent implements OnInit {

  constructor() { }
  typeList = [...AppointmentTypeList];
  statusList = [...AppointmentStatusList]
  ngOnInit(): void {
  }

}
