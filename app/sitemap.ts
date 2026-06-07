export default function sitemap() {
  const baseUrl = "https://toolverse-jet.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/age-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/gst-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/percentage-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/bmi-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/emi-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/discount-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/password-generator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/word-counter`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/qr-generator`,
      lastModified: new Date(),
    },
  ];
}