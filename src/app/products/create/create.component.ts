import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required]),
    date_revision: new FormControl('', [Validators.required]),
  });
}
