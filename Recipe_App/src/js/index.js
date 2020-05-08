import Search from './models/Search';
import {elements, renderLoader, removeLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
//Global state of the app
/*
-Search Object
-current recipe object
-shopping list object
-linked recipies
*/
const state = {};


const controlSearch = async ()=>{
    //1) get query
    const query = searchView.getInput();
    //console.log(query);

    if(query){
        state.search = new Search(query);
        
        searchView.clearInput();
        searchView.clearResults();
        removeLoader();
        renderLoader(elements.searchRes);

        try{
            await state.search.getResults();

            state.search.setIds();
            console.log(state.search.res[1].id);
            console.log(state.search.res[0].display.displayName);
    
            removeLoader();
            searchView.renderResults(state.search.res);
            
        }
        catch(err){
            alert(err);
        }
       
        
    }

    
}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.res,goToPage);
    }
});

const controlRecipe = ()=>{
    const id = window.location.hash.replace('#','');
    if(id){
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        state.recipe = new Recipe();
        state.recipe.getRecipe(id,state.search.res);
        state.recipe.parseIngredients();
        console.log(state.recipe);
        removeLoader();
        recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
    }

}
window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe);

state.likes = new Likes();
const controlLike = ()=>{
    if(!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;
    if(state.likes.isLiked(currentId)){
        state.likes.deleteLike(currentId);
        likesView.toggleLike(false);
        likesView.deleteLike(currentId);
    }
    else{
        const newLike = state.likes.addLike(currentId,state.recipe.title,state.recipe.source,state.recipe.img);
        likesView.toggleLike(true);
        likesView.renderLike(newLike);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


const controlList = ()=>{
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el=>{
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
    });
}

elements.shopping.addEventListener('click',event=>{
    const id = event.target.closest('.shopping__item').dataset.itemid;

    if(event.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
    else if(event.target.matches('.shopping__count-value')){
        const val = parseFloat(event.target.value);
        state.list.updateCount(id,val);
    }
});


elements.recipe.addEventListener('click',event=>{
    if(event.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
            
    }
    else if(event.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }
    else if(event.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});


