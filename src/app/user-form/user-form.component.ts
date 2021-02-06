import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User, UserError } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

  userError: UserError | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.firstName.statusChanges.subscribe(() => {
      if((this.firstName.touched || this.firstName.dirty) && this.firstName.errors && this.firstName.errors.required) {
        this.userError = {
          errorField: 'First Name',
          errorMessage: 'Field is required.',
          hint: 'Alexa'
        }
      } else {
        this.userError = null;
      }
    });

    this.lastName.statusChanges.subscribe(() => {
      if((this.lastName.touched || this.lastName.dirty) && this.lastName.errors && this.lastName.errors.required) {
        this.userError = {
          errorField: 'Last Name',
          errorMessage: 'Field is required.',
          hint: 'Gerry'
        }
      } else {
        this.userError = null;
      }
    });

    this.email.statusChanges.subscribe(() => {
      if((this.email.touched || this.email.dirty) && this.email.errors && this.email.errors.required) {
        this.userError = {
          errorField: 'Email',
          errorMessage: 'Field is required.',
          hint: 'alexa.gerry@example.com'
        }
      } else if((this.email.touched || this.email.dirty) && this.email.errors && this.email.errors.email) {
        this.userError = {
          errorField: 'Email',
          errorMessage: 'Field is required.',
          hint: 'alexa.gerry@example.com'
        }
      } else {
        this.userError = null;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(
      changes['editingUser'] &&
      changes['editingUser'].previousValue !== changes['editingUser'].currentValue
    ) {
      this.userForm.patchValue({
        firstName: this.editingUser?.firstName,
        lastName: this.editingUser?.lastName,
        email: this.editingUser?.email,
        isActive: this.editingUser?.isActive
      });
    }
  }

  @Input() editingUser: User | null = null;
  @Input() buttonText: string = 'Submit';
  @Output() onUserFormSubmit = new EventEmitter<User>();

  userForm = this.fb.group({
    firstName: [
      this.editingUser ? this.editingUser.firstName : '', 
      Validators.required
    ],
    lastName: [
      this.editingUser ? this.editingUser.lastName : '', 
      Validators.required
    ],
    email: [
      this.editingUser ? this.editingUser.email : '', 
      [Validators.required, Validators.email]
    ],
    isActive: [this.editingUser ? this.editingUser.isActive : false]
  });

  get firstName() {
    return this.userForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.userForm.get('lastName') as FormControl;
  }

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  onSubmit() {
    this.onUserFormSubmit.emit(this.userForm.value);
  }

  handleClose() {
    this.userError = null;
  }

}
