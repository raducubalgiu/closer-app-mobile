import { TopTabProducts } from "../TopTabContainer/TopTabProducts";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";

export const ProductsProfileTab = ({ userId, services, initialRoute }) => {
  const { t } = useTranslation();

  const noFoundProducts = (
    <NoFoundMessage
      title={t("products")}
      description={t("noFoundProducts")}
      sx={{ marginTop: 50 }}
    />
  );

  return (
    <>
      {services?.length > 0 && (
        <TopTabProducts
          userId={userId}
          services={services}
          initialRoute={initialRoute}
        />
      )}
      {!services?.length && noFoundProducts}
    </>
  );
};
