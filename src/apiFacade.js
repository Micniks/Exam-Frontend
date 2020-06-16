import settingUrl from "./settings";

const URL = settingUrl.backendURL(); //Change this to your own URL

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loginRoles");
  };

  const setRoles = (roles) => {
    localStorage.setItem("loginRoles", roles);
  };

  const getRoles = () => {
    return localStorage.getItem("loginRoles");
  };

  const isAdmin = () => {
    const isAdmin = String(getRoles()).includes("admin");
    return isAdmin;
  };

  const isUser = () => {
    const isAdmin = String(getRoles()).includes("user");
    return isAdmin;
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        console.log(res);
        setRoles(res.roles);
      });
  };

  const fetchUserData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
  };

  const fetchAdminData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
  };

  const fetchRecipes = (URL, setRecipes) => {
    const options = facade.makeOptions("GET", true);
    fetch(URL, options)
      .then(handleHttpErrors)
      .then((data) => {
        setRecipes(data.recipes);
      });
  };

  const fetchRecipe = (URL, setRecipe) => {
    const options = facade.makeOptions("GET", true);
    fetch(URL, options)
      .then(handleHttpErrors)
      .then((data) => {
        setRecipe(data);
      });
  };

  const deleteMenuPlan = (URL, id, setMenuPlans) => {
    const options = facade.makeOptions("DELETE", true);
    fetch(URL + "/" + id, options).then(() => {
      fetchMenuPlans(URL, setMenuPlans);
    });
  };

  const fetchMenuPlans = (URL, setMenuPlans, setChoosenMenuPlan) => {
    const options = facade.makeOptions("GET", true);
    fetch(URL, options)
      .then(handleHttpErrors)
      .then((data) => {
        setMenuPlans(data.menuPlans);
        setChoosenMenuPlan && setChoosenMenuPlan(data.menuPlans[0].id);
      });
  };

  const addNewMenuPlan = (URL, newName, menuPlans, setMenuPlans) => {
    let body = {
      id: 0,
      menuName: newName,
      dayPlans: {
        dayPlans: [],
      },
      shoppingList: {
        ingredients: [],
      },
      user: "",
    };
    const options = facade.makeOptions("POST", true, body);
    fetch(URL, options)
      .then(handleHttpErrors)
      .then((data) => {
        setMenuPlans(menuPlans.concat([data]));
      });
  };

  const addRecipeToMenuPlan = (URL, servingAmount, choosenMenuPlan, recipe) => {
    const options = facade.makeOptions("PUT", true, recipe);
    fetch(
      URL + "?servings=" + servingAmount + "&menuPlanID=" + choosenMenuPlan,
      options
    )
      .then(handleHttpErrors)
      .then((data) => {
        console.log(data);
      });
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchUserData,
    fetchAdminData,
    isAdmin,
    isUser,
    fetchRecipe,
    fetchRecipes,
    fetchMenuPlans,
    addNewMenuPlan,
    addRecipeToMenuPlan,
    deleteMenuPlan,
  };
}

const facade = apiFacade();
export default facade;
