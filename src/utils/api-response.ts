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
    return {
      errors: { ...data, message: undefined },
      success: false,
      error: true,
      message: data?.message || "Something went wrong",
    };
  },
};
