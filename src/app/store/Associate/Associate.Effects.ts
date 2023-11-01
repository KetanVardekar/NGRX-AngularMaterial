import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociateService } from 'src/app/services/associate.service';
import {
  addassociate,
  addassociatesuccess,
  deleteassociate,
  deleteeassociatesuccess,
  getassociate,
  getassociatesuccess,
  loadassociate,
  loadassociatefail,
  loadassociatesuccess,
  updateassociate,
  updateassociatesuccess,
} from './Associate.Action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../Common/App.Action';

@Injectable()
export class AssociateEffects {
  constructor(private action$: Actions, private service: AssociateService) {}
  _loadassociate = createEffect(() =>
    this.action$.pipe(
      ofType(loadassociate),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadassociatesuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadassociatefail({ errormessage: _error.message }))
          )
        );
      })
    )
  );

  _addassociate = createEffect(() =>
    this.action$.pipe(
      ofType(addassociate),
      switchMap((action) => {
        return this.service.Create(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              addassociatesuccess({ inputdata: action.inputdata }),
              showAlert({
                message: 'CreateD successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to Create Associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getassociate = createEffect(() =>
    this.action$.pipe(
      ofType(getassociate),
      exhaustMap((action) => {
        return this.service.GetByCode(action.id).pipe(
          map((data) => {
            return getassociatesuccess({ obj: data });
          }),
          catchError((_error) =>
            of (showAlert({
                message: 'Failed to fetch the data',
                resultType: 'fail',
              }))
          )
        );
      })
    )
  );
  _updateassociate = createEffect(() =>
    this.action$.pipe(
      ofType(updateassociate),
      switchMap((action) => {
        return this.service.Update(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              updateassociatesuccess({ inputdata: action.inputdata }),
              showAlert({
                message: 'Updated successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to Update Associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
  _deleteassociate = createEffect(() =>
  this.action$.pipe(
    ofType(deleteassociate),
    switchMap((action) => {
      return this.service.Delete(action.id).pipe(
        switchMap((data) => {
          return of(
           deleteeassociatesuccess({ id: action.id }),
            showAlert({
              message: 'Deleted successfully',
              resultType: 'pass',
            })
          );
        }),
        catchError((_error) =>
          of(
            showAlert({
              message: 'Failed to Delete Associate',
              resultType: 'fail',
            })
          )
        )
      );
    })
  )
);
}
