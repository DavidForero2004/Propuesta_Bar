import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interfaces/event';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent implements OnInit {
  listEvent: Event[] = [];

  constructor(private _eventService: EventService){}

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(){
    this._eventService.selectEvent().subscribe((data: any)=>{
      if (data && data.result && Array.isArray(data.result)) {
        const events = data.result[0]; // El primer elemento es el array de eventos
        if (Array.isArray(events)) {
          this.listEvent = events;
        }
      }
    });
  }


}
