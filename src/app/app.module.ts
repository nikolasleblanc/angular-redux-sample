import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';

import { AppComponent } from './app.component';
import { environment } from "../environments/environment";

export interface IAppState {
  items: Array<string>
}

const INITIAL_STATE: IAppState = {
  items: []
}

export function rootReducer(
  lastState: IAppState = INITIAL_STATE, 
  action: any
): IAppState {
  console.log(action.type);
  switch(action.type) {
    case 'TEST_ACTION':
      return Object.assign({}, lastState,
        { 
          'name': action.payload
        });
    case 'BUTTON_CLICKED':
      return Object.assign({}, lastState,
        { 
          'buttonClicked': Date.now().toString()
        });
    case 'ADD_ITEM':
      return Object.assign({}, lastState,
        { 
          'items': [
            ...lastState.items,
            action.payload.newItem
          ]
        });
    default:
      return lastState;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    let enhancers = [];
    // ... add whatever other enhancers you want.

    // You probably only want to expose this tool in devMode.
    if (!environment.production && devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }

    ngRedux.configureStore(rootReducer, INITIAL_STATE, [ createLogger() ], enhancers);
  }
}
