abstract class VideoPage {
    protected webHostName: string;

    constructor(hostName: string) {
        this.webHostName = hostName;
    }

    abstract get seasonNumber(): string;
    abstract get episodeNumber(): string;
    abstract get episodeTitle(): string;
    abstract get seriesName(): string;
    abstract get totalTimeInSeconds(): number;
    abstract get currentTimeInSeconds(): number;
}

export default VideoPage;