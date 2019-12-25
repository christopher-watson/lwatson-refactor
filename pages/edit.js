import React, { Component } from 'react';
import { MyConsumer } from '../utils/Context';
import Router from 'next/router';
import Layout from '../components/Layout';
import API from '../utils/API';
// import { inspect } from 'util';

class Edit extends Component {
  // before page lods, grab the images
  // from the use db to display
  static async getInitialProps(stuff) {
    const res = await API.getImages();
    return {
      images: res.data
      // pageLog: inspect(stuff, true, 0),
    };
  }

  /*
    when page is mounted.. 
    - handle the images by sending 
      them to state image array
    - setup the cloudinary widget
  */
  componentDidMount() {
    this.getCookie();
    this.handleInitialProps(this.props);
    this.setState({
      widget: window.cloudinary.createUploadWidget(
        {
          cloudName: 'yowats0n',
          uploadPreset: 'fkddaw6o'
        },
        (error, result) => {
          if (error) {
            console.log(error);
          }
          this.uploadImage(result, this.state.widget);
        }
      )
    });
  }

  //  ------------------  MANDATORY PAGE ACTIONS ---

  // add images from initial props to state
  handleInitialProps = async props => {
    // console.log(props.images._images);
    let imageArr = props.images._images.reverse();
    if (imageArr) {
      await this.setState({
        images: [...imageArr]
      });
    }
    // await console.log(this.state.images[0].url);
    // await console.log(this.state.images);
  };

  // GLOBAL STATE
  state = {
    images: [],
    isLoggedIn: false,
    login: '',
    loginInvalid: false
  };

  // handle login form
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // display widget
  showWidget = widget => {
    widget.open();
  };

  // handle widget for image upload
  // allow user to upload image
  // - add item to user db
  // - add item to state array
  uploadImage = async (resultEvent, widget) => {
    if (resultEvent.event === 'success') {
      let url = await resultEvent.info.secure_url;
      // await console.log(url);
      // await widget.close();
      // this.addImage(url);
      await API.addImageToUser(url)
        .then(res => {
          console.log('🗄 [addImage()] Returned data:', res);
        })
        .catch(err => console.log(err));
      // this.getImages();
      await API.getImages()
        .then(async res => {
          console.log('📷 [getImages()] Returned data:', res);
          let imageArr = res.data._images.reverse();
          await this.setState({
            images: [...imageArr]
          });
        })
        .catch(err => console.log(err));
      // DEBUG RACE CONDITIONS
      await console.log('RELOAD');
    }
  };

  //  ------------------  PAGE FLOW ACTIONS ---

