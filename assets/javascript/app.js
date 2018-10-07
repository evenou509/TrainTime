// Initialize Firebase
var config = {
    apiKey: "AIzaSyCaGGqKEkP4CINFWWeLhnCP-WMD7gOYz6s",
    authDomain: "train-time-a3d73.firebaseapp.com",
    databaseURL: "https://train-time-a3d73.firebaseio.com",
    projectId: "train-time-a3d73",
    storageBucket: "",
    messagingSenderId: "576527040690"
};
firebase.initializeApp(config);


var trainData = firebase.database();

// Button for adding Train
$("#addTrainBtn").on('click', function (event) {
    event.preventDefault();
    console.log("click me")

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim()
    var destination = $("#destinationInput").val().trim()
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim()
    
    // variable to holding Train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    // Uploads train data to the database
    trainData.ref().push(newTrain);

    alert("Train Added!");

    // clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

// Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());

    // store everything in a varaible
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = moment(snapshot.val().firstTrain, "HH:mm").subtract(10, "years").format("X"); 
    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A")

    // train information 
    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    // create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arrival),
        $("<td>").text(minutes)
    );

    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);

});