export const statusDetails = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "info":
      return "yellow";

    default:
      break;
  }
};

export const HttpErrorHandling = ({ response, onSucess, onError }) => {
  switch (response.status) {
    case 200:
      onSucess();
      break;

    case 400:
      onError("Bad Request", "error");
      break;
    case /4*/:
      onError("Something went wrong", "error");
      break;
    case /5*/:
      onError("Something went wrong", "error");
      break;

    default:
      onError();

      break;
  }
};
