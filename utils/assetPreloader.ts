import { CHANNELS } from '../constants';

interface PreloadProgress {
    current: number;
    total: number;
    percentage: number;
}

type ProgressCallback = (progress: PreloadProgress) => void;

export class AssetPreloader {
    private static cachedAssets = new Set<string>();

    static async preloadAllAssets(onProgress: ProgressCallback): Promise<void> {
        // Collect all assets to preload
        const assetsToPreload: string[] = [];

        // 1. Background music
        assetsToPreload.push('/audioo/bg.mp3');

        // 2. All sound effects
        const soundEffects = [
            '/audioo/channel zoom in.mp3',
            '/audioo/channel zoom out.mp3',
            '/audioo/start.mp3',
            '/audioo/mail.mp3',
            '/audioo/back.mp3',
            '/audioo/next channel.mp3',
            '/audioo/kareem button.mp3',
            '/audioo/All Wii BIOS Sounds.mp3'
        ];
        assetsToPreload.push(...soundEffects);

        // 3. Channel preview videos
        CHANNELS.forEach(channel => {
            if (channel.previewVideo) {
                assetsToPreload.push(channel.previewVideo);
            }
        });

        // 4. MII videos
        const miiVideos = [
            '/mii loop/thinking.webm',
            '/mii loop/wave.webm',
            '/mii loop/HANDS UP PRAYING.webm',
            '/mii loop/arms moving eyes shut.webm',
            '/mii loop/head swaying side to side.webm',
            '/mii loop/point wink.webm',
            '/mii loop/why so down.webm'
        ];
        assetsToPreload.push(...miiVideos);

        const total = assetsToPreload.length;
        let current = 0;

        // Preload in parallel but report progress sequentially
        const preloadPromises = assetsToPreload.map(async (assetPath) => {
            if (this.cachedAssets.has(assetPath)) {
                current++;
                onProgress({ current, total, percentage: (current / total) * 100 });
                return;
            }

            try {
                await this.preloadAsset(assetPath);
                this.cachedAssets.add(assetPath);
            } catch (error) {
                console.warn(`Failed to preload ${assetPath}:`, error);
            } finally {
                current++;
                onProgress({ current, total, percentage: (current / total) * 100 });
            }
        });

        // Wait for all to complete
        await Promise.all(preloadPromises);
    }

    private static preloadAsset(assetPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const ext = assetPath.toLowerCase().split('.').pop();

            if (ext === 'mp3' || ext === 'wav' || ext === 'ogg') {
                // Audio preload
                const audio = new window.Audio();
                audio.oncanplaythrough = () => resolve();
                audio.onerror = () => reject(new Error(`Failed to load audio: ${assetPath}`));
                audio.src = assetPath;
                audio.load();
            } else if (ext === 'webm' || ext === 'mp4') {
                // Video preload
                const video = document.createElement('video');
                video.oncanplay = () => {
                    resolve();
                    document.body.removeChild(video);
                };
                video.onerror = () => {
                    reject(new Error(`Failed to load video: ${assetPath}`));
                    if (document.body.contains(video)) {
                        document.body.removeChild(video);
                    }
                };
                video.src = assetPath;
                video.style.display = 'none';
                document.body.appendChild(video);
            } else {
                // Default: assume it's loadable via fetch
                fetch(assetPath)
                    .then(res => {
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        return res.blob();
                    })
                    .then(() => resolve())
                    .catch(reject);
            }
        });
    }
}
