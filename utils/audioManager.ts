// Audio manager for preloading and playing sound effects with minimal latency
class AudioManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();

    constructor() {
        this.preloadSounds();
    }

    private preloadSounds() {
        const soundPaths = [
            { key: 'channelZoomIn', path: '/audioo/channel zoom in.mp3' },
            { key: 'channelZoomOut', path: '/audioo/channel zoom out.mp3' },
            { key: 'start', path: '/audioo/start.mp3' },
            { key: 'mail', path: '/audioo/mail.mp3' },
            { key: 'back', path: '/audioo/back.mp3' },
            { key: 'nextChannel', path: '/audioo/next channel.mp3' },
            { key: 'kareemButton', path: '/audioo/kareem button.mp3' },
        ];

        soundPaths.forEach(({ key, path }) => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audio.volume = 0.7;
            this.sounds.set(key, audio);
        });
    }

    play(soundKey: string) {
        const audio = this.sounds.get(soundKey);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => { });
        }
    }

    setVolume(soundKey: string, volume: number) {
        const audio = this.sounds.get(soundKey);
        if (audio) {
            audio.volume = Math.max(0, Math.min(1, volume));
        }
    }
}

export const audioManager = new AudioManager();
