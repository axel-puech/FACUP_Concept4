//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"All the side numbers Scene Objetcs"}
//@input SceneObject[] sideNumbers

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//
//________Listener___________//
const rankingButtonListener = script.subScene.CreateListener(
  "rankingButtonEvent",
  OnButtonClicked,
);

//_________________________Director functions_____________________//

function Start() {
  // Hide all the side numbers at the start
  script.sideNumbers.forEach((sideNumber, index) => {
    sideNumber.enabled = false;
  });
}
function OnLateStart() {}

function Update() {}

function Stop() {}

//___________________________Functions__________________________//
function OnButtonClicked(selectedButtonIndex) {
  script.sideNumbers[selectedButtonIndex - 1].enabled = true;
}
