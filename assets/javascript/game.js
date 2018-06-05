
// ############################### Global Variables and object ########################################
var questions = {
    tokyo: ['With over 35 million residents, what is the most populous city in the world?', "As of 2018, Tokyo is the most populated city on Earth. Known for its modern design, dedication to cutting-edge technology, and crowded streets, Tokyo has long had a reputation of being densely populated."],
    alaska: ['Which U.S. state has the longest coastline?', "Alaska's largest lake, Lake Iliamna, is roughly the size of Connecticut. Alaska has more coastline than the rest of the United States combined. Alaska is the only state to have coastlines on three different seas: the Arctic Ocean, Pacific Ocean, and Bering Sea"],
    france: ["Which country and it's territories cover the most time zones?", "France and its eight territories cover 12 time zones. France covers so many time zones because France has territories all over the world.", ],
    chile: ["What razor-thin country accounts for more than half of the western coastline of South America?", "With a toothy coastline of 2,650 miles (4,265 km), Chile accounts for more than half of the western coastline of South America. This razor-thin country is wedged between the Pacific Ocean and the Andes, the Earth's longest mountain range.", ],
    tigris: ["What river runs through Baghdad?", 'The Tigris river runs through Baghdad. It is about 1,150 miles (1,800 km) long. The name "Tigris" comes from Old Persian and translates as "the fast one".', ],
    canada: ["What country has the most natural lakes?", "Canada has more than half of all the natural lakes in the world. An impressive nine percent of the country is covered in fresh water.", ],
    peru: ["In what country can you visit Machu Picchu?", "Machu Picchu is a 15th-century Inca citadel located in the Cusco Region, Urubamba Province, Machupicchu District in Peru, above the Sacred Valley.", ],
    sudan: ["Which African nation has the most pyramids?", "Sudan is home to over 200 pyramids, more than twice that of Egypt.", ],
    tunisia: ["What African country served as the setting for Tatooine in Star Wars?", "Tatooine derived its name from Tataouine, a city in Tunisia located near the site where various scenes were filmed.", ],
    damascus: ["What is the oldest city in the world?", "Damascus, the capital of Syria, is widely believed to be the oldest continuously inhabited city in the world, with evidence of habitation dating back at least 11,000 years. Its location and persistence have made the city a nexus for civilizations come and gone. Today its metropolitan area is home to about 2.5 million people, and in 2008 it was named the Arab Capital of Culture.", ],
    australia: ["What is the flattest continent?", "Australia is one of the oldest continents, and because of the effects of 250 million years of erosion it has become the flattest land mass on earth.", ],
    canada: ["What country has the most coastline?", "If long walks on the beach are your thing, Canada's the place to be. The country's 243,000 km of coastline are the longest in the world. At a pace of about 20 km each day, the stroll would take 33 years. The shores of 52,455 islands are a big part of what makes the coastline so long.", ],
    nepal: ["Mount Everest, the tallest mountain in the world is located in Which country?", 'Mount Everest, the tallest mountain in the world is located in Nepal. In Nepali, Everest is called Sagarmatha or "Forehead of the Sky" and in Tibetan it is known as Qomolangma or "Mother of the Universe".', ],
    bhutan: ["Which is the only country that measures its prosperity with Gross National Happiness?", "Bhutan a tiny himalayan kingdom in Asia, measures prosperity by gauging its citizens' happiness levels not solely by the the Gross Domestic Product like rest of the world. Bhutan is 70% forest; it is the only carbon negative country in the world.", ],
};

var newKey;
var newQuestion;
var newDescription;
var wrongKeys = [];
var remainingChances = 5;
var yourScore = 0;
var keyOptions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var idWrongChar;
var audioCorrect = new Audio('assets/sound/correct.mp3');
var gameStart = new Audio('assets/sound/gameStart.mp3');
var wrongAnswer = new Audio('assets/sound/wrongAnswer.mp3')
var attempt = 0;

