export class Recipe {
    /**
     * PROPERTIES
     */
    name: string;
    description: string;
    imagePath: string;

    /**
     * CONSTRUCTOR
     */
    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
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
}