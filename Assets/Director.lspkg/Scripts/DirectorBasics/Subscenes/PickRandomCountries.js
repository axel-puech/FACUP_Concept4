//@input SceneObject parent

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

//_________________________Director functions_____________________//

function Start() {
  PickRandomCountryIndex();
}
function OnLateStart() {
  print("Picked Countries: " + global.pickedCountries);
}
function Update() {}

function Stop() {
  global.pickedCountries = [];
  global.currentRoundIndex = 0;
}

//___________________________Functions__________________________//

function PickRandomCountryIndex() {
  // pick un random between 0 and totalRounds -1 -> this is the england round
  var englandRoundPick = Math.floor(Math.random() * (global.totalRounds - 1)); // 0 - 9

  for (var i = 0; i < global.totalRounds; i++) {
    // if this is the england round -> pick england (0)
    if (i === englandRoundPick) {
      global.pickedCountries.push(0); // 0 = England
    } else {
      // generate random country index between 1 and totalCountries -1
      var randomCountryId =
        Math.floor(Math.random() * (global.totalCountries - 1)) + 1; // 1 - 19
      // if this country has already been picked, generate a new one
      while (global.pickedCountries.includes(randomCountryId)) {
        randomCountryId =
          Math.floor(Math.random() * (global.totalCountries - 1)) + 1; // 1 - 19
      }
      // add the picked country to the list
      global.pickedCountries.push(randomCountryId);
    }
  }
}
