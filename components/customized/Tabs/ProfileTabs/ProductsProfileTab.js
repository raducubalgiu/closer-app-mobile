import React from "react";
import { ShowProducts } from "../../ShowProducts/ShowProducts";

export const ProductsProfileTab = ({ userId, route, services }) => {
  const { serviceId, product } = route?.params || {};

  return (
    <ShowProducts
      userId={userId}
      services={services}
      initServ={services[0]?._id}
      serviceId={serviceId}
      product={product}
    />
  );
};