//Displaying rules
$(document).ready(function() {
    $('#rule1').show(5000);
    gameStart.play();

});

// Print number of questions
$('#remainingChances')
    .html(attempt);

//print score
$('#yourScore')
    .html(yourScore);

//Make game ready
makeGameReady();

//Captures user key press and 
mainLogic();

// ########################### Event listiners  #####################################################
$('#rulesOkButton')
    .click(displayHomePage);

$('#playMoreButton')
    .click(playMoreGame);

function reloadpage() {
    location.reload();
}

// ############################  Functions  #########################################################
function displayHomePage() {
    $('#questionPlaceHolder').show();
    $('.scoreAndremainingChances').show();
    $('#answerPlaceHolder').show();
    $('#wrongLettersPlaceHolder').show();
    // $('#navBar').show();  
    $('#displayRulesPanel').hide();
}

function makeGameReady() {
    //Assigning value returned by newKey() in the variable
    newKey = newKey1 = Object.keys(questions)[Math.floor(Math.random() * Object.keys(questions)
        .length)];

    //Retreiving question from the key and printing in the screen 
    newQuestion = questions[newKey][0];
    printQuestions(newQuestion);

    //Retriving new Question from the key and printing in screen 
    newDescription = questions[newKey][1];
    printDescription(newDescription);

    // printing boxes for answer
    printAnswerBoxes();

    //Print boxes to place wrong keys
    printWrongBoxes();

    // Print number of questions
    attempt += 1;
    $('#remainingChances')
        .html(attempt);

    //removing this question form object so it wont be asked again
    delete questions[newKey];
}

