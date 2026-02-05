//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Hint Button"}
//@input SceneObject hintImage
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Fade duration - delay before fade out"}
//@input float fadeDuration
//@input float delayBeforeFadeOut

// prend en input le scene object du hint image
// Au lateStart fade in
// Apres un delay -> fade out et enable false

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

//________DelayEvent________//
var hideHintAfterDelay = script.subScene.CreateEvent(
  "DelayedCallbackEvent",
  FadeOutHint,
);

//__________________________Animations____________________________//

const fadeAnim = new Animation(
  script.getSceneObject(),
  script.fadeDuration,
  FadeAnimUpdate,
);

// fadeAnim.Easing = QuadraticIn;

function FadeAnimUpdate(ratio) {
  script.hintImage.getComponent("Component.Image").mainPass.baseColor =
    new vec4(1, 1, 1, ratio);
}

fadeAnim.AddTimeCodeEvent(0, function () {
  // After fade out, disable the hint image
  script.hintImage.enabled = false;
});

//_________________________Director functions_____________________//

function Start() {
  script.hintImage.enabled = true;
  script.hintImage.getComponent("Component.Image").mainPass.baseColor =
    new vec4(1, 1, 1, 0);
}

function OnLateStart() {
  fadeAnim.Start();
  hideHintAfterDelay.event.reset(script.delayBeforeFadeOut);
}

function Update() {}

function Stop() {
  script.hintImage.enabled = false;
  fadeAnim.Reset();
}

//___________________________Functions__________________________//

function FadeOutHint() {
  fadeAnim.GoTo(0);
}
