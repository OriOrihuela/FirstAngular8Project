import { Component } from '@angular/core';

@Component({
    selector: "app-server",
    templateUrl: "./server.component.html"
})
export class ServerComponent {
    /**
     * PROPERTIES OF THE COMPONENT
     */
    serverId:number = 10;
    serverStatus:string = "offline";

    /**
     * MAIN METHODS
     */
     getServerStatus() {
        return this.serverStatus;
     }
}