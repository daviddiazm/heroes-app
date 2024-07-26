import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrl: './confim-dialog.component.css'
})
export class ConfimDialogComponent implements OnInit {

  public hero!: Hero

  constructor(
    public dialogRef : MatDialogRef<ConfimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ){}

  ngOnInit(): void {
    this.hero = this.data.value
  }

  onNoClick():void {
    this.dialogRef.close(false)
  }

  onOkClick():void {
    this.dialogRef.close(true)
  }
}
