import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

function Seo({ title, description, image, url, favicon, manifestUrl }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="apple-touch-icon" href={favicon} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link href={image} sizes="750x1334" rel="apple-touch-startup-image" />
      <link rel="icon" href={favicon} />
      {manifestUrl ? (
        <link rel="manifest" href={manifestUrl} id="mainManifest" />
      ) : null}

      {/* <!-- Facebook Meta Tags --/> */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* <!-- Twitter Meta Tags --/> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={url} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="viewport"
        content="initial-scale=1,minimum-scale=1,maximum-scale=1.0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </Head>
  );
}
// Proptypes validation
Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default Seo;
