import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  /**
   *  PROPERTIES
   */
  id: Number;
  editMode: boolean = false;
  
  /**
   * CONSTRUCTOR
   */
  constructor(private route: ActivatedRoute) { }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });
  }

}
