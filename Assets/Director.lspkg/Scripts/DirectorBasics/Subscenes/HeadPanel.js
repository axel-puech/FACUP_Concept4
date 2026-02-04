//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Define the scrolling animation timings for the picking animation"}
//@input float[] scrollingTimeDurations
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Head Panel & Materials"}
//@input Asset.Material headPanelMaterial
//@input SceneObject headPanel
//@ui {"widget":"label", "label":"All Flags Textures - Respect Order"}
//@input Asset.Texture[] headPanelFlagsTextures

// Ne pas oublier de bloquer la selection tant que l'animation
// de scrolling n'est pas terminée

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var localRoundIndex = 0;

var textureToSet = null;

//________DelayEvent________//
var sleepBetweenEvent = script.subScene.CreateEvent(
  "DelayedCallbackEvent",
  UpdateTextureAfterDelay,
);

var lastSleepEvent = script.subScene.CreateEvent(
  "DelayedCallbackEvent",
  UpdateLastTextureAfterDelay,
);

//________Listener___________//
const rankingButtonListener = script.subScene.CreateListener(
  "rankingButtonEvent",
  OnButtonClicked,
);

//________Caller____________//
const animCountryPickingCaller = script.subScene.CreateCaller(
  "animCountryPickingEvent",
  null,
);

//_________________________Director functions_____________________//

function Start() {}

function OnLateStart() {
  script.headPanel.enabled = true;
  // Select the flag texture based on the picked countries and the current round
  textureToSet =
    script.headPanelFlagsTextures[global.pickedCountries[localRoundIndex]];
  // Apply the texture
  script.headPanelMaterial.mainPass.baseTex = textureToSet;

  AnimCountryPicking();
}

function Update() {}

function Stop() {
  script.headPanel.enabled = false;
  localRoundIndex = 0;
}

//___________________________Functions__________________________//
function OnButtonClicked(selectedButtonIndex) {
  // increment the local round index
  localRoundIndex++;
  // If we reach the total rounds -> disable the head panel
  if (localRoundIndex >= global.totalRounds) {
    script.headPanel.enabled = false;
  } else {
    // var texture =
    //   script.headPanelFlagsTextures[global.pickedCountries[localRoundIndex]];
    textureToSet =
      script.headPanelFlagsTextures[global.pickedCountries[localRoundIndex]];

    // launch the scrolling animation
    AnimCountryPicking();
    // Apply the texture
    // script.headPanelMaterial.mainPass.baseTex = texture;
  }
}

var scrollingList = [];

function AnimCountryPicking() {
  for (var i = 0; i < script.scrollingTimeDurations.length - 1; i++) {
    var sleepBetweenEvent = script.subScene.CreateEvent(
      "DelayedCallbackEvent",
      UpdateTextureAfterDelay,
    );
    sleepBetweenEvent.event.reset(script.scrollingTimeDurations[i]);
  }
  lastSleepEvent.event.reset(
    script.scrollingTimeDurations[script.scrollingTimeDurations.length - 1],
  );
}

function UpdateTextureAfterDelay() {
  // change la texture du head panel pour afficher le pays choisi rapidement
  var randomCountryId = Math.floor(Math.random() * (global.totalCountries - 1));
  var texture = script.headPanelFlagsTextures[randomCountryId];
  script.headPanelMaterial.mainPass.baseTex = texture;
  print("Random Country Id: " + randomCountryId);
}

function UpdateLastTextureAfterDelay() {
  print("Updating last texture to picked country");
  script.headPanelMaterial.mainPass.baseTex = textureToSet;
}
