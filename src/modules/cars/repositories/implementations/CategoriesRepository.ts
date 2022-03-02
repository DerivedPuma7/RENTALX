import Category from '../../entities/Category';
import {ICategoriesRepository} from '../ICategoriesRepository';
import {ICreateCategoryDTO} from '../ICategoriesRepository';


class CategoriesRepository implements ICategoriesRepository {
   private categories: Category[];

   //singleton
   private static INSTANCE: CategoriesRepository;

   private constructor() {
      this.categories = [];
   }

   public static getInstance(): CategoriesRepository{
      if(!CategoriesRepository.INSTANCE){
         CategoriesRepository.INSTANCE = new CategoriesRepository;
      }
      return CategoriesRepository.INSTANCE;
   }

   create({ name, description }: ICreateCategoryDTO) {
      const category = new Category();

      const created_at = new Date();
      Object.assign(category, {
         name,
         description,
         created_at
      });

      this.categories.push(category);
   }

   list(): Category[] {
      return this.categories;
   }

   findByName(name: string): Category {
      const category = this.categories.find((category) => category.name === name);
      return category;
   }

}

export default CategoriesRepository;