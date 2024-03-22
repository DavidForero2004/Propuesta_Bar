import { Component, OnInit, Renderer2 } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interfaces/event';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { time } from 'console';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {

  listEvent: Event[] = [];
  listEventId: Event[] = [];
  counter: number = 1;
  form: FormGroup;

  constructor(
    private _eventService: EventService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.form = this.fb.group({
      id: ['', Validators.required],
      name_event: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getEvent();
    this.loadScript('../../../../assets/js/event/main.js');
  }

  private loadScript(url: string): void {
    const script = this.renderer.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }

  VariableIncreased() {
    return this.counter++;
  }

  getEvent() {
    this._eventService.selectEvent().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const events = data.result[0];
        if (Array.isArray(events)) {
          this.listEvent = events;
        }
      }
    });
  }

  deleteEvent(id?: number) {
    if (id) {
      this.translate.get(
        ['delete', 'alertConfirm', 'cancel', 'alertDelete', 'successDelete', 'errorDelete']
      ).subscribe((translations: any) => {
        Swal.fire({
          title: translations['alertConfirm'],
          text: translations['alertDelete'],
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: translations['delete'],
          cancelButtonText: translations['cancel']
        }).then((result) => {
          if (result.isConfirmed) {
            this._eventService.deleteEvent(id).subscribe({
              next: () => {
                this.toastr.success(translations['successDelete'], 'success');
                this.getEvent();
              },
              error: (error: any) => {
                this.toastr.error(translations['errorDelete'], 'Error');
              }
            });
          }
        });

      });
    } else {
      this.translate.get('GeneralError').subscribe((res: any) => {
        this.toastr.error(res, 'Error');
      });
    }
  }

  selectEventId(id?: number) {
    if (id) {
      this._eventService.selectEventId(id).subscribe((data: any) => {
        if (data && data.result && Array.isArray(data.result)) {
          const events = data.result[0];
          if (Array.isArray(events)) {
            this.listEventId = events;
            this.updateFormWithSelectedEvent();
          }
        }
      });
    } else {
      this.translate.get('GeneralError').subscribe((res: any) => {
        this.toastr.error(res, 'Error');
      });
    }
  }

  updateFormWithSelectedEvent() {
    const selectedEvent = this.listEventId[0];
    this.form.patchValue({
      id: selectedEvent.id,
      name_event: selectedEvent.name_event,
      date: selectedEvent.date
    });
  }

  updateEvent() {
    if (this.form.invalid) {
      this.toastr.error('Por favor completa todos los campos', 'Error');
      return;
    };
    const event: Event = {
      id: this.form.value.id,
      name_event: this.form.value.name_event,
      date: this.form.value.date
    };

    this._eventService.updateEvent(event).subscribe({
      next: () => {   
        this.toastr.success('El evento se actualizó correctamente', 'Éxito');
        setTimeout(()=>{
          this.getEvent();
        },3000)
      },
      error: (error) => {
        this.toastr.error('Ocurrió un error al actualizar el evento', 'Error');
        console.error(error);
      }
    });
  }

  es() {
    this.translate.use('es');
    this._eventService.updateServerLanguage('es').subscribe(() => {
      console.log('Idioma del servidor actualizado a español.');
    });
  }

  en() {
    this.translate.use('en');
    this._eventService.updateServerLanguage('en').subscribe(() => {
      console.log('Server language updated to English.');
    });
  }

}
