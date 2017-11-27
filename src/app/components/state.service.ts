import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class StateService {
    public stateUpdated: EventEmitter<any> = new EventEmitter();
    private selectedItem: number;

    constructor () {
        this.selectedItem = -1;
    }

    public setSleectedItem(index: number): void {
        this.selectedItem = index;
        this.stateUpdated.emit(this.selectedItem);
    }

    public getSelectedItem(): number | any {
        return this.selectedItem;
    }
}
