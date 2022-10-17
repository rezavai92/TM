import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MfsList, numberRegexString } from '../../shared/shared-data/constants';

@Component({
    selector: 'app-bank-info-form',
    templateUrl: './bank-info-form.component.html',
    styleUrls: ['./bank-info-form.component.scss']
})
export class BankInfoFormComponent implements OnInit, OnDestroy {

    bankInfoForm!: FormGroup;
    chosenBankType: string = "";
    FinanceTypeRadioButtonValueChangeSubscription!: Subscription;

    BankGroup!: FormGroup;
    MfsGroup!: FormGroup;
    mfsServiceProviders = MfsList;
    constructor(private _fb: FormBuilder) { }


    ngOnInit(): void {
        this.initBankInfoForm();
        this.subscribeToFinanceTypeValueChange();

    }

    subscribeToFinanceTypeValueChange() {
        this.FinanceTypeRadioButtonValueChangeSubscription =
            this.bankInfoForm.controls["FinanceType"].
                valueChanges.
                subscribe((val: any) => {

                    this.chosenBankType = val;
                    if (this.chosenBankType === 'Bank') {
                        if (!this.BankGroup) {
                            this.initBankGroup();
                        }

                    }
                    else {
                        if (!this.MfsGroup) {
                            this.initMFSGroup()
                        }

                    }
                })

    }


    initBankGroup() {
        this.BankGroup = this._fb.group({
            BankName: ["", Validators.required],
            BranchName: ["", Validators.required],
            AccountHolderName: ["", Validators.required],
            AccountNumber: ["", Validators.required],
            BankRouteNumber: [""],

        })
    }

    initMFSGroup() {
        this.MfsGroup = this._fb.group({
            ServiceProvider: ["", Validators.required],
            PhoneNumber: ["", [Validators.required, Validators.pattern(numberRegexString), Validators.maxLength(10), Validators.minLength(10)]]
        })
    }

    initBankInfoForm() {
        this.bankInfoForm = this._fb.group({
            FinanceType: ["", Validators.required],

        });

    }


    get BankGroupControls() {
        return this.BankGroup.controls;
    }
    get MfsGroupControls() {
        return this.MfsGroup.controls;
    }

    get BankInfoFormControls() {
        return this.bankInfoForm.controls;
    }

    hasError(control: AbstractControl) {
        return control.errors && control.touched;
    }

    ngOnDestroy(): void {
        this.FinanceTypeRadioButtonValueChangeSubscription.unsubscribe();
    }

}
