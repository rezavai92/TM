import { createReducer, on } from "@ngrx/store";
import * as CounterActions from '../actions/counter.actions'
const initialCounterState ={count : 0};
export const counterReducer =createReducer(initialCounterState,
	on(CounterActions.increment,(state,payload)=>{
		return {...state,count : state.count+payload.by}
}),
	on(CounterActions.decrement,(state,payload)=>{
		return {...state,count : state.count-payload.by}
	})

)