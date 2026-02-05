//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"if true - this will be the scroll animation"}
//@input bool scrolling

// PARAMETER SCROLL ANIMATION
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Animation Duration"}
//@input SceneObject headPanelScroll
//@ui {"widget":"label", "label":"Animation Duration"}
//@input float animationDuration
//@ui {"widget":"label", "label":"Head Panel Material for the scroll animation"}
//@input Asset.Material scrollingHeadPanelMaterial
//@ui {"widget":"label", "label":"Gap Number"}
//@input int gapNumber
//@ui {"widget":"label", "label":"Loop Number"}
//@input int loopNumber

// PARAMETERS TICK ANIMATION
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Define the scrolling animation timings for the picking animation"}
//@input float[] scrollingTimeDurations
//@ui {"widget":"label", "label":"Duration final scale animation"}
//@input float scaleDuration
//@input float sizeMultiplier
//@ui {"widget":"label", "label":"Head Panel Material for the tick animation"}
//@input Asset.Material headPanelMaterial
//@ui {"widget":"label", "label":"Head Panel for the tick animation"}
//@input SceneObject headPanel
//@ui {"widget":"label", "label":"All Flags Textures - Respect Order"}
//@input Asset.Texture[] headPanelFlagsTextures

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

var localRoundIndex = 0;

if (!script.scrolling) {
  // TICK ANIMATION VARIABLES
  var textureToSet = null;
}

if (script.scrolling) {
  // SCROLL ANIMATION VARIABLES
  var gapSize = 1 / script.gapNumber;
  var startTargetCoord = null;
  var offset = script.loopNumber * (1 + gapSize);
}

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
// This caller to indicate that the country picking animation is finished
const animCountryPickingCaller = script.subScene.CreateCaller(
  "animCountryPickingEvent",
  null,
);

const endOfGameCaller = script.subScene.CreateCaller("endOfGameEvent", null);

//__________________________Animations____________________________//

// SCALE ANIMATION FOR THE TICK ANIMATION
const scaleAnim = new Animation(
  script.getSceneObject(),
  script.scaleDuration,
  ScaleAnimUpdate,
  RepeatMode.PingPong,
);

scaleAnim.Easing = QuadraticIn;

// Get the current scale of the head panel
var transform = script.headPanel.getTransform();
var currentScale = transform.getLocalScale().x;

function ScaleAnimUpdate(ratio) {
  var scaleValue = currentScale + ratio * script.sizeMultiplier; // Scale to x 1.5
  transform.setLocalScale(new vec3(1, 1, 1).uniformScale(scaleValue));
}

scaleAnim.AddTimeCodeEvent(1, function () {});

// SCROLL ANIMATION FOR THE HEAD PANEL
const offsetXAnim = new Animation(
  script.getSceneObject(),
  script.animationDuration,
  OffsetXAnim,
);

offsetXAnim.Easing = ExponentialOut;

function OffsetXAnim(ratio) {
  newOffsetX = startTargetCoord.start + offset * ratio;
  script.scrollingHeadPanelMaterial.mainPass.offsetX = newOffsetX;
}

offsetXAnim.AddTimeCodeEvent(1, function () {
  // After fade out, disable the hint image
  animCountryPickingCaller.Call();
});

//_________________________Director functions_____________________//

function Start() {}

function OnLateStart() {
  if (!script.scrolling) {
    script.headPanel.enabled = true;
    // Select the flag texture based on the picked countries and the current round
    textureToSet =
      script.headPanelFlagsTextures[global.pickedCountries[localRoundIndex]];
    // Apply the texture
    script.headPanelMaterial.mainPass.baseTex = textureToSet;

    AnimCountryPicking();
  }

  if (script.scrolling) {
    script.headPanelScroll.enabled = true;
    startTargetCoord = CalculateTargetCoordinates(
      global.pickedCountries[localRoundIndex],
    );

    offsetXAnim.Start();
  }
}

function Update() {}

function Stop() {
  script.headPanel.enabled = false;
  script.headPanelScroll.enabled = false;
  localRoundIndex = 0;
}

//___________________________Functions__________________________//
function OnButtonClicked(selectedButtonIndex) {
  // increment the local round index
  localRoundIndex++;
  // If we reach the total rounds -> disable the head panel
  if (localRoundIndex >= global.totalRounds) {
    if (script.scrolling) {
      script.headPanelScroll.enabled = false;
    } else {
      script.headPanel.enabled = false;
    }

    endOfGameCaller.Call();
  } else {
    if (script.scrolling) {
      startTargetCoord = CalculateTargetCoordinates(
        global.pickedCountries[localRoundIndex],
      );
      offsetXAnim.Start();
    } else {
      textureToSet =
        script.headPanelFlagsTextures[global.pickedCountries[localRoundIndex]];

      // launch the scrolling animation
      AnimCountryPicking();
    }
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
}

function UpdateLastTextureAfterDelay() {
  script.headPanelMaterial.mainPass.baseTex = textureToSet;
  scaleAnim.Start(1);
  animCountryPickingCaller.Call();
}

function CalculateTargetCoordinates(countryIndex) {
  var start = gapSize * countryIndex;
  var target = gapSize * countryIndex + offset;
  return { start: start, target: target };
}
