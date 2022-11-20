import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';
import { TranslateMockPipe } from './pipes/translate-mock.pipe';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomToastService } from './services/custom-toast.service';
import { DisplayNamePipe } from './pipes/display-name.pipe';
import { TmPdfViewerComponent } from './components/tm-pdf-viewer/tm-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Base64StringPipe } from './pipes/base64-string.pipe';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { CustomDialogService } from './services/custom-dialog.service';
import { NgxExtendedPdfViewerCommonModule } from 'ngx-extended-pdf-viewer/lib/ngx-extended-pdf-viewer-common.module';
import { TmMediaPlayerComponent } from './components/tm-media-player/tm-media-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

export function HttpLoaderFactory(http: HttpClient) {
	return new MultiTranslateHttpLoader(http, [
		{ prefix: './assets/i18n/common/', suffix: '.json' },
	]);
}

@NgModule({
	declarations: [
		PortalLanguagePipe,
		TranslateMockPipe,
		AcceptFormatPipe,
		CustomToastComponent,
		BlockCopyPasteDirective,
		DisplayNamePipe,
		TmPdfViewerComponent,
		Base64StringPipe,
		CustomDialogComponent,
		TmMediaPlayerComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		FlexLayoutModule,
		NgxExtendedPdfViewerModule,
		VgCoreModule,
		VgControlsModule,
		VgOverlayPlayModule,
		VgBufferingModule,
		TranslateModule.forChild({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
			isolate: true,
		}),
	],
	exports: [
		PortalLanguagePipe,
		AcceptFormatPipe,
		DisplayNamePipe,
		Base64StringPipe,
		TmPdfViewerComponent,
		CustomDialogComponent,
		TmMediaPlayerComponent,
	],
	providers: [CustomToastService, CustomDialogService],
})
export class SharedUtilityModule {}
