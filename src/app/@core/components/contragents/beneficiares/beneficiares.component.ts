import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-beneficiares',
  templateUrl: './beneficiares.component.html',
  styleUrls: ['./beneficiares.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiaresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
