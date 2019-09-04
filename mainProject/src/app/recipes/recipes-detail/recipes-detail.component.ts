import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
  /**
   * PROPERTIES 
   */
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
