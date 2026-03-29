import { Component, input, InputSignal } from '@angular/core';
import { Icategory } from '../../../core/models/Icategory/icategory.interface';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
    CategoryData:InputSignal<Icategory> = input.required<Icategory>()

}
