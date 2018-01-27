import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

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

    constructor(private state: StateService) {
        this.langSelected = false;
        this.math = false;
        this.prog = false;
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
    }

    public selectMath(): void {
        this.math = true;
        this.prog = false;
    }

    public selectProg(): void {
        this.math = false;
        this.prog = true;
    }
}
