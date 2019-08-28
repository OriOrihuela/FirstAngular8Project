import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @Output("ftSelected") featureSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * BEHAVIOURS
   */
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
