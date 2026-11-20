import { useEffect, useState } from "react";
import { sound } from "@/services/sound";

export function useSound() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(sound.isEnabled());
    const unsub = sound.subscribe((val) => setEnabled(val));
    return unsub;
  }, []);

  return {
    soundEnabled: enabled,
    toggleSound: () => sound.toggle(),
    playHover: () => sound.hoverBlip(),
    playClick: () => sound.selectBlip(),
    playSuccess: () => sound.successChime(),
  };
}
