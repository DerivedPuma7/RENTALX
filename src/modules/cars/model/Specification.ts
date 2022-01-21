import {v4 as uuidv4} from 'uuid';

class Specification{
   id?: string;
   name: string;
   description: string;
   car_id: string;

   constructor(){
      if(!this.id){
         this.id = uuidv4();
      }
   }
}

export default Specification;