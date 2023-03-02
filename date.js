
module.exports = getDate;


function getDate() {
    var today = new Date();
    var options ={
        weekday:"long",
        year:"2-digit",
        month:"short"
      }
      
      var day = today.toLocaleDateString("en-US",options);

      return day;
}
