import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const hideTabs = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case "Comments":
      return { display: "none" };
    case "FiltersDate":
      return { display: "none" };
    case "FiltersService":
      return { display: "none" };
    case "EditProfile":
      return { display: "none" };
    case "ProfileGeneral":
      return { display: "none" };
    case "AddLocation":
      return { display: "none" };
    case "AddServices":
      return { display: "none" };
    case "AddProducts":
      return { display: "none" };
    case "FindFriends":
      return { display: "none" };
    case "Settings":
      return { display: "none" };
    case "Schedules":
      return { display: "none" };
    case "Discounts":
      return { display: "none" };
    default:
      return { display: "block" };
  }
};
