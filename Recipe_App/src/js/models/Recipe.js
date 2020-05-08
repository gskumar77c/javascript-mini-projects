export default class Recipe{
    
    getRecipe(id,res){
            this.id = id;
            this.title = res[id].display.displayName;
            this.source = res[id].display.source.sourceDisplayName;
            this.img = res[id].display.images[0];
            this.url = res[id].display.source.sourceRecipeUrl;
            this.ingredients = res[id].content.ingredientLines;
            this.time = res[id].content.details.totalTime;
            this.result = res[id];
            this.servings = 4;
      }

      parseIngredients(){
          const newIngredients = this.ingredients.map(el=>{
              let objIng = {
                  count : (Math.ceil((el.quantity)*100))/100,
                  unit : el.unit,
                  ingredient: el.ingredient
              }
              return objIng;
          });

          this.ingredients = newIngredients;
      }
      parseIngredients7(){
          const longVal = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds']
          const shortVal = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound']
          const units = [...shortVal,'kg','g'];
          const newIngredients = this.ingredients.map(el=>{
            let ingredient = el.wholeLine.toLowerCase();
            longVal.forEach((unit,i)=>{
                ingredient = ingredient.replace(unit,shortVal[i]);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g,''); 
            
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2=>units.includes(el2));
            let objIng;
            if(unitIndex > -1){

                const arrCount = arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                }
                else{
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng = {
                    count:count,
                    unit:arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }
            
            
            }
            else if(unitIndex === -1){
                objIng = {
                    count:1,
                    uint:'',
                    ingredient: ingredient,
                }
            }
            else if(parseInt(arrIng[0],10)){
                objIng = {
                    count : parseInt(arrIng[0],10),
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                }
            }
            
            
            return objIng;
        });

          this.ingredients = newIngredients;
           // console.log(this.ingredients);
      }

      updateServings(type){
          const newservings = type==='dec'?this.servings-1:this.servings+1;

          this.ingredients.forEach(ing=>{
              ing.count = ing.count * (newservings/this.servings);
          });

          this.servings = newservings;
      }


}
