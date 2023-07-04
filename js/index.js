const currentLanguage = (new URLSearchParams(window.location.search)).get("lang") || "en";

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function translate(key) {
  const path = key.split(".");

  try {
    let tr = window.translations[currentLanguage];
    path.forEach(p => tr = tr[p]);
    return tr;
  } catch(e) {
    return "missing translation";
  }
}

const t = translate;

function translateAll() {
  Array.from(document.querySelectorAll("[data-tr]")).forEach($el => {
    $el.innerHTML = translate($el.dataset.tr);
    $el.removeAttribute("data-tr");
  });
}

window.runBasicsObjectives = translate("runBasicsObjectives");
window.runBasicsTargets = translate("runBasicsTargets");
window.runDetailsInterestedParties = translate("runDetailsInterestedParties");
window.runDetailsComplications = translate("runDetailsComplications");
window.runLocationMeets = translate("runLocationMeets");
window.runLocationTargets = translate("runLocationTargets");
window.storyBeatObjects = translate("storyBeatObjects");
window.nodeMapsModifiers = translate("nodeMapsModifiers");
window.contactMetatype = translate("contactMetatype");
window.contactRareMetatype = translate("contactRareMetatype");
window.contactTraits = translate("contactTraits");
window.contactMotivation = translate("contactMotivation");

function hideComplication() {
  const $complication = document.querySelector("p.complication");
  $complication.classList.remove("badge");
  $complication.textContent = "";
}

function missionSection() {
  const $container = document.getElementById("mission");
  const $form = $container.querySelector("form");
  const $playersCount = $form.querySelector("input.players");
  const $scenesCount = $form.querySelector("input.scenes");
  const $partiesCount = $form.querySelector("input.interested-parties");
  const $generated = $container.querySelector(".generated");
  const $tags = $generated.querySelector(".tags");
  const $threats = $generated.querySelector(".threats");
  const $scenes = $generated.querySelector(".scenes");

  const generateTags = (scenesCount, partiesCount) => {
    let tags = [];
    tags.push(pick(window.runBasicsObjectives));
    tags.push(pick(window.runBasicsTargets));

    for (let i = 0; i < partiesCount; i++)
      tags.push(pick(window.runDetailsInterestedParties));

    tags.push(pick(window.runLocationMeets));

    for (let i = 0; i < scenesCount; i++)
      tags.push(pick(window.runLocationTargets));

    tags.forEach(tag => {
      const $tag = document.createElement("span");
      $tag.innerHTML = tag;
      $tag.classList.add("badge");
      $tags.appendChild($tag);
    });
  }

  const generateThreats = (scenesCount, partiesCount) => {
    let threats = [];
    const threatsCount = (parseInt($playersCount.value) || 1) + (parseInt($scenesCount.value) || 3);
    for (let i = 0; i < threatsCount; i++)
      threats.push(pick(window.storyBeatObjects));

    threats.forEach(threat => {
      let $threat = document.createElement("span");
      $threat.textContent = threat;
      $threat.classList.add("badge");
      $threats.appendChild($threat);
    });
  }

  const generateScenes = scenesCount => {
    for (let i = 0; i < scenesCount; i++) {
      let template = document.getElementById("scene-template");
      let $scene = template.content.cloneNode(true);
      $scene.querySelector(".number").textContent = i+1;
      let maps = [ "brick-wall.png", "downward-spiral.png", "pear-shaped.png", "railroad.png", "red-herring.png", "uphill-slog.png" ];
      $scene.querySelector("img").src = `./img/${pick(maps)}`;
      $scene.querySelector(".modifier").textContent = pick(window.nodeMapsModifiers);
      $scenes.appendChild($scene);
    }
  };

  const generate = () => {
    const scenesCount = parseInt($scenesCount.value) || 3;
    const partiesCount = parseInt($partiesCount.value) || 2;
    document.getElementById("export").removeAttribute("disabled");

    [$tags, $threats, $scenes].forEach($el => $el.innerHTML = "");
    hideComplication();

    generateTags(scenesCount, partiesCount);
    generateThreats(scenesCount, partiesCount);
    generateScenes(scenesCount);

    $generated.style.display = "inherit";
    translateAll();
  };

  $form.addEventListener("submit", event => {
    event.preventDefault();
    generate();
  });
}

function complicationSection() {
  const $revealComplication = document.querySelector("button.complication");
  const $complication = document.querySelector("p.complication");

  $revealComplication.addEventListener("click", () => {
    $complication.classList.add("badge");
    $complication.style.transition = "";
    $complication.style.opacity = 0;
    $complication.textContent = `!!! ${pick(window.runDetailsComplications)} !!!`;
    window.setTimeout(() => {
      $complication.style.transition = "opacity 500ms";
      $complication.style.opacity = 1
    }, 250);
  });
}

function npcsSection() {
  const $container = document.getElementById("npcs");
  const $list = $container.querySelector("ul");
  const $add = $container.querySelector("button");
  const $template = $container.querySelector("template");
  let npcCount = 0;

  const generate = () => {
    const $npc = $template.content.cloneNode(true);
    npcCount++;
    document.getElementById("export").removeAttribute("disabled");

    const metatype = pick([...window.contactMetatype, "rare"]);
    if (metatype == "rare") metatype = pick(window.contactRareMetatype);
    $npc.querySelector(".index").textContent = npcCount;
    $npc.querySelector(".metatype").textContent = metatype;
    $npc.querySelector(".traits").textContent = `${pick(window.contactTraits)}, ${pick(window.contactTraits)}`;
    $npc.querySelector(".motivation").textContent = pick(contactMotivation);

    $list.appendChild($npc);
    translateAll();
  };

  $add.addEventListener("click", () => generate());
}

function exportMissionSection() {
  document.getElementById("export").addEventListener("click", () => {
    const exported = new Blob([exportContent()]);

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(exported, {type: "text/plain"});
    link.download = "sra-mission.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function exportScene($scene) {
  return `
${$scene.querySelector("h4").textContent}
${t("mission.map")} : ${$scene.querySelector("img").src}
${t("mission.modifier")} : ${$scene.querySelector(".modifier").textContent}
`;
}

function exportContent() {
  return `
${t("mission.title").toUpperCase()}

${t("mission.runTags")} : ${Array.from(document.querySelectorAll("#mission .tags .badge")).map(el => el.textContent).join(", ")}

${t("mission.runThreats")} : ${Array.from(document.querySelectorAll("#mission .threats .badge")).map(el => el.textContent).join(", ")}

${t("mission.runComplications")} : ${document.querySelector("#mission p.complication").textContent}

${t("mission.scenes").toUpperCase()}
${Array.from(document.querySelectorAll("#mission li.scene")).map(el => exportScene(el)).join("")}

${t("npcs.title").toUpperCase()}
${Array.from(document.querySelectorAll("#npcs li.npc")).map(el => el.textContent.split("\n").map(c => c.replace(/^\s+/, '')).join("\n")).join("")}

`;
}

document.addEventListener("DOMContentLoaded", () => {
  missionSection();
  complicationSection();
  npcsSection();
  exportMissionSection();
  translateAll();
});
