const outlookSendEmail = require("../../utils/outlookSendEmail");
const { URLSearchParams } = require("url");
const axios = require("axios");

class Microsoft {
    static async sendMail(area) {
        console.log("SendMail reaction called");
        let data = new URLSearchParams();
        data.append("client_id", process.env.MICROSOFT_APPLICATION_ID);
        data.append("client_secret", process.env.MICROSOFT_CLIENT_SECRET);
        data.append("grant_type", "refresh_token");
        data.append("refresh_token", area.user.microsoft.refreshToken);
        let response;
        console.log()
        try {
            response = await axios.post(
                `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
                data
            );
        } catch (error) {
            console.log("error", error);
            return;
        }
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refreshToken;
        if (refreshToken) {
            area.user.microsoft.refreshToken = refreshToken;
            await area.user.save();
        }
        await outlookSendEmail(area.reaction.args, accessToken);
    }
}

module.exports = Microsoft;
