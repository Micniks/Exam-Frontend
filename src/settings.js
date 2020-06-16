function URLS() {
  function backendURL() {
    const URL = "https://jokerthewizard.dk/Exam-Backend";
    //const URL = "http://localhost:8080/startcode";
    return URL;
  }

  function RecipeURL() {
    const URL = backendURL() + "/api/recipe";
    return URL;
  }

  function MenuPlanURL() {
    const URL = backendURL() + "/api/plan";
    return URL;
  }

  return {
    backendURL,
    RecipeURL,
    MenuPlanURL
  };
}

const settingUrl = URLS();

export default settingUrl;
