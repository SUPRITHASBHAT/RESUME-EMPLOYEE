//getting the feedback stars and setting it in this page
var feedbackFormData = JSON.parse(localStorage.getItem("feedbackFormData"));
localStorage.setItem(
    feedbackFormData.name + "Rating",
    feedbackFormData.technicalRating
);
if (localStorage.getItem("TomRating")) {
    document.getElementById(
        "starTom" + localStorage.getItem("TomRating")
    ).checked = true;
}
if (localStorage.getItem("SuprithaRating")) {
    document.getElementById(
        "starSu" + localStorage.getItem("SuprithaRating")
    ).checked = true;
}
//getting the name of the clicked profile
function getProfileName(preferredName) {
    localStorage.setItem("preferredName", preferredName);
}
