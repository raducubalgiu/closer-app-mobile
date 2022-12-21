export interface RelatedComments {
  id: string;
  comment: string;
  postId: string;
  userId: string;
  previousComment: null;
  relatedCommentsCount: number;
  likesCount: number;
  likedByCreator: boolean;
}
