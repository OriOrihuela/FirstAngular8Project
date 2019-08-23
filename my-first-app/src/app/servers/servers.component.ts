import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent implements OnInit {
  /**
   * PROPERTIES OF THE COMPONENT
   */
  allowNewServer: boolean = false;
  serverCreationStatus: string = "No server was created!";
  serverName: any = "TestServer";
  serverCreated: boolean = false;
  servers = ["Test Server 1", "Test Server 2"];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {}

  /**
   * MAIN METHODS
   */
  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus =
      "Server was created! Name is " + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
