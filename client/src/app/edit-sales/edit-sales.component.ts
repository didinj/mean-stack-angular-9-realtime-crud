import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.scss']
})
export class EditSalesComponent implements OnInit {

  socket = io('http://localhost:4000');

  salesForm: FormGroup;
  _id = '';
  itemId = '';
  itemName = '';
  itemPrice: number = null;
  itemQty: number = null;
  totalPrice: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getSalesById(this.route.snapshot.params.id);
    this.salesForm = this.formBuilder.group({
      itemId : [null, Validators.required],
      itemName : [null, Validators.required],
      itemPrice : [null, Validators.required],
      itemQty : [null, Validators.required],
      totalPrice : [null, Validators.required]
    });
  }

  getSalesById(id: any) {
    this.api.getSalesById(id).subscribe((data: any) => {
      this._id = data._id;
      this.salesForm.setValue({
        itemId: data.itemId,
        itemName: data.itemName,
        itemPrice: data.itemPrice,
        itemQty: data.itemQty,
        totalPrice: data.totalPrice
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateSales(this._id, this.salesForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.socket.emit('updatedata', res);
          this.router.navigate(['/sales-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  salesDetails() {
    this.router.navigate(['/sales-details', this._id]);
  }

}
