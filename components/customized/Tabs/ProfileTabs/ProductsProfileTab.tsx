import { Service } from "../../../../models/service";
import { TopTabServices } from "../TopTabContainer/TopTabServices";

type IProps = {
  userId: string;
  service: Service | null;
  option: string | null;
};

export const ProductsProfileTab = ({
  userId,
  service = null,
  option = null,
}: IProps) => {
  return (
    // <TopTabServices
    //   userId={userId}
    //   initialRoute={service?.name.toLowerCase()}
    //   service={service}
    //   option={option}
    // />
    <></>
  );
};
