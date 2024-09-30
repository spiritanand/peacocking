import { siteConfig } from "config/site";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const boldFont = fetch(
    new URL("../../assets/josefin-sans/JosefinSans-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full justify-around bg-purple-500">
        <div tw="flex p-20 relative">
          <h2 tw="flex flex-col font-bold tracking-tight text-left">
            <span tw="text-8xl text-white">Most powerful</span>
            <span tw="text-8xl text-white">AI photo studio</span>
            <span tw="text-black text-2xl mt-2">
              Never need a photographer again
            </span>
          </h2>

          <img
            alt={siteConfig.name}
            width="1000"
            height="630"
            src={`https://peacocking.pro/images/upload-photos.png`}
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              borderRadius: "30px",
              transform: "translate(50%, 0)",
              objectFit: "cover",
            }}
          />
        </div>

        <p tw="flex flex-row items-center self-center">
          <img
            alt={siteConfig.name}
            width="32"
            height="32"
            src={`https://peacocking.pro/logo.png`}
            style={{
              objectFit: "cover",
              marginRight: "0.5rem",
            }}
          />
          peacocking.pro
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Josefin Sans",
          data: await boldFont,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
