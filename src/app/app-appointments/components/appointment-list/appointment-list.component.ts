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
import {
	ActivatedRoute,
	ActivatedRouteSnapshot,
	Router,
} from '@angular/router';

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
	searchInput: ElementRef | undefined;

	constructor(
		private appointmentService: AppointmentService,
		private customToastService: CustomToastService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		fromEvent(this.searchInput?.nativeElement, 'keyup')
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
			pageIndex: this.currentPageNumber,
		};
		this.paginationConfig = { ...pagination };
	}

	setTableData(data: any[]) {
		this.tableData = [...data];
	}

	onSelectTableRow(row: any) {
		//const url = '/appointments/' + row.id;
		this.router.navigate([row.id], { relativeTo: this.route });
		console.log('selected row ', row);
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

	clearSearch() {
		this.resetCurrentPageNumber();
		this.searchKey = this.searchInput?.nativeElement.value;
		this.loadAppointmentListData();
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
						const data =
							response.responseData.apppointmentResponses;
						const total = response.responseData.totalCount;
						this.loading = false;
						this.setTableColumns();
						this.setPaginationConfig(total, this.pageSize);
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
