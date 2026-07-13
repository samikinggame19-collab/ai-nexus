function addActivity(text){

    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift(text);

    activities = activities.slice(0,5);

    localStorage.setItem("activities", JSON.stringify(activities));

}