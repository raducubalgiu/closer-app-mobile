import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import {
  Post,
  Option,
  Product,
  Schedule,
  Service,
  Slot,
  User,
  Chat,
  Period,
} from "../ts";
import { ImagePickerAsset } from "expo-image-picker";

export type RootStackParams = {
  Account: any;
  AccountInfo: {
    email: string | undefined;
    phone: any | undefined;
    gender: string | undefined;
  };
  AccountInfoEmail: any;
  AccountInfoGender: {
    gender: string | undefined;
  };
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
  AddPhotos: any;
  AddVideos: any;
  AddPhotosPreview: { uri: string };
  AddVideosPreview: { uri: string };
  AddPost: { uri?: string; taggedUsers: User[] };
  AddSchedule: { start: string; end: string };
  Auth: any;
  Bookmarks: { user: any };
  Birthday: any;
  Comments: { post: Post };
  CalendarBig: {
    product: Product;
    serviceId: string;
    expirationTime: string | null;
  };
  Camera: { name: string; avatar: any };
  CameraPreview: {
    photo: ImagePickerAsset | CameraCapturedPicture;
    avatar: any;
    name: string;
  };
  CameraTimer: { counter: number; sequence: number; cameraType: CameraType };
  Chats: any;
  ChatSettings: { chat: Chat };
  ChatGroupSettings: { chatId: string };
  ChatGroupUsers: {
    users: { user: User; isAdmin: boolean }[];
    chatId: string;
  };
  ChatGroupName: { name: string; chatId: string };
  ChatGroupAddUsers: { chatId: string };
  ChatGroupUser: {
    userId: string;
    name: string;
    isAdmin: boolean;
    chatId: string;
  };
  ChatGroupCreate: { users: User[] };
  ChatGroupMedia: { chatId: string };
  ClearCache: any;
  DeleteAccount: any;
  DeleteAccountPermanently: any;
  DisableAccount: any;
  Discounts: any;
  EditProfile: any;
  EditBio: any;
  EditName: any;
  EditWebsite: any;
  EditUsername: any;
  EditProfession: any;
  EditAvatar: { photo: { uri: string } };
  EditAvatarCamera: any;
  EditProduct: { product: any };
  ExploreVideoLandscape: any;
  ExploreVideoPortrait: any;
  SearchServices: { screen: string; defaultPeriod: Period };
  FindFriends: any;
  FiltersDate: { service: Service; defaultPeriod: Period; screen: string };
  FiltersService: {
    service: Service;
    period: any;
  };
  FeedExplore: any;
  FeedExploreVideo: { video: Post; videos: any; index: number };
  FeedBookables: any;
  FeedLastMinute: any;
  Hashtag: { name: string };
  HideAccount: any;
  Language: any;
  LanguageApp: any;
  LanguageTranslation: any;
  Login: any;
  Locations: {
    service?: Service;
    option?: Option | null;
    period?: Period;
    longitude?: number;
    latitude?: number;
    sort: {
      title: string;
      query: string;
    };
  };
  LocationItem: { locationId: string };
  LocationFilters: any;
  LocationSort: {
    sort: {
      title: string;
      query: string;
    };
  };
  Likes: { postId: string };
  Map: {
    profession: string;
    userId: string;
    initialCoordinates: any;
  };
  MyBusiness: any;
  MyDashboard: any;
  MyCalendar: any;
  MyCalendarStatistics: { day: string };
  MyCalendarSettings: any;
  MyLocation: any;
  MyProducts: any;
  MyJobs: any;
  Messages: { chat: Chat };
  MessageNew: any;
  MessagesSearch: any;
  Music: any;
  Notifications: any;
  Privacy: any;
  PrivacyComments: any;
  PrivacyCommentsCreate: any;
  PrivacyCommentsView: any;
  PrivacyLikes: any;
  PrivacyFollowings: any;
  PrivacyBlockedAccounts: any;
  PrivacyTagsAndMentions: any;
  PrivacyMentions: any;
  PrivacyTags: any;
  Profile: any;
  ProfileGeneral: {
    screen?: string;
    username: string;
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
    settings: any;
  };
  PhotoLibrary: any;
  PhotoAlbums: any;
  Product: { id: string };
  ProductReviews: { productId: string; productName: string; ownerId: string };
  Register: any;
  RegisterBusiness: any;
  ReportAProblem: any;
  ReportsList: any;
  ReportUser: any;
  SavingData: any;
  Settings: any;
  SearchStack: any;
  SearchAll: { screen: string | null; search: string };
  Schedules: any;
  ScheduleConfirm: {
    serviceId: string;
    product: Product;
    slot: Slot;
    expirationTime: string | null;
  };
  ScheduleDetails: { schedule: Schedule };
  ScheduleCancel: { scheduleId: string };
  SearchPosts: { search: string };
  SearchPopular: { post: Post; posts: Post[]; index: number };
  Service: { service: Service };
  Sound: { soundUri: any; avatar: any };
  Story: { userId: string };
  Username: { idTokenResult: any; role: string };
  SharedList: any;
  SharedDetail: any;
  Shared: any;
  UserLocationPermission: any;
  UserPosts: { post: Post };
  UserVideos: { id: number; videos: Post[] };
  UserAllPosts: { post: Post; posts: Post[]; index: number };
  TagUsers: { taggedUsers: User[] };
};
