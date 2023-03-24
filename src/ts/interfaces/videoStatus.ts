export interface VideoStatus {
  didJustFinish?: boolean;
  durationMillis: number;
  hasJustBeenInterrupted?: boolean;
  isBuffering?: boolean;
  isLoaded?: boolean;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying?: boolean;
  pitchCorrectionQuality?: string;
  playableDurationMillis?: number;
  positionMillis: number;
  progressUpdateIntervalMillis?: number;
  rate: number;
  shouldCorrectPitch: boolean;
  shouldPlay: boolean;
  target?: number;
  uri?: string;
  volume: number;
}
