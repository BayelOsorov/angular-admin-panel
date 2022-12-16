import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
