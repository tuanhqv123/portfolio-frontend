export interface BlogPost {
  _id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail?: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
  threadLink: string;
  author: string;
  authorLink: string;
  openInXLink: string;
  videoOverlayClass?: string;
  videoLightboxClass?: string;
}
