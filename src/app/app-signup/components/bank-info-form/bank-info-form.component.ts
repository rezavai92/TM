import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MfsList, numberRegexString } from '../../../shared/shared-data/constants';

@Component({
    selector: 'app-bank-info-form',
    templateUrl: './bank-info-form.component.html',
    styleUrls: ['./bank-info-form.component.scss']
})
export class BankInfoFormComponent implements OnInit, OnDestroy {

    bankInfoForm!: FormGroup;
    chosenBankType: string = "Bank";
    FinanceTypeRadioButtonValueChangeSubscription!: Subscription;

    BankGroup!: FormGroup;
    MfsGroup!: FormGroup;
    mfsServiceProviders = MfsList;
    constructor(private _fb: FormBuilder) { }


    ngOnInit(): void {
        this.initBankInfoForm();
        this.subscribeToFinanceTypeControlValueChange();
        this.onChosenBankTypeValueChange();


    }

    onChosenBankTypeValueChange() {
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

    }

    subscribeToFinanceTypeControlValueChange() {
        this.FinanceTypeRadioButtonValueChangeSubscription =
            this.bankInfoForm.controls["FinanceType"].
                valueChanges.
                subscribe((val: any) => {

                    this.chosenBankType = val;
                    this.onChosenBankTypeValueChange();

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
            FinanceType: [this.chosenBankType, Validators.required],

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
        if (this.FinanceTypeRadioButtonValueChangeSubscription) {
            this.FinanceTypeRadioButtonValueChangeSubscription.unsubscribe();
        }

    }

}
