import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  /**
   * CONSTRUCTOR
   */
  constructor() {}

  /**
   * GETTERS
   */
  getClose() {
    return this.close;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {}

  onClose() {
    this.getClose().emit();
  }
}
