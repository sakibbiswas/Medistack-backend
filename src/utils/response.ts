export const successResponse = (res: any, data: any, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res: any, message = "Error", statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
