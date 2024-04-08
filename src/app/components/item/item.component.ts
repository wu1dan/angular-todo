import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { itemService } from '../../services/item.service';
import { item } from '../../models/item';
import {  NgbModule, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { user } from '../../models/user';

@Component({
  selector: 'tr[app-item]',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, DatePipe, ReactiveFormsModule],
  providers:[DatePipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item: item;
  @Input() user: user;
  newTitle: string;
  newDueDate: NgbDate = this.ngbCalendar.getToday();
  editMode: boolean = false;
  titleControl = new FormControl('', Validators.required);
  dateControl = new FormControl<NgbDate>(this.newDueDate, Validators.required);

  constructor(public itemService: itemService, public datePipe: DatePipe, private ngbCalendar: NgbCalendar){}

  openEditMode(){
    this.editMode = true;

  }

  closeEditMode() {
    this.editMode = false;
    this.titleControl.reset();
    this.dateControl.reset();
  }

  deleteItem(item: item){
    this.itemService.removeItem(this.user, item.id);
  }

  updateItem(item: item){
    if (this.titleControl.invalid){
      this.titleControl.setErrors({invalidTitle : true});
    }
    if (this.dateControl.invalid){
      this.dateControl.setErrors({invalidDate : true});
    }
    if (this.dateControl.invalid || this.titleControl.invalid){
      return;
    }
    else{
      let newDate = this.dateControl.value!;
      item.dueDate = new Date(newDate.year, newDate.month - 1, newDate.day);
      item.title = this.titleControl.value!;
      this.itemService.updateItem(this.user, item.id, item.title, item.completionStatus, item.dueDate);
      this.editMode = false;
      this.itemService.sortItems(this.user);
    }
  }

  changeStatus(item: item){
    if(item.completionStatus == true){
      item.completionStatus = false;
    }
    else{
      item.completionStatus = true;
    }
    this.itemService.updateItem(this.user, item.id, item.title, item.completionStatus, item.dueDate);
  }

  getStatus(item: item): string {
    return this.itemService.getStatus(item);
  }

}
