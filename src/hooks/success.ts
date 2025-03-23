export const success = (req: any, res: any, next: any) => {
  res.success = (data: any, message = "Success") => {
    res.json({
      code: 200,
      message,
      data,
    });
  };
  next();
};
