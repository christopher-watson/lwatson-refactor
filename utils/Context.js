import React, { Component } from 'react';
// import API from '../utils/API'

// Context API
const MyContext = React.createContext();

export class MyProvider extends Component {
  state = {
    loggedIn: false
    // galleryView: true,
    // images: [],
    // displayImageIndex: 0
  };

  // componentDidMount() {
  //   // this.getImages();
  //   this.handleResize();
  //   window.addEventListener('resize', this.handleResize);
  //   window.addEventListener('keydown', this.handleKeyPress);
  // }

  // handleResize = () => {
  //   // console.log(window.innerWidth)
  //   if (window.innerWidth < 901) {
  //     this.setState({ mobile: true });
  //   } else {
  //     this.setState({ mobile: false });
  //   }
  // };

  // handleKeyPress = e => {
  //   // console.log(e.key)
  //   if (e.key === 'ArrowRight') {
  //     this.rightArrowClick();
  //   }
  //   if (e.key === 'ArrowLeft') {
  //     this.leftArrowClick();
  //   }
  // };

  // getImages = () => {
  //   API.findUser('lwatson14')
  //     .then(res => {
  //       console.log(res)
  //       // let randomNums = [];
  //       // for (var i = 0; i < res.data._images.length; i++) {
  //       //   randomNums[i] = Math.floor(Math.random() * 3);
  //       // }
  //       // this.setState({
  //       //   images: [...res.data._images],
  //       //   randomNums: [...randomNums],
  //       //   picSize: [
  //       //     [1, 1],
  //       //     [1, 2],
  //       //     [2, 2]
  //       //   ]
  //       // });
  //     })
  //     .catch(err => console.log(err));
  // };

  // showDisplayImage = index => {
  //   this.setState({ galleryView: false, displayImageIndex: index });
  // };

  // showGalleryView = () => {
  //   if (!this.state.galleryView) {
  //     this.setState({ galleryView: true });
  //   }
  // };

  // leftArrowClick = () => {
  //   const lastIndex = this.state.images.length - 1;
  //   const currentImageIndex = this.state.displayImageIndex;
  //   const shouldResetIndex = currentImageIndex === 0;
  //   const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

  //   this.setState({
  //     displayImageIndex: index
  //   });
  // };

  // rightArrowClick = () => {
  //   const lastIndex = this.state.images.length - 1;
  //   const currentImageIndex = this.state.displayImageIndex;
  //   const shouldResetIndex = currentImageIndex === lastIndex;
  //   const index = shouldResetIndex ? 0 : currentImageIndex + 1;

  //   this.setState({
  //     displayImageIndex: index
  //   });
  // };

  render() {
    return (
      <MyContext.Provider
        value={{
          // state
          state: this.state
          // galleryView: this.state.galleryView,
          // images: this.state.images,
          // displayImageIndex: this.state.displayImageIndex,
          // mobile: this.state.mobile,
          // hArray: this.state.hArray,
          // wArray: this.state.wArray,
          // picSize: this.state.picSize,
          // randomNums: this.state.randomNums,

          // functions
          // showDisplayImage: this.showDisplayImage,
          // showGalleryView: this.showGalleryView,
          // displayImage: this.displayImage,
          // leftArrowClick: this.leftArrowClick,
          // rightArrowClick: this.rightArrowClick
        }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export const MyConsumer = MyContext.Consumer;
