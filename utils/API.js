import axios from 'axios';

const url = 'https://image-uploader-prod.now.sh/api';

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export default {
  getImages: async function() {
    try {
      const response = await axios.get(`${url}/users/findByUserName/lwatson14`);
      await console.log('👍 [getImages] Returned data:', response);
      return await response;
    } catch (e) {
      console.log(`🛑 [getImages] Axios request failed: ${e}`);
    }
  },

  addImageToUser: async function(imageUrl) {
    var lowResBack = imageUrl.split('https://res.cloudinary.com/yowats0n/image/upload/')[1];
    var lowRes = 'https://res.cloudinary.com/yowats0n/image/upload/q_10/'+lowResBack;
    try {
      const response = await axios.post(
        `${url}/users/addImageToUser/lwatson14`,
        { url: imageUrl, image_id: create_UUID(), low_res: lowRes}
      );
      await console.log('👍 [addImageToUser] Returned data:', response);
      return await response;
    } catch (e) {
      console.log(`🛑 [addImageToUser] Axios request failed: ${e}`);
    }
  },

  removeImageFromUser: async function(imageId) {
    try {
      const response = await axios.put(
        `${url}/users/removeImageFromUser/lwatson14`,
        { image_id: imageId }
      );
      await console.log('👍 [removeImageFromUser] Returned data:', response);
      return await response;
    } catch (e) {
      console.log(`🛑 [removeImageFromUser] Axios request failed: ${e}`);
    }
  },
};
