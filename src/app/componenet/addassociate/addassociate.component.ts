import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate, updateassociate } from 'src/app/store/Associate/Associate.Action';
import { getassociate } from 'src/app/store/Associate/Associate.Selectors';
import { Associate } from 'src/app/store/Model/Associate.model';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css'],
})
export class AddassociateComponent implements OnInit {
  title = 'Create Associate';
  isEdit = false;
  dialogData: any;
  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getassociate).subscribe((data)=>{
      this.associateForm.setValue({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        type: data.type,
        group: data.group,
        status: data.status
      })
    })
  }
  associateForm = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', [Validators.required, Validators.email]),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER'),
    group: this.builder.control('level1'),
    status: this.builder.control(true),
  });

  SaveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        type: this.associateForm.value.type as string,
        address: this.associateForm.value.address as string,
        group: this.associateForm.value.group as string,
        status: this.associateForm.value.status as boolean,
      };
      if(_obj.id === 0){
      this.store.dispatch(addassociate({ inputdata: _obj }));
      }else{
        this.store.dispatch(updateassociate({ inputdata: _obj }));
      }
      this.ClosePopup();
    }
  }
  ClosePopup() {
    this.ref.close();
  }
}
