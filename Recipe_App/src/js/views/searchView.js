// export const add = (a,b) => a + b;
// export const mul = (a,b) => a*b;
// export const id = 27;
import {elements, elementStrings} from './base';
export const getInput = ()=>{
    return elements.searchInput.value;
}

export const clearInput = ()=>{
    elements.searchInput.value='';
}

export const clearResults = ()=>{
    elements.serachResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const limitRecipeTitle = (title,limit=17)=>{
    const newArr = []
    if(title.length > limit){
        title.split(' ').reduce((acc,curr)=>{
            if(acc+curr.length <= limit){
                newArr.push(curr);
            }
            return acc+curr.length;
        },0);

        return `${newArr.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe=>{
    const markup = `
            <li>
                <a class="results__link results__link--active" href="#${recipe.id}">
                    <figure class="results__fig">
                        <img src="${recipe.display.images[0]}" alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.display.displayName)}</h4>
                        <p class="results__author">${recipe.display.source.sourceDisplayName}</p>
                    </div>
                </a>
            </li>`;
            elements.serachResList.insertAdjacentHTML('beforeend',markup);
}

// export const renderResults = recipes =>{
//     recipes.forEach(renderRecipe);
// }

const createButton = (page,type)=>`
            <button class="btn-inline results__btn--${type}" data-goto=${type ==='prev'?page-1:page+1}>
            <span>Page ${type ==='prev'?page-1:page+1}</span>    
            <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type ==='prev'?'left':'right'}"></use>
                </svg>
                
            </button>
`
const renderButtons = (page,numResults,resPerPage)=>{
    const pages = Math.ceil(numResults/resPerPage);
    let butnext;
    if(page===1){
        butnext = createButton(page,'next');
    }
    else if(page===pages){
        butnext = createButton(page,'prev');
    }
    else{
        butnext = `${createButton(page,'prev')}
                    ${createButton(page,'next')}`;
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',butnext);
};



export const renderResults = (recipes,page=1,resPerPage=10) =>{
    const start = (page-1)*resPerPage;
    let end = page*resPerPage;
    if(end > recipes.length) end = recipes.length;
    recipes.slice(start,end).forEach(renderRecipe);

    renderButtons(page,recipes.length,resPerPage);

}