import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { MarkdownComponent } from '../../../../node_modules/ngx-md';
import { fail } from 'assert';

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
    private baseMdPath: string;
    private mdLang: string;
    private mdSection: string;
    private mdSubsection: string;
    private mdParagraph: string;
    public mdPath: string;
    private paragraphOpen: boolean;

    constructor(private state: StateService) {
        this.langSelected = false;
        this.math = false;
        this.prog = false;
        this.twoD = false;
        this.threeD = false;
        this.paragraphOpen = false;
        this.baseMdPath = 'https://raw.githubusercontent.com/cellardoor42/AffineTransform/master/src/app/components/Reference/docs/';
    }

    ngOnInit() {
        this.state.languageSelected.subscribe(value => {
            this.selectLanguage(value);
        });
        this.mdPath = '';
    }

    private resetMdPath(): void {
        this.mdPath = '';
    }
    private formMdPath(): void {
        this.resetMdPath();
        if (this.math) {
            this.mdPath = this.baseMdPath + this.mdLang + this.mdSection + this.mdSubsection + this.mdParagraph;
        } else {
            this.mdPath = this.baseMdPath + this.mdLang + this.mdSection + this.mdParagraph;
        }
    }

    public selectLanguage(index: number): void {
        this.langSelected = true;
        this.selectedLang = index;
        this.math = this.prog = false;
        this.twoD = this.threeD = false;
        this.resetMdPath();
        this.paragraphOpen = false;
        if (index === 0) {
            this.mdLang = 'en/';
        } else {
            this.mdLang = 'ru/';
        }
    }

    public selectMath(): void {
        this.math = true;
        this.prog = false;
        this.twoD = this.threeD = false;
        this.mdSection = 'math/';
        this.resetMdPath();
        this.paragraphOpen = false;
    }

    public selectProg(): void {
        this.math = false;
        this.prog = true;
        this.twoD = this.threeD = false;
        this.mdSection = 'prog/';
        this.resetMdPath();
        this.paragraphOpen = false;
    }

    public switchTwoDThreeD(value: boolean): void {
        this.twoD = value;
        this.threeD = !value;
        if (this.twoD) {
            this.mdSubsection = '2d/';
        } else {
            this.mdSubsection = '3d/';
        }
        this.paragraphOpen = false;
        this.resetMdPath();
    }

    public setParagraph(paragraph: string): void {
        this.mdParagraph = paragraph + '.md';
        let _index: number;
        switch (paragraph) {
            case 'models': case 'about': _index = 0; break;
            case 'projecting': case 'angular': _index = 1; break;
            case 'transformations': case 'projectstructure': _index = 2; break;
        }
        if (this.math && this.threeD) { _index++; }
        let _btns = document.getElementsByClassName('nav-sub-btn') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < _btns.length; i++) {
            _btns[i].style.backgroundColor = '';
            _btns[i].style.color = '';
        }
        _btns[_index].style.backgroundColor = '#00838f';
        _btns[_index].style.color = 'white';
        this.paragraphOpen = true;
        this.formMdPath();
    }
}
