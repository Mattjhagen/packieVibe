document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerText = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VibeCode",
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "174"
    },
    "description": "VibeCode is an AI-powered no-code app builder and resume site generator...",
    "url": "https://yourdomain.com",
    "image": "https://yourdomain.com/assets/logo.png"
  });
  document.head.appendChild(script);
});
