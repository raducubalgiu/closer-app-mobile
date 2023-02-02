import { Option } from "../models/option";
import { Product } from "../models/product";
import { Schedule } from "../models/schedule";
import { Service } from "../models/service";
import { Slot } from "../models/slot";
import { User } from "../models/user";

export type RootStackParams = {
  Account: any;
  AccountInfo: any;
  AccountPassword: any;
  App: any;
  Assistance: any;
  AuthStack: any;
  AllBookmarks: { postId: string; userId: string };
  AddLocation: any;
  AddServices: any;
  AddProducts: any;
  AddJobs: any;
  AddProgram: any;
  AddPost: any;
  AddSchedule: { start: string; end: string };
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
  CalendarBig: { product: Product; serviceId: Service };
  Camera: { name: string; avatar: any };
  CameraPreview: { photo: { uri: string }; avatar: any; name: string };
  ClearCache: any;
  DeleteAccount: any;
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
  FeedExplore: any;
  FeedFollowings: any;
  FeedBookables: any;
  FeedLastMinute: any;
  FeedVideoExplore: { initialIndex: number };
  Hashtag: { name: string };
  Login: any;
  Locations: {
    service: Service;
    option: Option | null;
    period: any;
    longitude: number;
    latitude: number;
  };
  LocationItem: { locationId: string };
  LocationFilters: any;
  Likes: { postId: string };
  MyBusiness: any;
  MyDashboard: any;
  MyCalendar: any;
  MyCalendarStatistics: { day: string };
  MyCalendarSettings: any;
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
  Privacy: any;
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
  Product: { id: string };
  ProductReviews: { productId: string; productName: string; ownerId: string };
  Register: any;
  RegisterBusiness: any;
  ReportAProblem: any;
  SavingData: any;
  Settings: any;
  SearchAll: { screen: string | null; search: string };
  Schedules: any;
  ScheduleConfirm: {
    serviceId: Service;
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
  UserLocationPermission: any;
};