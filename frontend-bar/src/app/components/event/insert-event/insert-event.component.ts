import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../interfaces/event';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insert-event',
  templateUrl: './insert-event.component.html',
  styleUrl: './insert-event.component.css'
})
export class InsertEventComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _eventService: EventService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router
  ) {
    
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.form = this.fb.group({
      name_event: ['', Validators.required],
      date: ['', Validators.required]
    })

  }

  ngOnInit(): void {

  }

  insertEvent() {
    const event: Event = {
      name_event: this.form.value.name_event,
      date: this.form.value.date
    };

    if (this.form.value.name_event == '' || this.form.value.date == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return
    }
    this._eventService.insertEvent(event).subscribe(() => {
      this.toastr.success('El evento ha sido creado', 'success');
      this.form.reset();
      this.router.navigate(['/event']);
    })



  }


}
