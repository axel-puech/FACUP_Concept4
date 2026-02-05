//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Buttons Rankings"}
//@input SceneObject[] buttons

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//
var pickingAnimFinished = false;

//________Caller____________//
const rankingButtonCaller = script.subScene.CreateCaller(
  "rankingButtonEvent",
  0,
);

//________Listener___________//
const animCountryPickingListener = script.subScene.CreateListener(
  "animCountryPickingEvent",
  TogglePickingAnimFinished,
);

// _______________________Setup Interactions______________________//
// the setup interaction is made here instead of in Start function, otherwise
// it will add multiple function to onTap when re-entering the subscene
script.buttons.forEach(function (button, index) {
  var interaction = button.getComponent("Component.InteractionComponent");

  interaction.onTap.add(function () {
    if (pickingAnimFinished) {
      rankingButtonCaller.Call(index + 1);
      interaction.enabled = false;
    }
    pickingAnimFinished = false;
  });
});

//_________________________Director functions_____________________//

function Start() {}

function OnLateStart() {
  ResetInteractions();
}

function Update() {}

function Stop() {}

//___________________________Functions__________________________//

function ResetInteractions() {
  script.buttons.forEach(function (button, index) {
    var interaction = button.getComponent("Component.InteractionComponent");
    interaction.enabled = true;
  });
}

function TogglePickingAnimFinished() {
  pickingAnimFinished = true;
}
