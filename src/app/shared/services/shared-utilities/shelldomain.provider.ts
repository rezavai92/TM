import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
// @dynamic
@Injectable({ providedIn: 'root' })
export class ShellDomainProvider {
    private platformIdValue: string;
    public static api: any;
    constructor(@Inject(PLATFORM_ID) platformId: string) {
        this.platformIdValue = platformId;
        if (this.platformIdValue === 'browser') {

            ShellDomainProvider['api'] = (window as any)['shellDomain'];
            if ((window as any)['mockData']) {
                (ShellDomainProvider as any)['mockData'] = (window as any)['mockData'];
            }
        } else {
            ShellDomainProvider['api'] = JSON.parse((process as any).env['shellDomain']);
            if (process.env['mockData']) {
                (ShellDomainProvider as any)['mockData'] = JSON.parse(process.env['mockData']);
            }
        }
    }
}
