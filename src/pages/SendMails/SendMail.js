import api from '../../config/URL';

const SendMail = async() => {
    let mailContent =``
    try {
        const response = await api.post("sendMail");
        return response.data;
      } catch (error) {
        toast.error("Error sending email:", error);
        throw error;
      }
}

export default SendMail
