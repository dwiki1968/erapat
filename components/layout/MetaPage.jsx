import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";

const MetaPage = ({ titlePage }) => {
  return (
    <div>
      <Head>
        <title>{titlePage}</title>
        <meta
          name="description"
          content="Aplikasi Rapat Pusat Teknologi Informasi PPTAK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

MetaPage.propTypes = {
  titlePage: PropTypes.string,
};

export default MetaPage;
