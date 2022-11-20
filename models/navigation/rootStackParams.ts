import { Product } from "../product";
import { Service } from "../service";

export type RootStackParams = {
  App: any;
  SearchServices: any;
  FiltersDate: any;
  FiltersService: any;
  Locations: any;
  EditProfile: any;
  EditBio: any;
  EditName: any;
  EditWebsite: any;
  EditUsername: any;
  EditProfession: any;
  MyBusiness: any;
  MyDashboard: any;
  MyCalendar: any;
  MyLocation: any;
  MyProducts: any;
  MyJobs: any;
  AddLocation: any;
  AddServices: any;
  AddProducts: any;
  AddJobs: any;
  EditProduct: any;
  MessageItem: any;
  MessageSettings: {
    _id: string;
    avatar: any;
    name: string;
    username: string;
    checkmark: Boolean;
    conversationId: string;
  };
  MessageNew: any;
  Settings: any;
  ScheduleDetails: any;
  ScheduleCancel: any;
  Discounts: any;
  FindFriends: any;
  Bookmarks: any;
  AllBookmarks: {
    postId: string;
    userId: string;
  };
  Comments: any;
  SearchAll: any;
  Hashtag: {
    name: string;
  };
  Service: any;
  Notifications: any;
  Post: any;
  Profile: any;
  ProfileGeneral: {
    userId: string | null;
    username: string;
    avatar: any | null;
    name: string | null;
    checkmark: boolean | null;
    service: string | null;
    option: string | null;
  };
  Map: any;
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
  CalendarBig: {
    product: Product;
    service: Service;
  };
  ScheduleConfirm: any;
  ScheduleOverview: any;
  Schedule: any;
  AddSchedule: any;
  AddPost: any;
  PhotoLibrary: any;
  PhotoAlbums: any;
  EditAvatar: any;
  Camera: any;
  CameraPreview: any;
  Test: any;
  AuthStack: any;
  Feed: any;
  Likes: { postId: string };
  SearchPosts: any;
  LocationItem: { locationId: string };
  Login: any;
  Register: any;
  RegisterBusiness: any;
  Username: any;
};
