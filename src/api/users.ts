import axios from "./index";

interface RegisterUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}
interface ApiResponse {
  data?: any;
  error?: string;
  success: boolean;
}
async function registerUser(data: RegisterUserPayload): Promise<ApiResponse> {
  try {
    const response = await axios.post("user/register/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 201) {
      alert("User registered sucessfully !");
      return {
        success: true,
        data: response.data,
      };
    }
    return {
      success: false,
      error: "Some error occured while registring user",
    };
  } catch (error: any) {
    let errorMessage = "Some unknown error occured";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        `Server responded with ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "No response received from server";
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}
export { registerUser };
