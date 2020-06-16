import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function Admin() {
  const [menuPlans, setMenuPlans] = useState([]);

  const URL = settingUrl.MenuPlanURL();

  useEffect(() => {
    fetchMenuPlans();
  }, []);

  function fetchMenuPlans() {
    facade.fetchMenuPlans(URL + "/all", setMenuPlans);
  }

  return (
    <div>
    <h1 align="center">Menu Plans</h1>
    <br />
    <p align="center"><button onClick={fetchMenuPlans}>Refresh List</button></p>
    {menuPlans && (
      <table align="center" border="1" width="90%">
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Recipes</th>
            <th>Shopping List</th>
          </tr>
        </thead>
        <tbody>
          {menuPlans.map((menuPlan) => {
            return (
              <tr key={menuPlan.id}>
                <td align="center">{menuPlan.user}</td>
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
