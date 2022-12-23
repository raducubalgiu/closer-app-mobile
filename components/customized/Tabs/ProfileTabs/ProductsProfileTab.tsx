import { Service } from "../../../../models/service";
import { TopTabServices } from "../TopTabContainer/TopTabServices";
import { useGet } from "../../../../hooks";

type IProps = {
  userId: string;
  service: Service | null;
  option: string | null;
  locationId: string;
};

export const ProductsProfileTab = ({
  userId,
  service,
  option,
  locationId,
}: IProps) => {
  const { data: services } = useGet({
    model: "services",
    uri: `/locations/${locationId}/services`,
  });

  return (
    <>
      {services?.length > 0 && (
        <TopTabServices
          userId={userId}
          initialRoute={service?.name.toLowerCase()}
          service={service}
          option={option}
          services={services}
        />
      )}
    </>
  );
};
