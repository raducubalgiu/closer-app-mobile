import { useState } from "react";
import { DisplayComment } from "./DisplayComment";
import axios from "axios";

export const CommentListItem = ({ item, onReply }) => {
  const [relatedComments, setRelatedComments] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const handleRelated = () => {
    setLoadingRelated(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/comments/${item?._id}/related-comments?page=0&limit=20`
      )
      .then((res) => {
        setLoadingRelated(false);
        setRelatedComments(res.data);
      })
      .catch((err) => {
        setLoadingRelated(false);
        console.log(err);
      });
  };

  return (
    <DisplayComment
      item={item}
      onReply={onReply}
      onHandleRelated={handleRelated}
      relatedComments={relatedComments}
      loadingRelated={loadingRelated}
    />
  );
};
