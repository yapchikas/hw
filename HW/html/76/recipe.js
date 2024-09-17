/* eslint-disable no-unused-vars */
/* global $ */

(function () {
    'use strict';


    const recipeNameElem = $('#recipe-name');
    const recipeImgElem = $('#recipe-image');
    const recipeIngText = $('#ingredients-text');
    const recipeIngredients = $('#recipe-ingredients');
    const recipeList = $('#recipe-select');

    function noRecipeSelected() {
        recipeNameElem.text('Select a Recipe To Get Started');
        recipeImgElem.hide();
        recipeIngText.hide();
    }

    function showElements() {
        recipeImgElem.show();
        recipeIngText.show();
    }


    function setRecipeName(name) {
        recipeNameElem.text(name);
    }

    function setRecipeImg(url) {
        recipeImgElem.attr('src', `images/${url}.jpeg`);
    }

    function setIngredients(array) {
        recipeIngredients.empty();
        array.forEach(element => {
            recipeIngredients.append(`<li>${element}</li>`);

        });

    }

    async function getListOfRecipes() {
        const recipeListJSON = await fetch('recipelist.json');
        const recipeListText = await recipeListJSON.json();
        recipeListText.forEach(element => {
            recipeList.append(`<option>${element}</option>`);
        });
    }

    async function getRecipe(recipeName) {
        const theRecipeJSON = await fetch(`${recipeName}.json`);
        const theRecipeText = await theRecipeJSON.json();
        setRecipeName(theRecipeText.name);
        setIngredients(theRecipeText.ingredients);
        setRecipeImg(recipeName);
    }
    
    noRecipeSelected(); 
    getListOfRecipes();

    recipeList.change(
        function () { showElements();
            getRecipe($(this).val());
        }
    );

}());