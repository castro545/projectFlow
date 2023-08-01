/* eslint-disable no-unused-vars */

export interface CommentsInterface {
  deleteComment(id: string): Promise<Number | null>;
}
