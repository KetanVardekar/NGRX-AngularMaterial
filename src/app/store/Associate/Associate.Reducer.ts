import { createReducer, on } from '@ngrx/store';
import { AssociateState } from './Associate.state';
import { addassociatesuccess, deleteeassociatesuccess, getassociatesuccess, loadassociatefail, loadassociatesuccess, openpopup, updateassociatesuccess } from './Associate.Action';

const _AssociateReducer = createReducer(
  AssociateState,
  on(loadassociatesuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errormessage: '',
    };
  }),
  on(getassociatesuccess, (state, action) => {
    return {
      ...state,
      associateobj:action.obj
    };
  }),
  on(loadassociatefail, (state, action) => {
    return {
      ...state,
      list:[],
      errormessage: action.errormessage,
    };
  }),
  on(addassociatesuccess, (state, action) => {
    const _maxid =  Math.max(...state.list.map(o=>o.id));
    const _newData = {...action.inputdata};
    _newData.id = _maxid+1;

    return {
      ...state,
      list:[...state.list,_newData],
      errormessage:''
      
    };
  }),
  on(updateassociatesuccess, (state, action) => {
    
    const _newData = state.list.map(o=>{
        return o.id === action.inputdata.id ? action.inputdata :o
    })

    return {
      ...state,
      list:_newData,
      errormessage:''
      
    };
  }),
  on(deleteeassociatesuccess, (state, action) => {
    
    const _newData = state.list.filter(o=>o.id != action.id)

    return {
      ...state,
      list:_newData,
      errormessage:''
      
    };
  }),
  on(openpopup, (state, action) => {
    return {
      ...state,
      associateobj:{
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        group: "level1",
        status: true
      }
    };
  }),
);
export function AssociateReducer(state: any, action: any) {
  return _AssociateReducer(state, action);
}