//Capture pressed key and execute respective functions
function mainLogic() {
    document.onkeyup = function() {
        var captured = (event.key)
            .toLowerCase();
        if (keyOptions.indexOf(captured) >= 0 && keyOptions.indexOf(captured) <= keyOptions.length) {
            var indexOfCapturedKey = newKey.indexOf(captured);
            var wrongKey;
            if (indexOfCapturedKey >= 0) {
                var idCorrectChar = "answerBox" + indexOfCapturedKey;
                document.getElementById(idCorrectChar)
                    .innerHTML = captured.toUpperCase(); //Jquery not working
                document.getElementById(idCorrectChar)
                    .style.backgroundColor = "green"; //Jquery not working
                document.getElementById(idCorrectChar)
                    .style.color = "white";
                newKey = newKey.substr(0, indexOfCapturedKey) + '#' + newKey.substr(indexOfCapturedKey + 1); // replaces correct char with #
                var numberOfRightCapture = newKey.match(/#/gi)
                    .length;
                if (numberOfRightCapture == newKey.length) {
                    gameOverWithWin();
                }

            } else {
                wrongKey = captured;
                wrongKeys.push(wrongKey); // wrong key is added to the array
                idWrongChar = "wrongLetter" + (wrongKeys.length - 1);
                document.getElementById(idWrongChar)
                    .style.backgroundColor = "red"; // jquery not working
                document.getElementById(idWrongChar)
                    .textContent = wrongKey.toUpperCase(); //jquery not working
                var remaningC = remainingChances - wrongKeys.length;
                // $('#remainingChances').html(remaningC);
                if (wrongKeys.length >= 5) {
                    gameOverWithLoss();
                }
            }
        } else {
        }
    }
}

// print new question on page
function printQuestions(newQuestion) {
    $('#questionPlaceHolder')
        .html(newQuestion);
}

//Print description on page function
function printDescription(newDescription) {
    $('#displayInfoPanelBody')
        .html(newDescription);
}

//function to create boxes for keys - check why j query not creating a div
function createBoxes(i) {
    var newDiv = document.createElement('div');
    newDiv.id = 'answerBox' + i;
    newDiv.className = "answerBoxes";
    $('#answerPlaceHolder')
        .append(newDiv);
}

// function to print placeholder boxes for the key
function printAnswerBoxes() {
    for (var i = 0; i < newKey.length; i++) {
        createBoxes(i);
    }
}

//Dynamically creates 5 boxes for wrong keys
function createWrongBoxes() {
    for (var i = 0; i < 5; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'wrongLetter' + i;
        newDiv.className = "wrongLetters";
        $('#wrongLettersPlaceHolder')
            .append(newDiv);
    }
}

// Prints 5 boxes for wrong
function printWrongBoxes() {
    createWrongBoxes();
}

//function to execute when user presses the incorrect key
function incorrectKey() {
    wrongKey = captured;
    wrongKeys.push(wrongKey); // wrong key is added to the array
    idWrongChar = "wrongLetter" + (wrongKeys.length - 1);
    // $('#idWrongChar').css('background-color', 'red');  // not working 
    document.getElementById(idWrongChar)
        .style.backgroundColor = "red";
    // $('#idWrongChar').text(wrongKey);  // not working 
    document.getElementById(idWrongChar)
        .textContent = wrongKey;
    var remaningC = remainingChances - wrongKeys.length;
    $('#remainingChances')
        .html(remaningC);
}

//Function to execute when user makes correct guess
function gameOverWithWin() {
    // Print number of questions
    yourScore += 1;
    audioCorrect.play();
    $('#yourScore')
        .html(yourScore);
    $('#displayInfoPanelHead')
        .html(newKey1);
    $("#displayInfoPanelHead")
        .css("background-color", "green");
    $("#displayInfoPanelFooter")
        .css("background-color", "green");
    // $("#displayInfoPanelBody").css("border", "2px solid green");
    $('#displayInfoPanel')
        .show(1100);
    $('#answerPlaceHolder')
        .hide();
    $('#wrongLettersPlaceHolder')
        .hide();
}

//Functions to exectue when user makes a wrong guess
function gameOverWithLoss() {
    // Print number of questions
    wrongAnswer.play();
    yourScore += 0;
    $('#yourScore')
        .html(yourScore);
    $('#displayInfoPanelHead')
        .html(newKey1);
    $("#displayInfoPanelHead")
        .css("background-color", "red");
    $("#displayInfoPanelFooter")
        .css("background-color", "red");
    $('#displayInfoPanel')
        .show(1100);
    $('#answerPlaceHolder')
        .hide();
    $('#wrongLettersPlaceHolder')
        .hide();
}

//Play more
function playMoreGame() {
    if (attempt < 9) {
        clearForNewGame();
    } else if (attempt < 10) {
        $('#playMoreButton').attr('value', 'Game Over - View Results');
        clearForNewGame();

    } else {
        $('#questionPlaceHolder').hide();
        $('.scoreAndremainingChances').hide();
        $('#answerPlaceHolder').hide();
        $('#wrongLettersPlaceHolder').hide();
        $('#displayInfoPanel').hide();
        $('#displayResultPanel').show();
        $('#askedQuestion').html(attempt);
        $('#answredQuestion').html(yourScore);
        var score = (yourScore / attempt) * 100;
        if (score < 70) {
            $('#displayResultPanelHead').css('background-color', "red");
            $('#displayResultPanelFooter').css('background-color', "red");
            $('#scorePercentage').html(score + '  (Fail)');
        } else {
            $('#scorePercentage').html(score + ' (Pass)');
        }
    }
}

function clearForNewGame() {
    remainingChances = 5;
    wrongKeys = [];
    $('#displayInfoPanel')
        .hide();
    $('#questionPlaceHolder')
        .empty();
    $('#answerPlaceHolder')
        .empty();
    $('#wrongLettersPlaceHolder')
        .empty();
    // $('#remainingChances').text(5);  // change it so this code can be removed
    $('#answerPlaceHolder')
        .show();
    $('#wrongLettersPlaceHolder')
        .show();
    makeGameReady();
    mainLogic();
}

//Reload Page
$('#resetGame').click(function() {
    location.reload();
});
