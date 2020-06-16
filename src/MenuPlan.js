import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function MenuPlan() {
  const [menuPlans, setMenuPlans] = useState([]);
  const [newName, setNewName] = useState();

  const URL = settingUrl.MenuPlanURL();

  useEffect(() => {
    fetchMenuPlans();
  }, []);

  function fetchMenuPlans() {
    facade.fetchMenuPlans(URL, setMenuPlans);
  }

  function makeNewMenuPlan() {
    facade.addNewMenuPlan(URL, newName, menuPlans, setMenuPlans);
    setNewName("");
  }

  function changeHandler(event) {
    setNewName(event.target.value);
  }

  function deleteMenuPlan(event) {
    facade.deleteMenuPlan(URL, event.target.value, setMenuPlans);
  }

  return (
    <div>
      <h1 align="center">Menu Plans</h1>
      <p align="center">
        Add new Menu Plan: {"  "}
        <input
          type="text"
          placeholder="Week x..."
          value={newName}
          onChange={changeHandler}
        />
        <button onClick={makeNewMenuPlan}>Add new List</button>
      </p>
      <br />
      {menuPlans && (
        <table align="center" border="1" width="90%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Recipes</th>
              <th>Shopping List</th>
              <th width="10%">
                <button onClick={fetchMenuPlans}>Refresh List</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {menuPlans.map((menuPlan) => {
              return (
                <tr key={menuPlan.id}>
                  <td align="center">{menuPlan.menuName}</td>
                  <td align="center">
                    {menuPlan.dayPlans.dayPlans.map((dayPlan) => {
                      return (
                        <>
                          {dayPlan.recipeName} for {dayPlan.NumberOfServings}{" "}
                          <br />
                        </>
                      );
                    })}
                  </td>
                  <td align="center">
                    {menuPlan.shoppingList.ingredients.map((ingredient) => {
                      return (
                        <>
                          {ingredient.amount}x {ingredient.name}
                          <br />
                        </>
                      );
                    })}{" "}
                  </td>
                  <td align="center">
                    <button value={menuPlan.id} onClick={deleteMenuPlan}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <br />
      <br />
    </div>
  );
}
