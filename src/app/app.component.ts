import { Component } from '@angular/core';
import { NgRedux, select$, select } from "@angular-redux/store";
import { IAppState } from "./app.module";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @select('name') name$: Observable<string>;
  @select('buttonClicked') buttonClicked$: Observable<string>;

  @select('items') items$: Observable<Array<string>>;

  someFunction() {
    this.ngRedux.dispatch({
      type: 'BUTTON_CLICKED'
    });
  }

  addItem() {
    this.ngRedux.dispatch({
      type: 'ADD_ITEM',
      payload: {
        newItem: Date.now().toString()
      }
    })
  }

  constructor(public ngRedux: NgRedux<IAppState>) {
    
  }
}
