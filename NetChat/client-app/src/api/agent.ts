import axios, { AxiosResponse } from "axios";
// import { useEffect } from "react";
// import { useNavigate, Navigate } from 'react-router-dom';

import { ChannelType, IChannel } from '../models/channels';
import { IMessage, IMessageFormValues, IMediaFormValues } from '../models/messages';
import { IUser, IUserFormValues, IUserAppColors } from '../models/users';


axios.defaults.baseURL = 'http://localhost:5000/api'

//esto no anduvo
//https://github.com/axios/axios#global-axios-defaults
//axios.defaults.headers.common['Authorization'] = token;


axios.interceptors.request.use(
    async config => {

        const token = window.localStorage.getItem("jwt") || ''
        
        config.headers = { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
      Promise.reject(error)
  });

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const respondeBody = (response: AxiosResponse) => response.data;


const request = {
    get: (url: string) => axios.get(url).then(respondeBody),
    post: (url: string, body: {}) => axios.post(url,body).then(respondeBody),
    put : (url: string, body: {}) => axios.put(url,body).then(respondeBody),
    delete : (url: string) => axios.delete(url).then(respondeBody),
    postMedia: (url:string, media: IMediaFormValues) =>  {
        let formData = new FormData()
        formData.append('File', media.file)
        formData.append('ChannelId', media.channelId)
        formData.append('MessageType', '2')

        return axios.post(url, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            }            
        }).then(respondeBody)
    }
}

const Channels = {
    list: (channelType: ChannelType) : Promise<IChannel[]> => request.get(`/channels?ChannelType=${channelType}`),
    create: (channel: IChannel) => request.post('/channels', channel),
    detail: (channelId: string) : Promise<IChannel> => request.get(`/channels/${channelId}`),
    privateChannel: (channelId: string) : Promise<IChannel> => request.get(`/channels/private/${channelId}`),
    update: (channel: IChannel) => request.put(`/channels/${channel.id}`, channel),
}


const User = 
{
    login: (user: IUserFormValues): Promise<IUser> => request.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => request.post(`/user/register`, user),
    current: (): Promise<IUser> => request.get(`/user`),
    list: (): Promise<IUser[]> => request.get(`user/list`),
    logout: (userId: string): Promise<IUser> => request.get(`user/logout/${userId}`),
    updateColors: (colors: IUserAppColors ) => request.put(`/user/updateColors`, colors)
}

const Messages = {    
    send: (message: IMessageFormValues): Promise<IMessage> => request.post('/messages', message),    
    sendMedia: (media: IMediaFormValues): Promise<IMessage> => request.postMedia(`/messages/upload`, media)
}

export default {
    Channels,
    User,
    Messages,
};
