const ownRuntimeCache = [
  {
    urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts-webfonts",
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "google-fonts-stylesheets",
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-font-assets",
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-image-assets",
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\/_next\/image\?url=.+$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "next-image",
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:mp3|wav|ogg)$/i,
    handler: "CacheFirst",
    options: {
      rangeRequests: true,
      cacheName: "static-audio-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:mp4)$/i,
    handler: "CacheFirst",
    options: {
      rangeRequests: true,
      cacheName: "static-video-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-js-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-style-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: () => {
      return true;
    },
    handler: "NetworkFirst",
    options: {
      cacheName: "originRoutes",
      expiration: {
        maxEntries: 32000,
        maxAgeSeconds: 0, // 0 hours
      },
    },
  },
  {
    urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "next-data",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "static-data-assets",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      if (!isSameOrigin) return false;
      const pathname = url.pathname;
      // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without impact other environment
      // Above route is default for next-auth, you may need to change it if your OAuth workflow has a different callback route
      // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
      if (pathname.startsWith("/api/auth/")) return false;
      if (pathname.startsWith("/api/")) return true;
      return false;
    },
    handler: "NetworkFirst",
    method: "GET",
    options: {
      cacheName: "apis",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      if (!isSameOrigin) return false;
      const pathname = url.pathname;
      if (pathname.startsWith("/api/")) return false;
      return true;
    },
    handler: "NetworkFirst",
    options: {
      cacheName: "others",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
      networkTimeoutSeconds: 10,
    },
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      return !isSameOrigin;
    },
    handler: "NetworkFirst",
    options: {
      cacheName: "cross-origin",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 60, // 1 hour
      },
      networkTimeoutSeconds: 10,
    },
  },
];
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: ownRuntimeCache,
  disable: process.env.NODE_ENV === "development",
  dynamicStartUrlRedirect: true,
  dynamicStartUrl: true,
  cacheStartUrl: true,
  buildExcludes: [/\/_next\/data\/.+\/.+\.json$/i, /\.(?:json)$/i],
});

const path = require("path");

module.exports = withPWA({
  reactStrictMode: false,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "m.media-amazon.com",
      "d33qrt5d6zzez8.cloudfront.net",
      "www.comingsoon.net",
      "i5.walmartimages.com",
      "target.scene7.com",
      "login.luckyretailoffers.com",
      "s.w.org",
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  devIndicators: {
    autoPrerender: false,
    buildActivityPosition: "bottom-right",
  },
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
  env: {
    NEXT_IS_SERVER_IN_WTS: process.env.NEXT_IS_SERVER_IN_WTS,
    NEXT_PRIVATE_KEY:
      "MIIEowIBAAKCAQEAvn+hxrGElWtfLqXnuOXMbqiyA7+R+euOvMoIhb2qMNNXl8EN9LjzwSIjFa3Fa6eBQS/mdHhlJntsB2/BrVkFs2aLrjYdOASRbSA6n1lLBaZo8x9YvZcT8tcJUwxXRfAPe9l3QUpMatJ58zGzUWX7rMQ3hoDeI+InCSUZKGZLDCDM2zfcSWh65E0IVcdH3/Dl32tAIy7P5efpQzGbAu/+bSwSE24zFT5lulMXZAkNANep4x4Yj9UYUqxxCGUkoJktQbJoPyKCo1XRz7h/F2s4Ru9kdBsMqTri2POd3HpXzup4Z+s1Nwy5NqP7mSlajS96scgftIzD7h3WNMKl5a3hkwIDAQABAoIBAFj44YUcihEDegwefpCz+3w/nAz2H2a7pwnzznEweVmei82b5DnFXEt69yn75DX4oPziM194j72ebYE3qByfdHMq1NhD+/ea4pU2NUsReGGmLGRI4riB5FZKKte37tcCXSj6E6HR4skNjtmP//FnkVlKt6hBbf8SdCroQczFog2CQbQ+WUeo6qD3aaLDsJZj0BAJEZ3KLoCa1YZD0XTattfNr1fcqfS2Om9yXnXRUiZA1BfClJG3if1ZrMKN4z07QIk3rvn5so/n2Hhbh3hNiot4IS75JUY17Hg9rZa5Ckh85ZfuJXef0Rfofut+uOP+jZaC5kuRmovWHXIN1Zh+EzECgYEA6Tsz3nAPReoyqjtBTnenYefLqZGwLzK+aK6kel8HrANoN2LjKZRy8V3h68ev+eGjCggMQp71ltVroIhyX3SfJ7ROtpkrGMdQJlF269OaLBBT8/I2VlOZ5QbaPXeTk9ypdh0CjmIRRXKiHCL6DeL6/sZR5wiJe4YYSEueU7lAr7kCgYEA0Rh5tEh7UcgyhDkju6Z1XsR4hmCvxyP5q4a7WMmb5feMRvfM72FuDJSa3y7aqOzQui3ljEWyAI7CyqBtTEizi0Gp+sg1pox5FXMIQuJbI71p5Y3xSfkrCwAShRTqXrwKNdSMypz4Gc0cPHsuSMUSynHTmiDk8oAnQ/VxPDMjCasCgYEA4lLc5oF/kKzPNXoCyY47EzrH22jQuzxWoWa3nTgSTc2QmA6RuYugbrBXx2EjVyyp9dYRb6SpVRENO96sfgzBVNoXeAHyXD0tfcGX0QiplxDRJuxn5iWCNUkNBpC+2MFMgJ1uGZT4hZfTz9HxLQCR6CGy4KrcHs3lSmJ25W/jYaECgYADmvJuQ1ms/VCxqvKMx7/6VFTnrD8bpekmJfqQ+1juzCflCVzFO97T5LQO6RXoF705mJT+qCz7iXqeV8nKqO4/lnBB3LXgG0fzMLqRvKlpolhzFtF0PxGY7PVkygmIfKGIcBPFYpN8jmbQPCd+Jbe/Ods2Kx8Hd2I178N2EEOoZQKBgEoS60RCGhyNq6z0XnuYYlpdwv9gWGZaa3WA79G+uhKq5ahehn1R0Iy3JlvoJvMUcuQY18NJwTjFTDzJyQf+xZFwXzs++TVVnmFERSWQsUAWenwhWDNpy/A3IoQXF+ckLO7//uz6k2P8uHjkqtQXc+e9iOYYvarVAao79kxYWT+N",
    NEXT_API_KEY: "AIzaSyAoGn4mi9w34SGpAplKcE9i2cILWCpY5ss",
  },
});
