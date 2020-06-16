import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState();
  const [search, setSearch] = useState();
  const [menuPlans, setMenuPlans] = useState([]);
  const [choosenMenuPlan, setChoosenMenuPlan] = useState();
  const [servingAmount, setServingAmount] = useState(1);
  var step = 1;
  var count = 1;

  const URL = settingUrl.RecipeURL();
  const menuPlanURL = settingUrl.MenuPlanURL();

  useEffect(() => {
    fetchRecipes();
    fetchMenuPlans();
  }, []);

  function fetchRecipes() {
    facade.fetchRecipes(URL, setRecipes);
  }

  function fetchMenuPlans() {
    facade.fetchMenuPlans(menuPlanURL, setMenuPlans, setChoosenMenuPlan);
  }

  function searchRecipes(event) {
    facade.fetchRecipes(URL + "/search?name=" + search, setRecipes);
  }

  function selectRecipe(event) {
    let fetchURL = URL + "/id/" + event.target.value;
    facade.fetchRecipe(fetchURL, setRecipe);
    step = 1;
  }

  function changeHandler(event) {
    setSearch(event.target.value);
  }

  function numberChangeHandler(event) {
    setServingAmount(event.target.value);
  }

  function onSelect(event) {
    setChoosenMenuPlan(event.target.value);
  }

  function addToMenuPlan() {
    let servings = servingAmount > 0 ? servingAmount : 1;
    facade.addRecipeToMenuPlan(menuPlanURL, servings, choosenMenuPlan, recipe);
    setRecipe();
    setServingAmount(1);
  }

  return (
    <div>
      <br />
      <div>
        <h1 align="center">Recipes</h1>
        <div>
          {recipe && (
            <div border="1">
              <p align="center">
                <button
                  onClick={() => {
                    setRecipe();
                  }}
                >
                  Close
                </button>
              </p>
              <table align="center" border="1">
                <thead>
                  <tr>
                    <th>
                      {recipe.name}
                      <br />
                    </th>
                    <th>
                      Add to Menu Plan:
                      <select onChange={onSelect}>
                        {menuPlans.map((menuPlan) => (
                          <option
                            key={menuPlan.id}
                            value={menuPlan.id}
                            selected={menuPlan.id == choosenMenuPlan}
                          >
                            {menuPlan.menuName}
                          </option>
                        ))}
                      </select>
                      {"   "}
                      <button onClick={addToMenuPlan}>Select</button> <br />
                      Number of servings:{" "}
                      <input
                        type="number"
                        onChange={numberChangeHandler}
                        min="1"
                        value={servingAmount}
                      />
                      {"   "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">
                      <b>Category</b>
                    </td>
                    <td>{recipe.category}</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <b>Preparation time</b>
                    </td>
                    <td>{recipe.preparation_time}</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <b>Ingredient list</b>
                    </td>
                    <td>
                      <table>
                        {recipe.ingredient_list.map((ingredient) => {
                          return (
                            <tr key={count++}>
                              {ingredient.amount}x {ingredient.name}
                            </tr>
                          );
                        })}
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4>Directions</h4>
              {recipe.directions.map((s) => {
                return (
                  <p>
                    {step++}. {s}
                    <br />
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <br />
        <p align="center">
          Search for recipes by name:
          <input
            type="text"
            placeholder="Recipe Name..."
            value={search}
            onChange={changeHandler}
          />
          <button onClick={searchRecipes}>search</button>
        </p>
        <br />
        <table align="center" border="1" width="90%">
          <thead>
            <tr>
              <th width="40%">name</th>
              <th width="30%">category</th>
              <th width="30%">preparation time</th>
              <th>
                <button onClick={fetchRecipes}>Search All</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => {
              return (
                <tr key={recipe.id}>
                  <td align="center">{recipe.name}</td>
                  <td align="center">{recipe.category}</td>
                  <td align="center">{recipe.preparation_time} min.</td>
                  <td align="center">
                    <button onClick={selectRecipe} value={recipe.id}>
                      Select
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    </div>
  );
}
