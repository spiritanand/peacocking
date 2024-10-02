type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Professional AI Photo Studio",
  description:
    "Never need a photographer again. Get professional photos with AI.",
  url: "https://peacocking.pro",
  links: {
    twitter: "https://x.com/spiritanand",
    github: "https://github.com/spiritanand",
  },
};
