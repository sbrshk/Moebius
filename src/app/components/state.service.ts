import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class StateService {
    public stateUpdated: EventEmitter<any> = new EventEmitter();
    public startPageLeft: EventEmitter<any> = new EventEmitter();
    private selectedItem: number;
    public startPageOpen: boolean;

    constructor () {
        this.selectedItem = -1;
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
}
