import { useState } from "react";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";

export const JobsProfileTab = ({ userId }) => {
  const [jobs, setJobs] = useState([]);
  const { t } = useTranslation();

  return (
    <>
      {jobs?.length === 0 && (
        <NoFoundMessage
          sx={{ marginTop: 50 }}
          title={t("jobs")}
          description={t("noFoundJobs")}
        />
      )}
    </>
  );
};
