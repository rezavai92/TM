import {createAction, props} from '@ngrx/store'

export enum CounterActionTypes {
	INCREMENT = "[Counter] Increment",
	DECREMENT =  "[Counter] Decrement"
}
export const increment=createAction(CounterActionTypes.INCREMENT,props<{by :number}>());
export const decrement=createAction(CounterActionTypes.DECREMENT,props<{by : number}>());