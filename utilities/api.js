import axios from 'axios';

const get = async(server, url, jwt, query) => {
    let result, error;
    await axios({
        method: 'get',
        url: server+url+(query?("?"+query):""),
        headers:{
            "Authorization": "Bearer "+jwt,
        },
    })
    .then( res => {
        result = res;
    })
    .catch( err => {
        error = err;
    })

    if (result)
        return result;

    throw new Error(error);
}

const put = async (server, url, jwt, data, successCallback, failureCallback) => {
    let result, error;
    await axios({
        method:'put',
        url: server+url,
        headers:{
            "Authorization": "Bearer "+jwt,
        },
        data:{
            data,
        }
    })
    .then( res => {
        result = res;
    })
    .catch( err => {
        error = err;
    })

    if (result)
        return result;

    throw new Error(error);
}

/*const post = async (server, url, jwt, data, headers) => {
    let result, error;
    await axios.post(server+url, data, {
        headers: headers?headers:{
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer "+jwt,
        }
    })
    .then( res => result = res)
    .catch( err => error = err)

    if (result)
        return result;

    throw new Error(error);
}*/

const post = async(server, url, jwt, data) => {
    let result, error;
    await axios({
        method:'post',
        url: server+url,
        headers:{
            "Authorization": "Bearer "+jwt,
        },
        data:{
            data,
        }
    })
    .then( res => {
        result = res;
    })
    .catch( err => {
        error = err;
    })

    if (result)
        return result;

    throw new Error(error);
}

const postFiles = async (server, url, formData, jwt) => {
    let result, error;
    axios.post(server+url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer "+jwt,
        }
    })
    .then( res => {
        result = res.data.data;
    })
    .catch( err => {
        error = err
    })

    if (result)
        return result;

    throw new Error(error);
}

module.exports.put = put;
module.exports.post = post;
module.exports.get = get;
module.exports.postFiles = postFiles;