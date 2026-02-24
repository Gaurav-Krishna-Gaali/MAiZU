import numpy as np
import matplotlib.pyplot as plt
import os
from dataclasses import dataclass


# ==========================================================
# CONFIG
# ==========================================================

OUTPUT_DIR = "pulse_demo_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SAMPLE_RATE = 500  # samples per second
DURATION = 4       # seconds


# ==========================================================
# PULSE PROFILE
# ==========================================================

@dataclass
class PulseProfile:
    bpm: int
    amplitude: float
    width_factor: float
    sharpness: float
    smoothness: float
    regularity: float
    missing_beat_prob: float = 0.0


# ==========================================================
# CORE WAVEFORM GENERATOR
# ==========================================================

def generate_single_beat(t, sharpness, width_factor):
    """
    Generates one synthetic pulse beat
    """

    # Systolic upstroke
    upstroke = np.exp(-sharpness * (t - 0.05) ** 2)

    # Diastolic decay
    decay = np.exp(-3 * t)

    beat = upstroke * decay

    # Width control
    beat = beat ** width_factor

    return beat


def generate_waveform(profile: PulseProfile):
    total_samples = SAMPLE_RATE * DURATION
    t = np.linspace(0, DURATION, total_samples)

    waveform = np.zeros_like(t)

    beat_interval = 60 / profile.bpm
    beat_times = np.arange(0, DURATION, beat_interval)

    for bt in beat_times:

        # Simulate missing beats
        if np.random.rand() < profile.missing_beat_prob:
            continue

        local_t = t - bt
        mask = (local_t >= 0) & (local_t <= 1)

        beat = generate_single_beat(local_t[mask],
                                    profile.sharpness,
                                    profile.width_factor)

        waveform[mask] += beat

    # Normalize
    waveform *= profile.amplitude

    # Add smoothness / roughness
    noise_strength = (1 - profile.smoothness) * 0.1
    waveform += np.random.normal(0, noise_strength, size=len(waveform))

    # Regularity smoothing
    waveform = profile.regularity * waveform + \
               (1 - profile.regularity) * np.roll(waveform, 3)

    return t, waveform


# ==========================================================
# VISUALIZATION
# ==========================================================

def save_waveform_image(t, waveform, title, filename):

    plt.figure(figsize=(6, 3))
    plt.plot(t, waveform)
    plt.title(title)
    plt.xticks([])
    plt.yticks([])
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, filename))
    plt.close()


# ==========================================================
# PREDEFINED DEMO PROFILES
# ==========================================================

def demo_profiles():

    return {
        "Rapid_Full_Wiry": PulseProfile(
            bpm=105,
            amplitude=1.0,
            width_factor=0.8,
            sharpness=60,
            smoothness=0.6,
            regularity=0.95
        ),

        "Slow_Empty_Thin": PulseProfile(
            bpm=55,
            amplitude=0.4,
            width_factor=1.8,
            sharpness=30,
            smoothness=0.7,
            regularity=0.8
        ),

        "Moderate_Slippery": PulseProfile(
            bpm=75,
            amplitude=0.7,
            width_factor=1.2,
            sharpness=40,
            smoothness=0.95,
            regularity=0.97
        ),

        "Choppy_Intermittent": PulseProfile(
            bpm=80,
            amplitude=0.6,
            width_factor=1.1,
            sharpness=45,
            smoothness=0.3,
            regularity=0.5,
            missing_beat_prob=0.2
        ),

        "Deep_Sinking": PulseProfile(
            bpm=70,
            amplitude=0.5,
            width_factor=1.3,
            sharpness=35,
            smoothness=0.8,
            regularity=0.9
        )
    }


# ==========================================================
# GENERATE FULL 18 IMAGE SET
# ==========================================================

def generate_full_demo():

    hands = ["Left", "Right"]
    positions = ["Cun", "Guan", "Chi"]

    profiles = demo_profiles()
    profile_names = list(profiles.keys())

    i = 0

    for hand in hands:
        for pos in positions:

            profile = profiles[profile_names[i % len(profile_names)]]
            t, waveform = generate_waveform(profile)

            title = f"{hand} Hand - {pos} - {profile_names[i % len(profile_names)]}"
            filename = f"{hand}_{pos}.png"

            save_waveform_image(t, waveform, title, filename)

            i += 1

    print("✅ 18 demo waveform images generated in:", OUTPUT_DIR)


# ==========================================================
# MAIN
# ==========================================================

if __name__ == "__main__":
    generate_full_demo()