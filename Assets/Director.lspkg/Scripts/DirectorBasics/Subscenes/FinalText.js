//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Scene object of the final text"}
//@input SceneObject finalText
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Fade Duration"}
//@input float fadeDuration
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Delay before showing the final text"}
//@input float delay

// prend en input le scene object du text
// recoit un event de fin de game
// Affiche le texte final apres un delay

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

//________Listener___________//
const endOfGameListener = script.subScene.CreateListener(
  "endOfGameEvent",
  ShowFinalText,
);

var delayBeforeShowing = script.subScene.CreateEvent(
  "DelayedCallbackEvent",
  FadeInFinalText,
);

//__________________________Animations____________________________//
const fadeAnim = new Animation(
  script.getSceneObject(),
  script.fadeDuration,
  FadeAnimUpdate,
);

function FadeAnimUpdate(ratio) {
  script.finalText.getComponent("Component.Image").mainPass.baseColor =
    new vec4(1, 1, 1, ratio);
}

//_________________________Director functions_____________________//

function Start() {
  script.finalText.getComponent("Component.Image").mainPass.baseColor =
    new vec4(1, 1, 1, 0);
}
function OnLateStart() {}

function Update() {}

function Stop() {
  script.finalText.enabled = false;
}

//___________________________Functions__________________________//

function ShowFinalText() {
  script.finalText.enabled = true;
  delayBeforeShowing.event.reset(script.delay);
}

function FadeInFinalText() {
  fadeAnim.Start();
}
