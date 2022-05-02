import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const hideTabs = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case "Comments":
      return { display: "none" };
    case "MessageItem":
      return { display: "none" };
    case "FiltersDate":
      return { display: "none" };
    case "FiltersService":
      return { display: "none" };
    case "EditProfile":
      return { display: "none" };
    case "EditPhotoLibrary":
      return { display: "none" };
    case "FindFriends":
      return { display: "none" };
    case "Bookmarks":
      return { display: "none" };
    case "Settings":
      return { display: "none" };
    case "Schedules":
      return { display: "none" };
    case "Discounts":
      return { display: "none" };
    case "MyBusiness":
      return { display: "none" };
    case "MyDashboard":
      return { display: "none" };
    case "MyCalendar":
      return { display: "none" };
    case "MyLocation":
      return { display: "none" };
    case "MyProducts":
      return { display: "none" };
    case "AddLocation":
      return { display: "none" };
    case "AddServices":
      return { display: "none" };
    case "AddProducts":
      return { display: "none" };
    case "AddBusinessType":
      return { display: "none" };
    default:
      return { display: "block" };
  }
};
