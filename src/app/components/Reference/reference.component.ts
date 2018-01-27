import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { MarkdownComponent } from '../../../../node_modules/ngx-md';

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

    constructor(private state: StateService) {
        this.langSelected = false;
        this.math = false;
        this.prog = false;
        this.twoD = false;
        this.threeD = false;
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
        this.mdPath = this.baseMdPath + this.mdLang + this.mdSection + this.mdSubsection + this.mdParagraph;
        console.log(this.mdPath);
    }

    public selectLanguage(index: number): void {
        this.langSelected = true;
        this.selectedLang = index;
        this.math = this.prog = false;
        this.twoD = this.threeD = false;
        this.resetMdPath();
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
    }

    public selectProg(): void {
        this.math = false;
        this.prog = true;
        this.twoD = this.threeD = false;
        this.mdSection = 'prog/';
    }

    public switchTwoDThreeD(value: boolean): void {
        this.twoD = value;
        this.threeD = !value;
        if (this.twoD) {
            this.mdSubsection = '2d/';
        } else {
            this.mdSubsection = '3d/';
        }
    }

    public setParagraph(paragraph: string): void {
        this.mdParagraph = paragraph + '.md';
        let _index: number;
        switch (paragraph) {
            case 'models': _index = 0; break;
            case 'projecting': _index = 1; break;
            case 'transformations': _index = 2; break;
        }
        let _btns = document.getElementsByClassName('nav-sub-btn') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < _btns.length; i++) {
            _btns[i].style.backgroundColor = '';
            _btns[i].style.color = '';
        }
        _btns[_index].style.backgroundColor = '#00838f';
        _btns[_index].style.color = 'white';

        this.formMdPath();
    }
}
