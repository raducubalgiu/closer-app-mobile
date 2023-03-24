import { ViewFollowingsListEnum } from "./enums/viewFollowingsListEnum";
import { ViewLikesListEnum } from "./enums/viewLikesListEnum";

export interface Settings {
  private: boolean;
  status: {
    type: String;
    enum: ["active", "hidden", "disabled"];
    default: "active";
  };
  viewsCount: {
    type: String;
    enum: ["all", "me"];
    default: "all";
  };
  viewLikes: ViewLikesListEnum;
  viewComments: {
    type: String;
    enum: ["all", "nobody", "followersAndFollowings"];
    default: "all";
  };
  viewFollowings: ViewFollowingsListEnum;
  tags: {
    type: String;
    enum: ["all", "nobody", "followings", "followersAndFollowings"];
    default: "all";
  };
  mentions: {
    type: String;
    enum: ["all", "nobody", "followings", "followersAndFollowings"];
    default: "all";
  };
  slot: {
    type: Number;
    default: 29;
  };
}
