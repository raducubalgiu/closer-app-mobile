import { Service } from "../../../../ts";
import { TopTabServices } from "../TopTabContainer/TopTabServices";
import { useGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { isEmpty } from "lodash";

type IProps = {
  userId: string;
  service: Service | null;
  option: string | null;
  locationId: string;
  onScroll: () => void;
  onScrollEndDrag: (e: any) => void;
};

const ProductsProfileTab = ({
  userId,
  service,
  option,
  locationId,
  onScroll,
  onScrollEndDrag,
}: IProps) => {
  const { t } = useTranslation("common");

  const { data: services } = useGet({
    model: "services",
    uri: `/locations/${locationId}/services`,
  });

  return (
    <>
      {!isEmpty(services) && (
        <TopTabServices
          userId={userId}
          initialRoute={service?.name.toLowerCase()}
          service={service}
          option={option}
          services={services}
          onScroll={onScroll}
          onScrollEndDrag={onScrollEndDrag}
        />
      )}
      {isEmpty(services) && (
        <NoFoundMessage
          sx={{ marginTop: 50 }}
          title={t("products")}
          description={t("noFoundProducts")}
        />
      )}
    </>
  );
};

export default memo(ProductsProfileTab);
