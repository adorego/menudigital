import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PasswordMatchValidationService } from '../../services/passwordMatchValidation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<any>();
  public form: FormGroup;

  constructor(private passwordMatchValidationService: PasswordMatchValidationService, ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required])
    },
    {
      validators: this.passwordMatchValidationService.MatchPassword('password', 'repassword')
    });
  }

  public sign(): void {
    if (this.form.valid) {
      this.sendSignForm.emit(this.form.value);
    }
  }

}
