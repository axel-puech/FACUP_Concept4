//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Ranking Buttons Materials"}
//@input Asset.Material[] rankingButtonsMaterials
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Ranking Flags Textures - Respect Order"}
//@input Asset.Texture[] rankingFlagsTextures
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Default Buttons Textures"}
//@input Asset.Texture[] defaultButtonMaterials

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

var localRoundIndex = 0;
//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}

function Update() {}

function Stop() {
  localRoundIndex = 0;
  ResetTextures();
}

//___________________________Functions__________________________//
function OnButtonClicked(selectedButtonIndex) {
  // Set the button texture to the corresponding flag texture
  script.rankingButtonsMaterials[selectedButtonIndex - 1].mainPass.baseTex =
    script.rankingFlagsTextures[global.pickedCountries[localRoundIndex]];

  localRoundIndex++;
}

function ResetTextures() {
  script.rankingButtonsMaterials.forEach((material, index) => {
    material.mainPass.baseTex = script.defaultButtonMaterials[index];
  });
}
