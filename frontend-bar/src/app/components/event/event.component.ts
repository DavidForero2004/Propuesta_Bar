import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})

  export class EventComponent implements OnInit{
    name_event: string = '';
    date: Date;
    data: any[] = [];


  constructor(private toastr: ToastrService, private _eventService : EventService, private router :Router){
    this.date = new Date();
  }

  ngOnInit(): void {
  }

  //get events
  selectEvent(){
    this._eventService.selectEvent().subscribe(data=>{
      this.data = this.data;
      console.log(this.data)
    })
  }

  //insert even
  insertEvent(){
    //validate  empity
    if (this.name_event == '' || !this.date ) {
      this.toastr.error('Complete the form please', 'ERROR');
      return;
    } 

    //object to interface
    const event: Event ={
      name_event: this.name_event,
      date: this.date
    }
  
    this._eventService.insertEvent(event).subscribe(data =>{
      this.toastr.success(`Event ${this.name_event} was register`, 'Correct');
      this.router.navigate(['/dashboard']);
      
    });

  }

}
