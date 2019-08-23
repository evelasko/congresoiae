import axios from 'axios';
import qs from 'qs';

// export const rqConfirm = async (url, data) => {
//   const options = {
//     method: 'POST',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: qs.stringify(data),
//     url,
//   };

//   let response;
//   try {
//     response = await axios(options);
//     if (response.data) {
//       return response.data;
//     }
//     console.log('no data responded');
//     return response;
//   } catch (e) {
//     response = e;
//   }
//   console.log('there might be an error');
//   return response;
// };
