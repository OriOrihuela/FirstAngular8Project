import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  /**
   * PROPERTIES OF THE COMPONENT
   */
  allowNewServer:boolean = false;
  serverCreationStatus:string = "No server was created!"

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    },2000)
   }

  ngOnInit() {
  }

  /**
   * MAIN METHODS
   */
  onCreateServer() {
    this.serverCreationStatus = "Server was created!";
  }

}