  // check to see if user is logged in
  // by grabbing cookie from local storage
  // and seeing if it matches any previously
  // stored cookies
  getCookie = () => {
    let cookieUser;
    let cookieList = document.cookie.split(';');
    for (var i = 0; i < cookieList.length; i++) {
      let c = cookieList[i].trim();
      // console.log(c);
      if (c.indexOf('username') === 0) {
        // console.log(c.split('=')[1]);
        cookieUser = c.split('=')[1];
      }
    }
    if (cookieUser === 'lwatson14') {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  // if no cookie is present, handle input
  // submit by validating login input value
  // handle incorrect values
  submitLogin = (e, username) => {
    e.preventDefault();
    if (username.toLowerCase() === 'lwatson14') {
      this.setState({ isLoggedIn: true });
      // this.setState({ isLoggedIn: true, username: username });
      this.setCookie('lwatson14');
    } else {
      this.setState({ loginInvalid: true });
      setTimeout(() => {
        this.setState({ loginInvalid: false });
      }, 3000);
    }
  };

  // remove image from user
  // - remove from user db
  // - reload images on page
  removeImage = async imageId => {
    var r = confirm('Are you sure you want to delete?');
    if (r === true) {
      // console.log(`🗑 [removeImage()] Returned image: `, image);
      await API.removeImageFromUser(imageId)
        .then(res => {
          console.log('🗑 [removeImage()] Returned data:', res);
        })
        .catch(err => console.log(err));
      // this.getImages();
      await API.getImages()
        .then(async res => {
          console.log('📷 [getImages()] Returned data:', res);
          let imageArr = res.data._images.reverse();
          await this.setState({
            images: [...imageArr]
          });
        })
        .catch(err => console.log(err));
      // DEBUG RACE CONDITIONS
      await console.log('RELOAD');
    }
  };

  // reload images on page by making API call
  // and updating state
  // not sure if this is used???
  // getImages = async () => {
  //   API.getImages()
  //     .then(async res => {
  //       console.log('📷 [getImages()] Returned data:', res);
  //       let imageArr = res.data._images.reverse();
  //       await this.setState({
  //         images: [...imageArr]
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  logout = async e => {
    e.preventDefault();
    await this.setState({ isLoggedIn: false });
    document.cookie = await 'username=;path=/edit;expires=-1';
    await Router.push('/');
  };

  //  ------------------  HELPER FUNCTIONS ---

  // creates a cookie and sets it to the browser
  // path /edit, expires in 5 hours
  setCookie = value => {
    let d = new Date();
    d.setTime(d.getTime() + 5 * 60 * 60 * 1000);
    let expires = d.toUTCString();
    document.cookie = 'username=lwatson14;path=/edit;expires=' + expires;
  };

  // deletes cookie from browser -> voids after session
  // not used for race condition reasons
  // implelemted logic in logout
  deleteCookie = async () => {
    document.cookie = await 'username=lwatson14;path=/edit;expires=-1';
    await Router.push('/');
  };

  // addImage = async url => {
  //   API.addImageToUser(url)
  //     .then(res => {
  //       console.log('🗄 [addImage()] Returned data:', res);
  //     })
  //     .catch(err => console.log(err));
  // };

  //  ------------------  RENDER METHOD ---

  render() {
    // create element that maps all images from state
    const allImagesFromState = this.state.images.map((image, index) => (
      <div key={index} className='map-div'>
        <div className='image-div'>
          <img className='edit-page-image' src={image.url} alt={image.url} />
        </div>
        <div className='remove-div'>
          <button
            className='remove-button'
            onClick={() => this.removeImage(image.image_id)}>
            <i className='fas fa-times-circle'></i> Remove
          </button>
        </div>
      </div>
    ));

    return (
      <Layout>
        <MyConsumer>
          {({ state }) => (
            <div className='edit-container'>
              {this.state.isLoggedIn ? (
                <div className='edit-inner-container'>
                  <div className='edit-button-div'>
                    <button
                      className='button home-button'
                      onClick={() => Router.push('/')}>
                      <i className='fas fa-home'></i> Home
                    </button>
                    <button
                      className='button upload-button'
                      onClick={() => this.showWidget(this.state.widget)}>
                      <i className='fas fa-cloud-upload-alt'></i> Upload
                      Image(s)
                    </button>
                    <button
                      className='button logout-button'
                      onClick={e => this.logout(e)}>
                      <i className='fas fa-door-open'></i> Logout
                    </button>
                  </div>
                  <div className='image-container'>
                    {this.state.images.length > 0 ? (
                      <div className='inner-image-div'>
                        {allImagesFromState}
                      </div>
                    ) : (
                      <div className='no-images'>
                        No Images! <i className='fas fa-images'></i>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='edit-form-container'>
                  <div className='inner-edit-button-div'>
                    <button
                      className='button home-button'
                      onClick={() => Router.push('/')}>
                      <i className='fas fa-home'></i> Home
                    </button>
                  </div>
                  <div className='inner-edit-form-div'>
                    <form>
                      <label htmlFor='login' className='login-label'>
                        Login
                      </label>
                      <input
                        type='text'
                        name='login'
                        className='login-input'
                        value={this.state.login}
                        onChange={this.handleInputChange}
                      />
                      <button
                        type='submit'
                        className='login-button'
                        onClick={e => this.submitLogin(e, this.state.login)}>
                        <i className='fas fa-check-circle'></i>
                      </button>
                    </form>
                  </div>
                  <small id='login-error'>
                    {this.state.loginInvalid ? 'Incorrect Username' : <br />}
                  </small>
                </div>
              )}
            </div>
          )}
        </MyConsumer>
      </Layout>
    );
  }
}

export default Edit;
