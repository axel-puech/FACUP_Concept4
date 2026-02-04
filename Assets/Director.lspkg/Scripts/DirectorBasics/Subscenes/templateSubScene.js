//@input SceneObject parent

// pas dans une scene.
// logo foot angleterre
// barre sur le coté avec les numéros ( qui sont des boutons)

// On va avoir une Scene d'intro
// Who has the most change of winning ?
// Une scene principale
// Defilement aléatoire des Pays
// Une scene de fin
// classement final plus Dl l'app de machin angleterre

// sous scenes
// head biding avec un logo pour le pays

//defilement des pays avec spright sheet
// Dans un spright sheet on a les drapeaux des pays
// On definit a l'avance une coordonées x de Target
// On fait defilier les UV jsqua la coordonée x target avec Shader + code
// Voila nous avons une animation de defilement des pays

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

//_________________________Director functions_____________________//

function Start() {}
function OnLateStart() {}

function Update() {}

function Stop() {}

//___________________________Functions__________________________//
