function validateDonorUnosID(executionContext) {
  var formContext = executionContext.getFormContext();
  var donorUnosID = formContext.getAttribute("procure_donorunosid");
  var donorIdRGEX = /^[a-zA-Z0-9]{7}$/;
  var donorUnosIDValue = formContext.getAttribute("procure_donorunosid").getValue();
  var donorUnosIDControl = formContext.getControl("procure_donorunosid");

  if (!donorIdRGEX.test(donorUnosIDValue)) {
    donorUnosIDControl.setNotification('Please enter an alphanumeric value exactly 7 characters long.');
  } else {
    donorUnosIDControl.clearNotification();
  }
}
