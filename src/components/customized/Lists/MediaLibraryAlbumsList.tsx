import { ListRenderItemInfo } from "react-native";
import { memo, useCallback } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { AlbumListItem } from "../ListItems/AlbumListItem";
import { LibraryAlbum } from "../../../ts/interfaces/libraryAlbum";

type IProps = {
  albums: LibraryAlbum[];
  onSelectAlbum: (album: string) => void;
};

const MediaLibraryAlbumsList = ({ albums, onSelectAlbum }: IProps) => {
  const renderAlbum = useCallback(
    ({ item }: ListRenderItemInfo<LibraryAlbum>) => {
      return (
        <AlbumListItem
          onPress={() => onSelectAlbum(item.title)}
          id={item.id}
          uri={item?.uri}
          title={item.title}
          assetCount={item.assetCount}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: LibraryAlbum) => item.id, []);

  return (
    <BottomSheetFlatList
      data={albums}
      keyExtractor={keyExtractor}
      renderItem={renderAlbum}
    />
  );
};

export default memo(MediaLibraryAlbumsList);
