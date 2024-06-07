export const convertDate = (date:string) => {
  var inputDate = new Date(date);

  var year = inputDate.getFullYear().toString(); // Lấy 2 chữ số cuối cùng của năm
  var month = ("0" + (inputDate.getMonth() + 1)).slice(-2); // Thêm "0" phía trước nếu cần thiết
  var day = ("0" + inputDate.getDate()).slice(-2); // Thêm "0" phía trước nếu cần thiết

  return year + "-" + month + "-" + day;
};
