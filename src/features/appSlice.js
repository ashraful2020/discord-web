import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channelId: null,
        channelName: null,
        serverId: null,
        serverName: null
    },
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId
            state.channelName = action.payload.channelName
        },
        setServerInfo: (state, action) => {
            state.serverId = action.payload.serverId
            state.serverName = action.payload.serverName
        }
    },

});

export const { setChannelInfo, setServerInfo } = appSlice.actions;
export const selectChannelId = (state) => state?.app?.channelId;
export const selectChannelName = (state) => state?.app?.channelName;
export const selectServerId = (state) => state?.app?.serverId;
export const selectServerName = (state) => state?.app?.serverName;

export default appSlice.reducer;
