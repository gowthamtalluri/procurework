// procure namespace
var procure_casecordinator = procure_casecordinator || {};

// set 'Sdk.setParentAccountIdFilter' in the Opportunity form onload event handler
procure_casecordinator.onFormLoad = function (executionContext) {
    // get the form context
    let formContext = executionContext.getFormContext();
    //formContext.getAttribute(arg).getValue();
    formContext.getControl("procure_coordinator").addPreSearch(procure_casecordinator.filtercontacts);
}
//Filter contacts based on co-ordinator type selected
procure_casecordinator.filtercontacts = function (executionContext) {
    // get the form context
    let formContext = executionContext.getFormContext();
    let ContactTypeValue=0;
    //access cordinator value
    let coordinatorTypeValue =formContext.getAttribute("procure_coordinatortype").getValue();
    console.log("value"+coordinatorTypeValue);
switch(coordinatorTypeValue){
     case 692820000:
        ContactTypeValue=692820003;//contact opo
        break;
     case 692820001:
        ContactTypeValue=692820004; //contact transplant centre
        break;
     default:
            return;  
    }

    var coordinatorContactFilter = `<filter type='and'><condition attribute='statecode' operator='eq' value='0'/><condition attribute='procure_contacttype' operator='in'><value>${ContactTypeValue}</value></condition></filter>`;
    formContext.getControl("procure_coordinator").addCustomFilter(coordinatorContactFilter, "contact");
}