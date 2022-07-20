import { createAction, props } from '@ngrx/store';
import { LatLon } from '@common';

const setName = createAction('[SIGNUP] Set name', props<{ name: string }>());

const setLocation = createAction('[SIGNUP] Set location', props<{ location: LatLon }>());

export const SignupActions = {
  setName,
  setLocation,
};
