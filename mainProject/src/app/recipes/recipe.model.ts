import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    /**
     * PROPERTIES
     */
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];

    /**
     * CONSTRUCTOR
     */
    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}