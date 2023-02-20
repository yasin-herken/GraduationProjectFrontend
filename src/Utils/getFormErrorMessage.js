export const getFormErrorMessage = (errors, name) => {
  return errors[name] ? (
    <div className="invalid-feedback" style={{ display: "block" }}>
      {errors[name]?.message}
    </div>
  ) : (
    <div className="invalid-feedback" style={{ display: "block" }}>
      &nbsp;
    </div>
  );
};
