export const API_RESPONSE = {
  SUCCESS: (data: any) => {
    return {
      data: { ...data, message: undefined },
      success: true,
      error: false,
      message: data?.message || "Success",
    };
  },

  ERROR: (data: any) => {
    let errorMessage = data?.message || "Something went wrong";

    if (data?.code === 11000) {
      const key = Object.keys(data?.keyValue)[0]; // Get the field causing the duplicate
      errorMessage = `Duplicate entry for ${key}: ${data.keyValue[key]}`;
      data = {};
    }

    return {
      success: false,
      error: true,
      message: errorMessage,
      errors: { ...data, message: undefined },
    };
  },
};
