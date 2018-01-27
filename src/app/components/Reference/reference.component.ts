import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { validateConfig } from '@angular/router/src/config';

@Component({
    selector: 'reference',
    templateUrl: 'reference.component.html',
    styleUrls: ['../../../assets/sass/components/ref.sass']
})

export class ReferenceComponent implements OnInit {
    public langSelected: boolean;
    public selectedLang: number;
    public math: boolean;
    public prog: boolean;
    public twoD: boolean;
    public threeD: boolean;

    constructor(private state: StateService) {
        this.langSelected = false;
        this.math = false;
        this.prog = false;
        this.twoD = false;
        this.threeD = false;
    }

    ngOnInit() {
        this.state.languageSelected.subscribe(value => {
            this.selectLanguage(value);
        });
    }

    public selectLanguage(index: number): void {
        this.langSelected = true;
        this.selectedLang = index;
        this.math = this.prog = false;
        this.twoD = this.threeD = false;
    }

    public selectMath(): void {
        this.math = true;
        this.prog = false;
        this.twoD = this.threeD = false;
    }

    public selectProg(): void {
        this.math = false;
        this.prog = true;
        this.twoD = this.threeD = false;
    }

    public switchTwoDThreeD(value: boolean): void {
        this.twoD = value;
        this.threeD = !value;
    }
}
