import React, { Component, Fragment } from 'react';
import Layout from '../components/Layout';
import { MyConsumer } from '../utils/Context';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import song from '../utils/music.mp3';
import ReactAudioPlayer from 'react-audio-player';
import API from '../utils/API';

class Home extends Component {
  // // before page lods, grab the screen size
  // static async getInitialProps(stuff) {
  //   const isMobile = window.innerWidth<901 ? true : false
  //   return {
  //     mobile: isMobile
  //   };
  // }

  state = {
    galleryView: true,
    images: [],
    displayImageIndex: 0,
    mobile: false,
    muted: true
  };

  componentDidMount() {
    this.getImages();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyPress);
    var audio = document.getElementById('audio');
    audio.muted = true;
    audio.play();
  }

  // // handle window size
  // handleInitialProps = async props => {
  //   if (props.mobile) {
  //     this.setState({ mobile: true });
  //   } else {
  //     this.setState({ mobile: false });
  //   }
  // };

  handleResize = () => {
    if (window.innerWidth < 901) {
      this.setState({ mobile: true });
    } else {
      this.setState({ mobile: false });
    }
  };

  handleKeyPress = e => {
    if (e.key === 'ArrowRight') {
      this.rightArrowClick();
    }
    if (e.key === 'ArrowLeft') {
      this.leftArrowClick();
    }
  };

  getImages = () => {
    API.getImages('lwatson14')
      .then(res => {
        // console.log(res.data);
        let randomNums = [];
        let imageArr = res.data._images.reverse();
        for (var i = 0; i < imageArr.length; i++) {
          randomNums[i] = Math.floor(Math.random() * 3);
        }
        this.setState({
          images: [...imageArr],
          randomNums: [...randomNums],
          picSize: [
            [1, 1],
            [1, 2],
            [2, 2]
          ]
        });
      })
      .catch(err => console.log(err));
  };

  // getImages = () => {
  //   API.getImages('lwatson14')
  //     .then(res => {
  //       console.log(res.data);
  //       let randomNums = [];
  //       for (var i = 0; i < res.data._images.length; i++) {
  //         randomNums[i] = Math.floor(Math.random() * 3);
  //       }
  //       this.setState({
  //         images: [...res.data._images],
  //         randomNums: [...randomNums],
  //         picSize: [
  //           [1, 1],
  //           [1, 2],
  //           [2, 2]
  //         ]
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  showDisplayImage = index => {
    this.setState({ galleryView: false, displayImageIndex: index });
  };

  showGalleryView = () => {
    if (!this.state.galleryView) {
      this.setState({ galleryView: true });
    }
  };

  leftArrowClick = () => {
    const lastIndex = this.state.images.length - 1;
    const currentImageIndex = this.state.displayImageIndex;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      displayImageIndex: index
    });
  };

  rightArrowClick = () => {
    const lastIndex = this.state.images.length - 1;
    const currentImageIndex = this.state.displayImageIndex;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      displayImageIndex: index
    });
  };

  toggleMute = async () => {
    var audio = document.getElementById('audio');
    if (this.state.muted) {
      audio.muted = await false;
    } else {
      audio.muted = await true;
    }
    await this.setState({
      muted: !this.state.muted
    });
  };

  render() {
    return (
      <Layout>
        <MyConsumer>
          {({ state }) => (
            <div>
              <div className='home-container'>
                {/*------------------------ MUSIC ------------------------*/}
                <div className='music-controls'>
                  <ReactAudioPlayer id='audio' src={song} />
                  {this.state.muted ? (
                    <div
                      className='mute-button'
                      onClick={() => this.toggleMute()}>
                      <i className='fas fa-volume-up'></i>
                    </div>
                  ) : (
                    <div
                      className='mute-button mute'
                      onClick={() => this.toggleMute()}>
                      <i className='fas fa-volume-mute'></i>
                    </div>
                  )}
                </div>
                {/*------------------------ NAVBAR ------------------------*/}
                <div className='nav-div'>
                  {this.state.mobile ? (
                    <div className='logo'>LW</div>
                  ) : (
                    <div className='logo'>
                      Lindsay
                      <br />
                      Watson
                    </div>
                  )}
                  {/* <div className='info-text'>
                    <ul className='info-ul'>
                      <li className='info-li'>Modeling</li>
                      <li className='info-li'>Acting</li>
                      <li className='info-li'>Writing</li>
                      <li className='info-li'>Fitness</li>
                    </ul>
                  </div> */}
                  <div className='cta'>
                    {this.state.mobile ? (
                      <a
                        className='cta-link'
                        href='mailto:malerming@saltmat.com'>
                        <i className='far fa-envelope'></i>
                      </a>
                    ) : (
                      <a
                        className='cta-link'
                        href='mailto:malerming@saltmat.com'>
                        Contact
                      </a>
                    )}
                  </div>
                  <div className='social'>
                    <a
                      className='social-item hover'
                      href='https://www.instagram.com/lindsayawatson'
                      target='_blank'
                      rel='noopener noreferrer'>
                      <i className='fab fa-instagram'></i>
                    </a>
                  </div>
                  <div className='slideshow'>
                    {this.state.galleryView ? (
                      <div className='noSlideshow'></div>
                    ) : (
                      <Fragment>
                        <div
                          className='left-arrow hover'
                          onClick={() => this.leftArrowClick()}>
                          <i className='fas fa-angle-double-left'></i>
                        </div>
                        <div
                          className='right-arrow hover'
                          onClick={() => this.rightArrowClick()}>
                          <i className='fas fa-angle-double-right'></i>
                        </div>
                        <div
                          className='show-all hover'
                          onClick={() => this.showGalleryView()}>
                          <i className='fas fa-th'></i>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>

                {/*------------------------ GALLERY ------------------------*/}
                <div className='gallery-div'>
                  {this.state.galleryView ? (
                    <div className='inner-gallery-div'>
                      {this.state.images.map((image, index) => (
                        <div
                          key={index}
                          className='gallery-map-div hover'
                          grid-w={
                            this.state.picSize[this.state.randomNums[index]][0]
                          }
                          grid-h={
                            this.state.picSize[this.state.randomNums[index]][1]
                          }>
                          <LazyLoadImage
                            className='gallery-page-image'
                            placeholderSrc={image.low_res}
                            src={image.url}
                            effect='blur'
                            delayTime='300'
                            alt={`Lindsay: ${index + 1}`}
                            onClick={() => this.showDisplayImage(index)}
                          />
                          {/* <img
                            className='gallery-page-image'
                            src={image.url}
                            alt={`Lindsay: ${index + 1}`}
                            onClick={() => this.showDisplayImage(index)}
                          /> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='inner-display-div'>
                      <LazyLoadImage
                        className='display-image'
                        src={
                          this.state.images[this.state.displayImageIndex].url
                        }
                        alt={`Lindsay: ${this.state.displayImageIndex}`}
                        onClick={() => this.showGalleryView()}
                      />
                      {/* <img
                        className='display-image'
                        src={
                          this.state.images[this.state.displayImageIndex].url
                        }
                        alt={`Lindsay: ${this.state.displayImageIndex}`}
                        onClick={() => this.showGalleryView()}
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </MyConsumer>
      </Layout>
    );
  }
}

export default Home;
