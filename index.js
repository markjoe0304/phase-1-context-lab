function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create employee records from an array of arrays
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  // Function to create a time-in event
  function createTimeInEvent(dateTime) {
    this.timeInEvents.push({
      type: "TimeIn",
      date: dateTime.split(' ')[0],
      hour: parseInt(dateTime.split(' ')[1])
    });
    return this;
  }
  
  // Function to create a time-out event
  function createTimeOutEvent(dateTime) {
    this.timeOutEvents.push({
      type: "TimeOut",
      date: dateTime.split(' ')[0],
      hour: parseInt(dateTime.split(' ')[1])
    });
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date).hour;
    let timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  // Function to calculate payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
  }  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}