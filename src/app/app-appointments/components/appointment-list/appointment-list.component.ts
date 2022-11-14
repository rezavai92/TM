import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import {
	IPaginationConfig,
	ITableColumn,
} from '../../../shared/modules/generic-table/interfaces/table.interface';

@Component({
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
	tableData: any[]=[];
	tableColumns: ITableColumn[]=[];
	loading = true;
	paginationConfig!: IPaginationConfig;
	currentPageNumber = 0;
	@ViewChild('patientNameTemplate', { static: true }) patientNameTemplate: TemplateRef<any>| undefined ;
	@ViewChild('requestTypeTemplate',{static : true}) requestTypeTemplate: TemplateRef<any> | undefined ;
	@ViewChild('serviceStartDateTemplate',{static : true}) serviceStartDateTemplate: TemplateRef<any> | undefined;
	@ViewChild('serviceEndDateTemplate',{static : true}) serviceEndDateTemplate: TemplateRef<any>| undefined
	@ViewChild('serviceStatusTemplate',{static : true}) serviceStatusTemplate: TemplateRef<any>|  undefined
 
	constructor() {}

	ngOnInit(): void {
		this.loadAppointmentListData();
	}

	setTableConfig(
		data: any[],
		columns: ITableColumn[],
		pagination: IPaginationConfig
	) {
		this.setTableData(data);
		this.setTableColumns(columns);
		this.setPaginationConfig(pagination);
	}

	setPaginationConfig(config: IPaginationConfig) {
		this.paginationConfig = { ...config };
	}

	setTableData(data: any[]) {
		this.tableData = [...data];
	}

	setTableColumns(columns: ITableColumn[]) {
		this.tableColumns = [...columns];
	}

	onFetchTableData(pageIndex: number) {
		this.currentPageNumber = pageIndex;
		this.loadAppointmentListData();
	}

	loadAppointmentListData() {
		setTimeout(() => {
			const data = [
				{
					PatientName: 'W.B Bush',
					RequestType: 'online',
					ServiceStartDate: new Date(),
					ServiceEndDate: new Date(),
					ServiceStatus: 'pending',
				},

				{
					PatientName: 'W.B Bush',
					RequestType: 'online',
					ServiceStartDate: new Date(),
					ServiceEndDate: new Date(),
					ServiceStatus: 'pending',
				},
				{
					PatientName: 'W.B Bush',
					RequestType: 'online',
					ServiceStartDate: new Date(),
					ServiceEndDate: new Date(),
					ServiceStatus: 'pending',
				},
				{
					PatientName: 'W.B Bush',
					RequestType: 'online',
					ServiceStartDate: new Date(),
					ServiceEndDate: new Date(),
					ServiceStatus: 'pending',
				},
				{
					PatientName: 'W.B Bush',
					RequestType: 'online',
					ServiceStartDate: new Date(),
					ServiceEndDate: new Date(),
					ServiceStatus: 'pending',
				},
				{
					PatientName: 'W.B Bush',
					RequestType: 'online',
					ServiceStartDate: new Date(),
					ServiceEndDate: new Date(),
					ServiceStatus: 'pending',
				},
			];

			const columns : ITableColumn[] = [
				{
					key: 'PATIENT_NAME',
					name: 'PatientName',
					cellTemplate : this.patientNameTemplate
					
				},

				{
					key: 'REQUEST_TYPE',
					name: 'RequestType',
					cellTemplate : this.requestTypeTemplate
				},
				{
					key: 'SERVICE_START_DATE',
					name: 'ServiceStartDate',
					cellTemplate : this.serviceStartDateTemplate
				},
				{
					key: 'SERVICE_END_DATE',
					name: 'ServiceEndDate',
					cellTemplate : this.serviceEndDateTemplate
				},
				{
					key: 'SERVICE_STATUS',
					name: 'ServiceStatus',
					cellTemplate : this.serviceStatusTemplate
				},
			];
			const pagination: IPaginationConfig = {
				length: 100,
				pageSize: 10,
				pageSizeOptions: [5, 10, 15, 20],
			};
			this.setTableConfig(data, columns, pagination);
			this.loading = false;
		}, 2000);
	}
}
