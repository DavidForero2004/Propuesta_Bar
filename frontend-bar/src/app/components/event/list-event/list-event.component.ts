import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interfaces/event';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent implements OnInit {
  listEvent: Event[] = [];
  counter: number = 1;

  constructor(
    private _eventService: EventService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.getEvent();
  }

  VariableIncreased() {
    return this.counter++;
  }

  getEvent() {
    this._eventService.selectEvent().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const events = data.result[0]; // El primer elemento es el array de eventos
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
      console.error('not valid');
    }
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
