import { Component } from '@angular/core';
import { userService } from '../../services/user.service';
import { user } from '../../models/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { item } from '../../models/item';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @Output() currentUserEvent = new EventEmitter<user>;
  user: user;
  sampleItem: item = {
    id: crypto.randomUUID(),
    title: "Sample",
    completionStatus: false,
    dueDate: new Date()
  }
  guest: user = { id: "00000000-0000-0000-0000-000000000000", firstName: "", lastName: "", userItems: [this.sampleItem] };
  modalRef: NgbModalRef;
  logInName: string;
  logInLastName: string;
  signUpName: string;
  signUpLastName: string;
  
  logInNameControl = new FormControl('', Validators.required);
  logInLastNameControl = new FormControl('', Validators.required);
  signUpNameControl = new FormControl('', Validators.required);
  signUpLastNameControl = new FormControl('', Validators.required);
  invalidUserControl = new FormControl('', Validators.required);
  loggedIn: boolean = false;


  constructor(private userService: userService, private modalService: NgbModal){

  }

  ngOnInit(){
    this.user = this.guest;
    this.currentUserEvent.emit(this.user);
  }

  logInUser(firstName: string, lastName: string){
    if (this.logInNameControl.invalid || this.logInLastNameControl.invalid){
      return;
    }
    else{
      this.user = this.userService.logInUser(firstName, lastName)!;
      if(this.user == undefined){
        this.invalidUserControl.setErrors({invalidUser : true});
        return;
      }
      this.loggedIn = true;
      this.currentUserEvent.emit(this.user);
      this.modalRef.close();
    }
  }

  signUpUser(firstName: string, lastName: string){
    if (this.signUpNameControl.invalid || this.signUpLastNameControl.invalid){
      return;
    }
    else{
      this.userService.addUser(firstName, lastName)!;
      this.user = this.userService.logInUser(firstName, lastName)!;
      this.loggedIn = true;
      this.currentUserEvent.emit(this.user);
      this.modalRef.close();
    }
  }

  logOutUser(user: user){
    this.userService.updateUser(user.id, user.firstName, user.lastName, user.userItems);
    this.user = this.guest;
    this.loggedIn = false;
    this.currentUserEvent.emit(this.user);
  }

  openModal(content: any){
    this.invalidUserControl.reset();
    this.logInNameControl.reset();
    this.logInLastNameControl.reset();
    this.signUpNameControl.reset();
    this.signUpLastNameControl.reset();
    this.modalRef = this.modalService.open(content);
  }

  resetInvalidUserError(){
    this.invalidUserControl.reset();
  }



}
