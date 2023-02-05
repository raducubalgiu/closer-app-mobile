import { Service } from "../../../../models/service";
import { TopTabServices } from "../TopTabContainer/TopTabServices";
import { useGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";

type IProps = {
  userId: string;
  service: Service | null;
  option: string | null;
  locationId: string;
  onScroll: () => void;
};

export const ProductsProfileTab = ({
  userId,
  service,
  option,
  locationId,
  onScroll,
}: IProps) => {
  const { t } = useTranslation();

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
          onScroll={onScroll}
        />
      )}
      {services?.length === 0 && (
        <NoFoundMessage
          sx={{ marginTop: 50 }}
          title={t("products")}
          description={t("noFoundProducts")}
        />
      )}
    </>
  );
};
