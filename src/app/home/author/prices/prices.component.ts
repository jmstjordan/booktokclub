import { Component } from '@angular/core';
import { BookBoostService } from '../../../../services/bookboost.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prices',
  imports: [CommonModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent {
  adPrices = {};

  constructor(private bookBoostService: BookBoostService) {}

  ngOnInit(): void {
    this.bookBoostService.getPrices().subscribe((adPrices) => this.adPrices = adPrices);
  }
}
