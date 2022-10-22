import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateMockPipe } from '../../../shared/modules/shared-utility/pipes/translate-mock.pipe';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { TranslateServiceStub } from '../../../shared/test-mocks/translate.mock';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginDefaultComponent } from './login-default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalLanguagePipe } from '../../../shared/modules/shared-utility/pipes/portal-language.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('LoginDefaultComponent', () => {
	let component: LoginDefaultComponent;
	let fixture: ComponentFixture<LoginDefaultComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginDefaultComponent, LoginFormComponent, TranslateMockPipe, PortalLanguagePipe],
			imports: [RouterTestingModule,
				MaterialModule,
				ReactiveFormsModule,
				FormsModule,
				BrowserAnimationsModule,
				FlexLayoutModule
			],
			providers: [{ provide: TranslateService, useClass: TranslateServiceStub }]
		})
			.compileComponents();

		fixture = TestBed.createComponent(LoginDefaultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
