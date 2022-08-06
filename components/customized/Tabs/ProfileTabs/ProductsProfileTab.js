import { TopTabProducts } from "../TopTabContainer/TopTabProducts";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";

export const ProductsProfileTab = ({ userId, services, service, option }) => {
  const { t } = useTranslation();

  return (
    <>
      {services?.length > 0 && (
        <TopTabProducts
          userId={userId}
          services={services}
          initialRoute={service?.name.toLowerCase()}
          option={option}
        />
      )}
    </>
  );
};
