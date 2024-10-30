export const CSSClass = {
  App: "NovelJs",
};

export const SizeIcons = {
  icon: 20,
  small: {
    rect: {
      width: 27.5,
      height: 27.5,
    },
    thumbnail: {
      width: 25,
      height: 25,
    },
  },
};

export const LocalUrls: {
  [K: string]: string;
} = {
  "/": "home",
  "/game": "game",
};

export const WorkspaceTemplates: {
  name: string;
  data: ContextContent.WorkspaceValue['data']
}[] = [
  {
    name: "Default",
    data: [
      {
        width: 250,
        content: [
          {
            identifier: "test5",
            height: 0,
          },
          {
            identifier: "test6",
            height: 600,
          },
        ],
      },
      {
        width: 0,
        main: true,
        content: [
          {
            identifier: "view",
            height: 0,
          },
          {
            identifier: "test2",
            height: 250,
          },
        ],
      },
      {
        width: 250,
        content: [
          {
            identifier: "test3",
            height: 250,
          },
          {
            identifier: "test4",
            height: 0,
          },
        ],
      },
    ],
  },
];
