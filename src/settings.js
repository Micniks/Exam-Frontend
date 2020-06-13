
function URLS(){

    function backendURL() {
        const URL = "https://andreas-cph.com/CA3-Gruppe3";
        return URL;
    }

    function externalApi() {
        const URL = "https://andreas-cph.com/CA3-Gruppe3/api/info/external";
        return URL;
    }

    return {
        backendURL,
        externalApi
    }

}

const settingUrl = URLS();

export default settingUrl;