import { FlatList } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";

export const JobsProfileTab = ({ userId, username }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const { t } = useTranslation();

  let noFoundJobs;
  if (jobs.length === 0 && user?._id === userId) {
    noFoundJobs = (
      <NoFoundMessage
        title={t("jobs")}
        description={t("jobsPostedByYouMessage")}
      />
    );
  } else if (jobs.length === 0 && user?._id !== userId) {
    noFoundJobs = (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("jobs")}
        description={`${t("jobsPostedBy")} ${username} ${t("willApearHere")}`}
      />
    );
  }

  return (
    <>
      {jobs.map((job, i) => (
        <CardJob
          key={i}
          name={job?.name}
          description={job?.description}
          priority={job?.priority}
        />
      ))}
    </>
  );
};
