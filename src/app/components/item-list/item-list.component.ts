import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { itemService } from '../../services/item.service';
import { item } from '../../models/item';
import { NgbDate, NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { user } from '../../models/user';
import { Input } from '@angular/core';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemComponent, FormsModule, DatePipe, NgbModule, ReactiveFormsModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  @Input() user: user;
  itemList: item[];
  newItemDueDate: NgbDate = this.ngbCalendar.getToday();
  newItemConvertedDueDate: Date = new Date();
  titleControl = new FormControl('', Validators.required);
  dateControl = new FormControl<NgbDate>(this.newItemDueDate, Validators.required);
  modalRef: NgbModalRef;

  constructor(public itemService: itemService, private modalService: NgbModal, private ngbCalendar: NgbCalendar){
  }
  
  ngOnInit(){
    if (this.user.userItems){
      this.user.userItems.sort((b,a) => b.dueDate.getTime() - a.dueDate.getTime());
    }
  }

  ngOnChanges(){
    if (this.user){
      this.itemList = this.user.userItems;
    }
  }

  openModal(content: any){
    this.modalRef = this.modalService.open(content);
    this.titleControl.reset();
    this.dateControl.setValue(this.newItemDueDate);
  }

  addItem(){
    if(this.titleControl.invalid || this.dateControl.invalid){
        return;
    }
    else{
      let newDate = this.dateControl.value!;
      let dueDate = new Date(newDate.year, newDate.month - 1, newDate.day)
      this.itemService.addItem(this.user, this.titleControl.value!, dueDate);
      this.itemService.sortItems(this.user); 
      this.modalRef.close();
    }
    return;
  }  
}
