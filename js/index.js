let pick = array => {
  return array[Math.floor(Math.random() * array.length)];
};

let hideComplication = () => {
  let $complication = document.querySelector("p.complication");
  $complication.classList.remove("badge");
  $complication.textContent = "";
};

let currentLanguage = (new URLSearchParams(window.location.search)).get("lang") || "en";

function translate(key) {
  let path = key.split(".");

  try {
    let tr = window.translations[currentLanguage];
    path.forEach(p => tr = tr[p]);
    return tr;
  } catch(e) {
    return "missing translation";
  }
}

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

let initializers = [
  function missionSection() {
    let $container = document.getElementById("mission");
    let $form = $container.querySelector("form");
    let $playersCount = $form.querySelector("input.players");
    let $scenesCount = $form.querySelector("input.scenes");
    let $partiesCount = $form.querySelector("input.interested-parties");
    let $generated = $container.querySelector(".generated");
    let $tags = $generated.querySelector(".tags");
    let $threats = $generated.querySelector(".threats");
    let $scenes = $generated.querySelector(".scenes");

    let generateTags = (scenesCount, partiesCount) => {
      let tags = [];
      tags.push(pick(window.runBasicsObjectives));
      tags.push(pick(window.runBasicsTargets));

      for (let i = 0; i < partiesCount; i++)
        tags.push(pick(window.runDetailsInterestedParties));

      tags.push(pick(window.runLocationMeets));

      for (let i = 0; i < scenesCount; i++)
        tags.push(pick(window.runLocationTargets));

      tags.forEach(tag => {
        let $tag = document.createElement("span");
        $tag.innerHTML = tag;
        $tag.classList.add("badge");
        $tags.appendChild($tag);
      });
    }

    let generateThreats = (scenesCount, partiesCount) => {
      let threats = [];
      let threatsCount = (parseInt($playersCount.value) || 1) + (parseInt($scenesCount.value) || 3);
      for (let i = 0; i < threatsCount; i++)
        threats.push(pick(window.storyBeatObjects));

      threats.forEach(threat => {
        let $threat = document.createElement("span");
        $threat.textContent = threat;
        $threat.classList.add("badge");
        $threats.appendChild($threat);
      });
    }

    let generateScenes = scenesCount => {
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

    let generate = () => {
      let scenesCount = parseInt($scenesCount.value) || 3;
      let partiesCount = parseInt($partiesCount.value) || 2;

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
  },

  function complication() {
    let $revealComplication = document.querySelector("button.complication");
    let $complication = document.querySelector("p.complication");

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
  },

  function NpcsSection() {
    let $container = document.getElementById("npcs");
    let $list = $container.querySelector("ul");
    let $add = $container.querySelector("button");
    let $template = $container.querySelector("template");
    let npcCount = 0;

    let generate = () => {
      let $npc = $template.content.cloneNode(true);
      npcCount++;

      let metatype = pick([...window.contactMetatype, "rare"]);
      if (metatype == "rare") metatype = pick(window.contactRareMetatype);
      $npc.querySelector(".index").textContent = npcCount;
      $npc.querySelector(".metatype").textContent = metatype;
      $npc.querySelector(".traits").textContent = `${pick(window.contactTraits)}, ${pick(window.contactTraits)}`;
      $npc.querySelector(".motivation").textContent = pick(contactMotivation);

      $list.appendChild($npc);
      translateAll();
    };

    $add.addEventListener("click", () => generate());
  },

  function translations() {
    translateAll();
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initializers.forEach(init => init());
});
