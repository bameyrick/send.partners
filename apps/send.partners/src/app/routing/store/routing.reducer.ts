import { InjectionToken } from '@angular/core';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Action, ActionReducerMap } from '@ngrx/store';

export interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    router: routerReducer,
  }),
});
