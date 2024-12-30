import { dummyData } from "../../data/dummyData.js";
import axios from "axios";


const replaceUrlParams = (url, params) => {
    return url.replace(/{([^}]+)}/g, (_, paramName) => {
      return params[paramName] || 'defaultValue'; 
    });
  };

 export const makeRequests = async (oasUrl) => {
    const log = [];
  
    const oasResponse = await axios.get(oasUrl);
    const oasData = oasResponse.data;
  
    for (const path in oasData.paths) {
      console.log("path", path);
      for (const method in oasData.paths[path]) {
        if (dummyData.length === 0) {
          log.push({
            method,
            url: `https://petstore.swagger.io/v2${path}`,
            error: 'No more dummy data available',
            statusCode: null,
          });
          continue; 
        }
  
        const data = dummyData.shift();
        console.log("data", data);
  
        let urlWithParams = `https://petstore.swagger.io/v2${path}`;
  
        if (urlWithParams.includes("{petId}")) {
          const petId = data?.data?.petId || data?.params?.petId 
  
          if (petId) {
            urlWithParams = replaceUrlParams(urlWithParams, { petId }); 
          } else {
            console.log("petId not found in data or params");
          }
        }
  
        const url = urlWithParams;
        console.log("urlWithParams", urlWithParams);
  
        try {
          let response;
          if (method === 'get') {
            
            if(path.includes("/findByStatus"))
            response = await axios.get(url, { params: data?.query });
            else
            response = await axios.get(url);
  
            
          } 
          else if (method === 'post' && path.includes("/uploadImage")) { 
            const formData = new FormData();
  
            formData.append('petId', dummyData[0].data.petId);
            formData.append('additionalMetadata', dummyData[0].data.additionalMetadata);
            formData.append('file', dummyData[0].data.file);  
             response = await axios.post(
              url,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',  
                },
              }
            );
          }
  
          else if (method === 'post') {
         
            response = await axios.post(url, data?.data || data?.body, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
              },
            });
          }
          
          else if (method === 'put') {
            response = await axios.put(url, data?.data || data?.body, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } else if (method === 'delete') {
            response = await axios.delete(url, { data: data?.params });
          }
  
          log.push({
            method,
            url,
            requestData: data,
            responseData: response?.data,
            statusCode: response?.status,
          });
        } catch (error) {
          log.push({
            method,
            url,
            requestData: data,
            error: error.message,
            statusCode: error.response ? error.response.status : null,
          });
        }
      }
    }
  
    return log;
  };