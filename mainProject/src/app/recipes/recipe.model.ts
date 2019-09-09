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

    /**
     * GETTERS
     */
    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getImagePath() {
        return this.imagePath;
    }

    getIngredients() {
        return this.ingredients;
    }
}