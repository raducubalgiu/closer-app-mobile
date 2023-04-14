export interface LibraryAlbum {
  id: string;
  uri: string;
  title: string;
  assetCount: number;
  onPress?: () => void;
}
