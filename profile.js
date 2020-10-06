//AJAX call the data from profile.json
$.ajax("profile.json")
    .then(function (ajaxData) {
        //on success
        //getting the name from the index page to fetch the data from the json
        var preferredName = localStorage.getItem("preferredName");
        $("title").text(preferredName);
        var profileData = ajaxData.response[preferredName];
        $(".profile-image").attr("src", preferredName + ".jpg");
        var sections = profileData.sections;
        //populating the sections dynamically from the json
        Object.keys(sections).forEach((ele, index) => {
            $("#profileItems").append(
                '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#section' +
                index +
                '">' +
                ele +
                "</a></li>"
            );
            $("#section" + index)
                .find("h2")
                .text(ele);
            var cloneS = $(".section" + index);
            //cloning an element a fixed number of times based on the length of the section from the json
            for (var i = 1; i < profileData.sections[ele].length; i++) {
                cloneS.clone().appendTo($(".section" + index).parent());
            }
            //populating the values on the elements
            for (var j = 0; j < profileData.sections[ele].length; j++) {
                if (profileData.sections[ele][j].position) {
                    $(".section" + index)
                        .eq(j)
                        .find("h3")
                        .html(profileData.sections[ele][j].position);
                }
                if (profileData.sections[ele][j].projectDesc) {
                    $(".section" + index)
                        .eq(j)
                        .find("p")
                        .text(profileData.sections[ele][j].projectDesc);
                }
                if (profileData.sections[ele][j].period) {
                    $(".section" + index)
                        .eq(j)
                        .find("span")
                        .text(profileData.sections[ele][j].period);
                }
                if (profileData.sections[ele][j].company) {
                    $(".section" + index)
                        .eq(j)
                        .find("h3")
                        .next()
                        .text(profileData.sections[ele][j].company);
                }
            }
        });
        //populating other details from json
        $("#profileabout").text(profileData.sections.about);
        $(".full-name").text(profileData.name);
        $(".profile-position").text(profileData.role);
        $("#profileEmail").text(profileData.emailId);
        $("#profileEmail#profileContact").attr(
            "href",
            "mailto:" + profileData.emailId
        );
        //loading the social media accounts dynamically from the json
        Object.keys(profileData.socialMedia).forEach((socialEle) => {
            $(".profile-socialMedia").append(
                '<a class="social-icon grey-color" rel="noopener noreferrer" href="' +
                profileData.socialMedia[socialEle] +
                '"><i class="fa fa-' +
                socialEle +
                '"></i></a>'
            );
        });
        //pre-populating the name for the feedback beforehand
        $("#nameFeedback").val(profileData.preferredName);
    })
    .fail(function (error) {
        // on
        alert(
            "failed to fetch data because of" + error.message + ". Please try again!"
        );
    });
//on feedback submit
function submitFeedback() {
    alert("Submitted succesfully");
    var name = document.getElementById("nameFeedback").value;
    var roleAndExpectation = document.getElementById("yes") ? "Yes" : "No";
    var vocalSkills = document.getElementById("vocalSkills").value;
    var radios = document.getElementsByName("rate");
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            var technicalRating = radios[i].value;
            break;
        }
    }
    console.log(
        "feedback: ",
        name,
        roleAndExpectation,
        vocalSkills,
        technicalRating
    );
    var feedbackFormData = {
        name: name,
        roleAndExpectation: roleAndExpectation,
        vocalSkills: vocalSkills,
        technicalRating: technicalRating,
    };
    localStorage.setItem("feedbackFormData", JSON.stringify(feedbackFormData));
}

//show and hide fields on click
function toggleDisplay(ele) {
    $(ele).siblings("p").toggle();
}
