// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * @typedef {import('@astrojs/sitemap').SitemapItem} SitemapItem
 */

// https://astro.build/config
export default defineConfig({
    site: "https://raizinterna.resagar.com",
    trailingSlash: "never",

    integrations: [
        sitemap({
            filter: (page) => !page.includes("/404"),
            // @ts-ignore — the SitemapItem type uses a TS enum for changefreq, but the serialized values are plain strings. The runtime accepts both.
            serialize: (item) => {
                const url = item.url.replace(/\/$/, "") || "/";
                const normalized = { ...item, url };
                if (url === "https://raizinterna.resagar.com") {
                    return {
                        ...normalized,
                        priority: 1.0,
                        changefreq: "weekly",
                    };
                }
                if (url === "https://raizinterna.resagar.com/autor") {
                    return {
                        ...normalized,
                        priority: 0.5,
                        changefreq: "monthly",
                    };
                }
                if (
                    /^https:\/\/raizinterna\.resagar\.com\/memorias\/[^/]+$/.test(
                        url,
                    )
                ) {
                    return {
                        ...normalized,
                        priority: 0.8,
                        changefreq: "monthly",
                    };
                }
                return normalized;
            },
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
        shikiConfig: {
            theme: "monokai",
        },
    },

    build: {
        format: "file",
    },
});
