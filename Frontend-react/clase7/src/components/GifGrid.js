import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { GifGridItem } from "./GifGridItem";
import { getGifs } from "../helpers/getGifs";

export const GifGrid = ({ category }) => {
  //const { data: images, loading } =//useFetchGifs(category);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  getGifs(category).then((images) => {
    console.log(images);
    setImages(images);
    setLoading(false);
  });
  return (
    <>
      <h3 className="animate__animated animate__fadeIn animate__faster">
        {category}
      </h3>
      {loading && (
        <p className="animate__animated animate__flash">Loading...</p>
      )}
      <div className="card-grid">
        {images.map((img) => (
          <GifGridItem key={img.id} {...img} />
        ))}
      </div>
    </>
  );
};
GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
};
