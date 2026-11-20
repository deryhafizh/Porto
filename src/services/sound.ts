/**
 * Procedural Web Audio API sound synthesizer engine.
 * Inspired by retro-modern interactive portfolios (e.g. Prismfold Studio & Ibnu Portfolio).
 * 
 * Features:
 * - 0 KB asset footprint (no external MP3/WAV files to load or fail)
 * - Browser autoplay safe (starts suspended/muted until user opts in)
 * - Persisted user preference in localStorage
 * - Low-latency synthetic micro-sounds: hoverBlip, selectBlip, successChime, toggleTone
 */

type Listener = (enabled: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private listeners: Set<Listener> = new Set();
  private isClient: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.isClient = true;
      try {
        if (typeof window.localStorage !== "undefined") {
          const saved = window.localStorage.getItem("dery_portfolio_sound");
          this.enabled = saved === "true";
        }
      } catch {
        this.enabled = false;
      }
    }
  }

  private initContext() {
    if (!this.isClient) return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.initContext();
      this.toggleTone(true);
    }
    if (this.isClient) {
      try {
        localStorage.setItem("dery_portfolio_sound", String(this.enabled));
      } catch {}
    }
    this.notify();
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    if (this.enabled !== val) {
      this.enabled = val;
      if (this.enabled) {
        this.initContext();
      }
      if (this.isClient) {
        try {
          localStorage.setItem("dery_portfolio_sound", String(this.enabled));
        } catch {}
      }
      this.notify();
    }
  }

  public subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.enabled));
  }

  /**
   * Generic procedural tone generator with attack & exponential decay.
   */
  public tone(
    frequency: number,
    type: OscillatorType = "sine",
    duration = 0.08,
    volume = 0.05,
    rampToFreq: number | null = null
  ) {
    if (!this.enabled || !this.isClient) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);
      if (rampToFreq && rampToFreq > 0) {
        osc.frequency.exponentialRampToValueAtTime(rampToFreq, now + duration);
      }

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignore audio synthesis errors on locked audio devices
    }
  }

  /**
   * 1. Soft hover micro-interaction: smooth subtle triangle upward sweep (560Hz -> 760Hz, 35ms)
   */
  public hoverBlip() {
    this.tone(560, "triangle", 0.035, 0.025, 760);
  }

  /**
   * 2. Tactile click/select interaction: punchy dual-tone chord (620Hz + 880Hz)
   */
  public selectBlip() {
    this.tone(620, "sine", 0.05, 0.04);
    setTimeout(() => this.tone(880, "sine", 0.06, 0.035), 25);
  }

  /**
   * 3. Audio toggle sound (up tone when enabled, down tone when muted)
   */
  public toggleTone(turningOn: boolean) {
    if (turningOn) {
      this.tone(440, "sine", 0.06, 0.04, 660);
    } else {
      this.tone(660, "sine", 0.06, 0.04, 380);
    }
  }

  /**
   * 4. Success chime (4-note ascending chord for email copy, secret triggers, etc.)
   */
  public successChime() {
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.tone(freq, "triangle", 0.12, 0.035), idx * 55);
    });
  }
}

export const sound = new SoundEngine();
