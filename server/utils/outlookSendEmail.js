const { default: axios } = require("axios");

const outlookSendEmail = async (options, accessToken) => {
    try {
        await axios.post(
            "https://graph.microsoft.com/v1.0/me/sendMail",
            {
                message: {
                    subject: options.subject,
                    body: {
                        contentType: "Text",
                        content: options.content,
                    },
                    toRecipients: [
                        {
                            emailAddress: {
                                address: options.targetEmail,
                            },
                        },
                    ],
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (e) {
        console.log(e.response.data);
    }
};

module.exports = outlookSendEmail;