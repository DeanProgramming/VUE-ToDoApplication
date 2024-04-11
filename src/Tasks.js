
import { reactive } from 'vue'


export class ToDoItem {
    constructor(Title, Description, isDone = false, DeadLine = new Date(), Priority = 1) {
        this.Title = Title;
        this.Description = Description;
        this.isDone = isDone;
        this.DeadLine = DeadLine;
        this.Priority = Priority;
    }
}
  
export class ToDoListManager {
    constructor() {
        this.ToDoList = reactive({
        items: []});
        this.setupRandomChores();
    }

    setupRandomChores(){
        let householdChoresTitles = [
            "Vacuuming",
            "Dusting",
            "Mopping",
            "Doing the dishes",
            "Taking out the trash",
            "Laundry",
            "Cleaning the bathroom",
            "Making the bed",
            "Organizing the pantry",
            "Washing windows",
            "Sweeping the floors",
            "Watering plants",
            "Cleaning the refrigerator",
            "Changing bed sheets",
            "Cleaning the oven",
            "Wiping countertops",
            "Dusting blinds",
            "Cleaning mirrors",
            "Scrubbing the toilet"
        ];

        let householdChoresDescription = [
            "Using a vacuum cleaner to remove dirt, dust, and debris from carpets and floors, ensuring a clean and tidy living space.",
            "Wiping surfaces and objects with a cloth or duster to eliminate accumulated dust, preventing allergies and maintaining a polished appearance.",
            "Cleaning floors by dampening a mop with a cleaning solution, effectively removing stains, spills, and grime for a sanitized and refreshed atmosphere.",
            "Washing and drying dishes, utensils, and cookware to maintain a hygienic kitchen, promoting a healthy cooking environment.",
            "Disposing of garbage and waste, preventing unpleasant odors and maintaining cleanliness in living spaces.",
            "Washing, drying, and folding clothes and linens to ensure a fresh and organized wardrobe, as well as clean bedding and towels.",
            "Sanitizing surfaces, fixtures, and accessories, ensuring a germ-free and visually appealing bathroom space.",
            "Arranging and smoothing bed linens for a neat and inviting bedroom, contributing to a comfortable and organized sleeping area.",
            "Sorting and arranging food items, ensuring easy access and a well-maintained pantry space.",
            "Cleaning and polishing windows to enhance natural light and maintain a clear view, contributing to the overall cleanliness of the home.",
            "Using a broom to remove dirt, dust, and debris from floors, preventing the buildup of grime and maintaining a clean living space.",
            "Providing plants with the necessary hydration, fostering a healthy and vibrant indoor or outdoor garden.",
            "Removing expired food, spills, and odors, maintaining a hygienic and organized refrigerator.",
            "Replacing bed linens to promote a clean and comfortable sleep environment, preventing the accumulation of allergens.",
            "Removing grease, food residue, and stains from the oven, ensuring safe and efficient cooking.",
            "Cleaning and disinfecting kitchen and bathroom countertops to maintain a hygienic and visually pleasing space.",
            "Removing dust and allergens from window blinds, contributing to a cleaner and healthier living environment.",
            "Wiping and polishing mirrors to maintain a clear and streak-free reflection, enhancing the overall appearance of bathrooms and living spaces.",
            "Thoroughly cleaning and disinfecting the toilet bowl and surrounding areas to ensure a sanitary bathroom environment."
        ];

        for (let i = 0; i < 6; i++){
            const currentDate = new Date();
            const randomDays = Math.floor(Math.random() * 3) + 1;      
            const futureDate = new Date(currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000);

            let randomChanceCompleted = Math.floor(Math.random() * 3);

            let index = Math.floor(Math.random() * householdChoresTitles.length);
            let newTask = new ToDoItem(householdChoresTitles[index], householdChoresDescription[index], randomChanceCompleted === 0, futureDate, Math.floor(Math.random() * 5) + 1);
            this.ToDoList.items[i] = newTask;
            householdChoresTitles.splice(index, 1);
            householdChoresDescription.splice(index, 1); 
        } 
    }   
}
