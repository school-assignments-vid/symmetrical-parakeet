export interface SourceFile {
  name: string;
  type: "folder" | "file";
  size?: string;
  children?: SourceFile[];
  content?: string;
  url?: string;
  assetType?: "iframe" | "video" | "image" | "file";
  requiresExternal?: boolean;
}

export const sourcesData: SourceFile[] = [
  {
    name: "public",
    type: "folder",
    children: [
      {
        name: "images",
        type: "folder",
        children: [
          {
            name: "avatar-image.png",
            type: "file",
            size: "2.3MB",
            assetType: "image",
            url: "/avatar-image.png",
          },
        ],
      },
    ],
  },
];
