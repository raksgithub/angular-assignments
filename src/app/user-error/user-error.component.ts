import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserError } from '../user.model';

@Component({
  selector: 'app-user-error',
  templateUrl: './user-error.component.html',
  styleUrls: ['./user-error.component.css']
})
export class UserErrorComponent implements OnInit {

  @Input() userError: UserError | null = null;
  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit();
  }

}
