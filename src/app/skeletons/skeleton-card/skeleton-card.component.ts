import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss'],
})
export class SkeletonCardComponent implements OnInit {
  @Input() loadingLine: string = '';
  constructor() {}

  ngOnInit(): void {}
}
