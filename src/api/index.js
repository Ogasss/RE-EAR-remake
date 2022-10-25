import request from './ajax'
//引入ajax

export const loginApi = (id) =>{
    return request({
        url:'/userList/'+id,
        method:'GET'
    })
}

export const registerApi = (data) =>{
    return request({
        url:'/userList/',
        method:'POST',
        data:data
    })
}

export const searchTelApi = (id) =>{
    return request({
        url:'/userList/'+id,
        method:'GET',
    })
}

export const changeUsernameApi = (id,object) =>{
    return request({
        url:'/userList/'+id,
        method:'PUT',
        data:object
    })
}

export const userDelete = (id) =>{
    return request({
        url:'/userList/'+id,
        method:'DELETE'
    })
}