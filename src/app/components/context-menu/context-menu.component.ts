import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ZoomState } from '../../models/zoom-state';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {

  @Input() x=0;
  @Input() y=0;
  @Output() initMap: EventEmitter<any> = new EventEmitter();

  constructor() { }

  showWorld() {
    this.initMap.emit();
  }

}
