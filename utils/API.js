import axios from 'axios';

const url = 'https://image-uploader-prod.now.sh/api';

export default {
  // getImages: function() {
  //   return axios.get(`${url}/users/findByUserName/lwatson14`);
  // },

  getImages: async function() {
    try {
      const response = await axios.get(`${url}/users/findByUserName/lwatson14`);
      await console.log('👉 [getImages] Returned data:', response);
      return await response;
    } catch (e) {
      console.log(`😱 [getImages] Axios request failed: ${e}`);
    }
  },

  addImageToUser: async function(imageUrl) {
    try {
      const response = await axios.post(
        `${url}/users/addImageToUser/lwatson14`,
        { url: imageUrl }
      );
      await console.log('👉 [addImageToUser] Returned data:', response);
      return await response;
    } catch (e) {
      console.log(`😱 [addImageToUser] Axios request failed: ${e}`);
    }
  }

};
