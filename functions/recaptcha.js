import process from "process";
import axios from "axios";
const recaptchaSecretKey = process.env.HUGO_RECAPTCHA_SECRET_KEY;

function response(statusCode, errorMsg, data = {}) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  return {
    statusCode: statusCode,
    headers: headers,
    body: JSON.stringify({
      response: {
        statusCode: statusCode,
        error: errorMsg,
        data: data,
      },
    }),
  };
}

exports.handler = async function (event, context) {
  // only allow POST request
  if (event.httpMethod !== "POST") {
    return response(405, "Only POST method is allowed");
  }

  try {
    const { responseToken } = JSON.parse(event.body);

    if (!recaptchaSecretKey) {
      return response(500, "Recaptcha secret key missing");
    }

    if (!responseToken) {
      return response(400, "Recaptcha token missing");
    }

    let tokenvalid = false;

    const recaptchaEndpoint = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${responseToken}`;
    await axios.post(recaptchaEndpoint).then((response) => {
      if (response.data) {
        tokenvalid = response.data.success;
      }
    });

    if (tokenvalid) {
      return response(200, "", { tokenValid: true });
    } else {
      return response(400, "Recaptcha token invalid", { tokenValid: false });
    }
  } catch (error) {
    console.error(error);
    return response(500, error.message);
  }
};
