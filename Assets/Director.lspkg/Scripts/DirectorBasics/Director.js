//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = null;

script.createEvent("OnStartEvent").bind(OnStart);

global.roundNumber = 0;
global.totalRounds = 10;
global.totalCountries = 20;
global.pickedCountries = [];

function OnStart() {
  director = new global.Director(
    script,
    script.subSceneParent,
    script.useFrontBack,
    OnSceneEnded,
  );
}

function OnSceneEnded(sceneName, params) {
  if (sceneName === "IntroScene") {
    director.GoToScene("MainScene", false, false);
  } else if (sceneName === "MainScene") {
    director.GoToScene("OutroScene", false, false);
  } else if (sceneName === "OutroScene") {
    director.GoToScene("IntroScene", false, false);
  }
}
