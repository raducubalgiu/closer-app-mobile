import { Option } from "../option";
import { Product } from "../product";
import { Schedule } from "../schedule";
import { Service } from "../service";
import { Slot } from "../slot";
import { User } from "../user";

export type RootStackParams = {
  App: any;
  AuthStack: any;
  AllBookmarks: { postId: string; userId: string };
  AddLocation: any;
  AddServices: any;
  AddProducts: any;
  AddJobs: any;
  AddProgram: any;
  AddPost: any;
  Bookmarks: { user: any };
  Comments: {
    postId: string;
    description: string;
    avatar: any;
    username: string;
    creatorId: string;
    focus: boolean;
    date: string;
    name: string;
  };
  CalendarBig: { product: Product; service: Service };
  Camera: { name: string; avatar: any };
  CameraPreview: { photo: { uri: string }; avatar: any; name: string };
  Discounts: any;
  EditProfile: { user: User };
  EditBio: any;
  EditName: any;
  EditWebsite: any;
  EditUsername: any;
  EditProfession: any;
  EditAvatar: { photo: { uri: string } };
  EditProduct: { product: any };
  ExploreVideoLandscape: any;
  ExploreVideoPortrait: any;
  SearchServices: any;
  FindFriends: any;
  FiltersDate: { service: Service; period: any };
  FiltersService: {
    service: Service;
    period: any;
  };
  Feed: any;
  Hashtag: { name: string };
  Login: any;
  Locations: {
    service: Service;
    option: Option | null;
    period: any;
  };
  LocationItem: { locationId: string };
  Likes: { postId: string };
  MyBusiness: any;
  MyDashboard: any;
  MyCalendar: any;
  MyLocation: any;
  MyProducts: any;
  MyJobs: any;
  Messages: any;
  MessageItem: {
    user: {
      _id: string;
      name: string;
      username: string;
      avatar: string;
      checkmark: boolean;
    };
  };
  MessageSettings: {
    _id: string;
    avatar: any;
    name: string;
    username: string;
    checkmark: Boolean;
    conversationId: string;
  };
  MessageNew: any;
  Notifications: any;
  Map: {
    profession: string;
    userId: string;
  };
  Post: { userId: string };
  Profile: any;
  ProfileGeneral: {
    screen?: string;
    userId?: string;
    username: string;
    avatar: any | null;
    name: string;
    checkmark: boolean;
    service: string | null;
    option: string | null;
  };
  ProfileStats: {
    screen: string;
    userId: string;
    username: string;
    initialRoute: string;
    role: string;
    ratingsQuantity: number;
    followersCount: number;
    followingsCount: number;
  };
  PhotoLibrary: any;
  PhotoAlbums: any;
  Register: any;
  RegisterBusiness: any;
  Settings: any;
  SearchAll: { screen: string | null; search: string };
  Schedules: any;
  ScheduleConfirm: {
    service: Service;
    product: Product;
    slot: Slot;
  };
  ScheduleDetails: { schedule: Schedule };
  ScheduleCancel: { scheduleId: string };
  SearchPosts: { search: string };
  Service: { service: Service };
  Test: any;
  Username: { idTokenResult: any; role: string };
  SharedList: any;
  SharedDetail: any;
  Shared: any;
};
