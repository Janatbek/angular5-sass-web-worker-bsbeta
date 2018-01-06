import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),
    ]),
  ]
})

export class AppComponent implements OnInit {
  displayDataSet: any = undefined;
  public title = 'app';
  public worker: Worker;
  state: string = 'small';

  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  ngOnInit(): void {
    if (Worker) {
      this.initMethod();
    }
  }

  initMethod(): any {
    this.worker = new Worker('assets/js/web-worker/worker.js');

    this.worker.addEventListener('message', (e) => {

      this.displayDataSet = JSON.parse(e.data);

    }, false)

    this.worker.postMessage('https://jsonplaceholder.typicode.com/todos');

    if(this.displayDataSet){
      debugger;
      this.worker.terminate();
    }
    
  }

  filterData(){
    console.log('logging while I wait data');
    console.log('this.displayDataSet' , this.displayDataSet)
  }
}
