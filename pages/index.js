import React, { Component } from 'react';
import Layout from '../components/Layout';
import { MyConsumer } from '../utils/Context';
import API from '../utils/API';
import '../style/global.css';
import '../style/index.css';

class Home extends Component {
  state = {
    galleryView: true,
    images: [],
    displayImageIndex: 0,
    mobile: false
  };

  componentDidMount() {
    this.getImages();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyPress);
  }

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
        console.log(res.data);
        let randomNums = [];
        for (var i = 0; i < res.data._images.length; i++) {
          randomNums[i] = Math.floor(Math.random() * 3);
        }
        this.setState({
          images: [...res.data._images],
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

  render() {
    return (
      <Layout>
        <MyConsumer>
          {({ state }) => (
            <div>
              <div className='home-container'>
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
                  <div className='info-text'>
                    <ul className='info-ul'>
                      <li className='info-li'>Modeling</li>
                      <li className='info-li'>Acting</li>
                      <li className='info-li'>Writing</li>
                      <li className='info-li'>Fitness</li>
                    </ul>
                  </div>
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
                          onClick={() => leftArrowClick()}>
                          <i className='fas fa-angle-double-left'></i>
                        </div>
                        <div
                          className='right-arrow hover'
                          onClick={() => rightArrowClick()}>
                          <i className='fas fa-angle-double-right'></i>
                        </div>
                        <div
                          className='show-all hover'
                          onClick={() => showGalleryView()}>
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
                          <img
                            className='gallery-page-image'
                            src={image.url}
                            alt={`Lindsay: ${index + 1}`}
                            onClick={() => showDisplayImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='inner-display-div'>
                      <img
                        className='display-image'
                        src={images[displayImageIndex].url}
                        alt={`Lindsay: ${displayImageIndex}`}
                        onClick={() => showGalleryView()}
                      />
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
