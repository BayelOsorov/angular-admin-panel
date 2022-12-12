import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-list-contragents',
  templateUrl: './list-contragents.component.html',
  styleUrls: ['./list-contragents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListContragentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
