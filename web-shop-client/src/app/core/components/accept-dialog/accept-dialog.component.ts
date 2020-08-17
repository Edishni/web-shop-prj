import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.css']
})
export class AcceptDialogComponent implements OnInit {
  description:string;


  constructor(
    
      private dialogRef: MatDialogRef<AcceptDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.description = data;
  }

  ngOnInit() {

  }

  confirm() {
      this.dialogRef.close(true);
  }

  cancel() {
      this.dialogRef.close(false);
  }
}
