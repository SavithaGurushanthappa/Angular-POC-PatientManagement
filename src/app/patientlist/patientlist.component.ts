import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  public show_dialog : boolean = false;
patient;
heartRate;
bp;
ecg;
modalRef: BsModalRef;

title = 'grokonez';
description = 'Angular-WebSocket Demo';
public greetings: String[];
disabled = true;
name: String;
msg: String;
private stompClient = null;
  constructor(private service:PatientService,
    private modalService: BsModalService) { }

  ngOnInit() {
   this.getPatient();
   this.greetings = [];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    
  }
 



  getPatient(): void {
    this.service.getPatients()
    .subscribe(data => {console.log(data);
      this.patient= data;
    });
  }

  check(val){
    console.log(val);
    for(let Patient of this.patient){
      if( val == Patient.id){
        this.heartRate = Patient.heartRate;
        this.bp = Patient.bp;
        this.ecg = Patient.ecg;
        this.show_dialog = true;
      console.log( "hr",this.bp, this.ecg);
      }
    }
    }
 

 
 
  

    toggle(){
      this.show_dialog = !this.show_dialog;
      
    }


    setConnected(connected: boolean) {
      this.disabled = !connected;
   
      if (connected) {
        this.greetings = [];
      }
    }
   
    // connect() {
    //   console.log("HI connect");
      
    //   var socket = new SockJS("http://localhost:8080/gs-guide-websocket");
    //   this.stompClient = Stomp.Stomp.over(socket);
    //   this.stompClient.connect({}, function (frame) {
    //   this.setConnected(true);
    //     console.log('Connected: ' + frame);
    //     this.stompClient.subscribe('/topic/bp', function (greeting) {
        	
    //       this.showGreeting(JSON.parse(greeting.body).content, "BP");
    //     });
    //     this.stompClient.subscribe('/topic/heartRate', function (greeting) {
    //       this.showGreeting(JSON.parse(greeting.body).content, "HeartRate");
    //     });
    //     this.stompClient.subscribe('/topic/ecg', function (greeting) {
    //       this.showGreeting(JSON.parse(greeting.body).content, "ECG");
    //     });
    // });
    // }
    connect() {
      let that = this;
      //connect to stomp where stomp endpoint is exposed
      //let ws = new SockJS(http://localhost:8080/greeting);
      //const token: string = sessionStorage.getItem('token1');
      //let socket = new WebSocket("ws://localhost:8011/greeting");
       this.stompClient = Stomp.Stomp.client("ws://localhost:8011/greeting");
      this.stompClient.connect({}, function (frame) {
        that.stompClient.subscribe('/topic/heartRate', function (message) {
          // this.showGreeting(JSON.parse(message.body));
          that.greetings.push(message.body);
          that.heartRate = message.body;
        });
        that.stompClient.subscribe('/topic/ecg', function (message) {
          // this.showGreeting(JSON.parse(message.body));
          that.greetings.push(message.body);
          that.ecg = message.body;
        });
        that.stompClient.subscribe('/topic/bp', function (message) {
          that.greetings.push(message.body);
          that.bp = message.body;
        });
   
        let data = JSON.stringify({
          'name': 'Hari'
        })
        that.stompClient.send("/app/message", {}, data);
      });
    }
   
    disconnect() {
      this.modalRef.hide();
      console.log("HI disconnect");
      if (this.stompClient != null) {
        this.stompClient.disconnect();
      }
   
      this.setConnected(false);
      console.log('Disconnected!');
    }
   

   
    showGreeting(msg) {
      // this.msg = message;
      this.greetings.push(msg);
      console.log("************",msg);
      
    }
}
