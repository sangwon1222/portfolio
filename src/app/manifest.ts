import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#97282C",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "LSW-APP",
    description: "lsw portfolio",
    short_name: "LSW-APP",
    icons: [
      {
        src: "/assets/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/assets/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/assets/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
