import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class StateService {
    public stateUpdated: EventEmitter<any> = new EventEmitter();
    public startPageLeft: EventEmitter<any> = new EventEmitter();
    public languageSelected: EventEmitter<any> = new EventEmitter();
    private selectedItem: number;
    public startPageOpen: boolean;
    public selectedLang: number;

    constructor () {
        this.selectedItem = -1;
        this.selectedLang = -1;
        this.startPageOpen = true;
    }

    public setSelectedItem(index: number): void {
        this.selectedItem = index;
        this.stateUpdated.emit(this.selectedItem);
    }

    public getSelectedItem(): number | any {
        return this.selectedItem;
    }

    public leaveStartPage(): void {
        this.startPageOpen = false;
        this.startPageLeft.emit(this.startPageOpen);
    }

    public goToStartPage(): void {
        this.startPageOpen = true;
        this.startPageLeft.emit(this.startPageOpen);
    }

    public selectLang(index: number): void {
        this.selectedLang = index;
        this.languageSelected.emit(this.selectedLang);
    }
}
