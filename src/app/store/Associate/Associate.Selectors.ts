import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssociateModel } from "../Model/Associate.model";

export const getAssociateState =  createFeatureSelector<AssociateModel>('associate');

export const getassociateList = createSelector(getAssociateState,(state)=>{
    return state.list
});
export const getassociate = createSelector(getAssociateState,(state)=>{
    return state.associateobj
})