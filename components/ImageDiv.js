import React from 'react';

const ImageDiv = props => {
  // create element that maps all images from state
  const allImagesFromState = props.images.map((image, index) => (
    <div key={index} className='map-div'>
      <div className='image-div'>
        <img className='edit-page-image' src={image.url} alt={image.url} />
      </div>
      <div className='remove-div'>
        <button
          className='remove-button'
          onClick={() => this.removeImage(image.url, index)}>
          <i className='fas fa-times-circle'></i> Remove
        </button>
      </div>
    </div>
  ));
  return (
    <div>
      {props.images.length > 0 ? (
        <div className='inner-image-div'>{allImagesFromState}</div>
      ) : (
        <div className='no-images'>
          No Images! <i className='fas fa-images'></i>
        </div>
      )}
    </div>
  );
};

export default ImageDiv;
