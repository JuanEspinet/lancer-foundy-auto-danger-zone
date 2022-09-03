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

const onUpdateToken = (t) => { 
    const maxHeat = t.actor.data?.data?.derived?.heat?.max;
    const currHeat = t.actor.data?.data?.derived?.heat?.value;
    const existingeffect = hasEffect(t.actor,"dangerzone");

    if (maxHeat > 0 &&
        ((currHeat >= (maxHeat / 2) && !existingeffect) || (currHeat < (maxHeat / 2) && existingeffect ))) {
        t.toggleActiveEffect(createDangerZoneEffect());
    }
};  

Hooks.on('updateToken', onUpdateToken);