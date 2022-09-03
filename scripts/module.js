function hasEffect(actor, effect) {
    return actor.data.effects.some(eff => eff.data.flags.core?.statusId?.endsWith(effect));
}
  
function createDangerZoneEffect() {
    return {
        id: "dangerzone",
        label:"Danger Zone",
        icon:"systems/lancer/assets/icons/white/status_dangerzone.svg"
    }
}

let onUpdateToken = (t) => { 
    let maxHeat = t.actor.data?.data?.derived?.heat?.max;
    let currHeat = t.actor.data?.data?.derived?.heat?.value;
    let existingeffect = hasEffect(t.actor,"dangerzone");

    if (maxHeat > 0 &&
        ((currHeat >= (maxHeat / 2) && !existingeffect) || (currHeat < (maxHeat / 2) && existingeffect ))) {
        t.toggleActiveEffect(createDangerZoneEffect());
    }
};  

Hooks.on('updateToken', onUpdateToken);