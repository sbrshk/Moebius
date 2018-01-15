import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffineTransform } from '../../AffineTransform/AffineTransform';
import {  Matrix } from '../../Matrix/Matrix';
import { Model2d } from '../../Model/Model2d';
import { Model3d } from '../../Model/Model3d';
import { Shapes2d } from '../../Shapes/Shapes2d';
import { Shapes3d } from '../../Shapes/Shapes3d';

import { StateService } from '../state.service';

@Component({
    selector: 'sidebar-component',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['../../../assets/sass/components/sidebar.sass']
})

export class SidebarComponent {
    public twoD: boolean;
    public selectedItem = -1;
    public help: boolean;
    public ref: boolean;

    private shapes: Shapes2d;

    constructor (private state: StateService, private router: Router) {
        this.shapes = new Shapes2d();
        this.twoD = true;
        this.help = false;
        this.ref = false;

        let _link: any[] = ['2d'];
        this.router.navigate(_link);
    }

    public showHelp(): void {
        this.help = !this.help;
    }

    public switch2d3d(state: boolean): void {
        this.twoD = state;
        this.selectedItem = -1;
        this.ref = false;
    }

    public switchRef(): void {
        this.twoD = false;
        this.selectedItem = -1;
        this.ref = true;
    }

    public selectItem(index: number): void {
        this.state.setSleectedItem(index);
        let _btns = document.getElementsByClassName('sidebar-btn') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < _btns.length; i++) {
            _btns[i].style.backgroundColor = '';
            _btns[i].style.color = '';
        }
        this.selectedItem = index;
        if (index > 3) {
            _btns[index - 4].style.backgroundColor = '#00838f';
            _btns[index - 4].style.color = 'white';
        } else {
            _btns[index].style.backgroundColor = '#00838f';
            _btns[index].style.color = 'white';
        }
    }
}
