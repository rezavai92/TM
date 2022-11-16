import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
	ElementRef,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, take } from 'rxjs';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import {
	IPaginationConfig,
	ITableColumn,
} from '../../../shared/modules/generic-table/interfaces/table.interface';
import {
	AppointmentResponseData,
	IAppointmentSearchFilter,
	IFetchAppointmentPayload,
} from '../../interfaces/appointment.interface';
import { AppointmentService } from '../../services/appointment.service';
import { numberRegexString } from 'src/app/shared/shared-data/constants';
import { PageEvent } from '@angular/material/paginator';
import { debounce } from 'lodash';

@Component({
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
	tableData: any[] = [];
	tableColumns: ITableColumn[] = [];
	loading = false;
	paginationConfig!: IPaginationConfig;
	currentPageNumber = 0;
	pageSize = 10;
	filterOpen = false;
	searchKey = '';
	currentFilterObject!: IAppointmentSearchFilter;
	@ViewChild('applicantDisplayNameTemplate', { static: true })
	applicantDisplayNameTemplate: TemplateRef<any> | undefined;
	@ViewChild('serviceTypeTemplate', { static: true }) serviceTypeTemplate:
		| TemplateRef<any>
		| undefined;
	@ViewChild('serviceStartDateTemplate', { static: true })
	serviceStartDateTemplate: TemplateRef<any> | undefined;
	@ViewChild('serviceEndDateTemplate', { static: true })
	serviceEndDateTemplate: TemplateRef<any> | undefined;
	@ViewChild('serviceStatusTemplate', { static: true })
	serviceStatusTemplate: TemplateRef<any> | undefined;
	@ViewChild('searchInput', { static: true })
	searchInputTemplate: ElementRef | undefined;

	constructor(
		private appointmentService: AppointmentService,
		private customToastService: CustomToastService
	) {}

	ngOnInit(): void {
		fromEvent(this.searchInputTemplate?.nativeElement, 'keyup')
			.pipe(
				map((event: any) => {
					return event.target.value;
				}),
				debounceTime(1500),
				distinctUntilChanged()
			)
			.subscribe((key) => {
				this.resetCurrentPageNumber();
				this.searchKey = key;
				this.loadAppointmentListData();
			});

		this.loadAppointmentListData();
	}

	setTableConfig(data: AppointmentResponseData[]) {
		this.setTableData(data);
	}

	setPaginationConfig(
		total: number,
		pageSize: number,
		pageSizeOptions?: number[]
	) {
		const pagination: IPaginationConfig = {
			length: total,
			pageSize: pageSize,
			pageSizeOptions: [5, 10, 15, 20],
			pageIndex : this.currentPageNumber
		};
		this.paginationConfig = { ...pagination };
	}

	setTableData(data: any[]) {
		this.tableData = [...data];
	}

	setTableColumns() {
		const columns: ITableColumn[] = [
			{
				key: 'PATIENT_NAME',
				name: 'applicantDisplayName',
				cellTemplate: this.applicantDisplayNameTemplate,
			},

			{
				key: 'SERVICE_TYPE',
				name: 'serviceType',
				cellTemplate: this.serviceTypeTemplate,
			},
			{
				key: 'START_DATE',
				name: 'startDate',
				cellTemplate: this.serviceStartDateTemplate,
			},
			{
				key: 'END_DATE',
				name: 'endDate',
				cellTemplate: this.serviceEndDateTemplate,
			},
			{
				key: 'SERVICE_STATUS',
				name: 'status',
				cellTemplate: this.serviceStatusTemplate,
			},
		];

		this.tableColumns = [...columns];
	}

	onFetchTableData(pageEvent: PageEvent) {
		this.currentPageNumber = pageEvent.pageIndex;
		this.pageSize = pageEvent.pageSize;

		this.loadAppointmentListData();
	}

	updateCurrentSearchFilter(filter: IAppointmentSearchFilter) {
		this.currentFilterObject = { ...filter };
	}

	loadAppointmentListData() {
		this.loading = true;

		const payload: IFetchAppointmentPayload = {
			SearchFilter: this.currentFilterObject
				? this.currentFilterObject
				: null,
			SearchKey: this.searchKey,
			PageNo: this.currentPageNumber,
			PageSize: this.pageSize,
		};

		this.appointmentService
			.fetchAppointments(payload)
			.pipe(take(1))
			.subscribe({
				next: (response) => {
					if (response && response.isSucceed) {
						const data = response.responseData;
						this.loading = false;
						this.setTableColumns();
						this.setPaginationConfig(200, this.pageSize);
						this.setTableConfig(data);
					} else {
						this.handleFailedFetchRequest();
					}
				},
				error: (error) => {
					this.handleFailedFetchRequest();
				},
			});
	}

	onClickSearchFilter() {
		this.filterOpen = !this.filterOpen;
	}

	closeSearchFilter(closed: any) {
		if (closed) {
			this.filterOpen = false;
		}
	}

	applySearchFilter(filter: IAppointmentSearchFilter) {
		this.resetCurrentPageNumber();
		this.updateCurrentSearchFilter(filter);
		this.loadAppointmentListData();
		this.closeSearchFilter(true);
	}

	resetCurrentPageNumber() {
		this.currentPageNumber = 0;
	}

	handleFailedFetchRequest() {
		this.loading = false;
		//	this.customToastService.openSnackBar('SOMETHING_WENT_WRONG',true,'error')
	}
}
