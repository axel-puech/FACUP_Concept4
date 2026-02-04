//@input SceneObject parent

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

// If the user tap -> go to the next scene
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(onTap);

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}

function Update() {}

function Stop() {}

//___________________________Functions__________________________//

function onTap() {
  script.subScene.CallEnd(null);
}
