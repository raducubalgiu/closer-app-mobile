export interface RelatedComments {
  id: string;
  comment: string;
  post: string;
  previousComment: null;
  relatedCommentsCount: number;
  likesCount: number;
  likedByCreator: boolean;
  user: string;
}
