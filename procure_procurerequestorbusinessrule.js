
let ordetailsMappingsConfig = [
    //BD,NPR-None
    { donorType: [692820000], NPR: [692820002],  sectionsToShow: ["tab_ordetails_section_bd"] },
    //DCD,NPR-None
    { donorType: [692820001], NPR: [692820002], sectionsToShow: ["tab_ordetails_section_dcd"] },
    //DCD,NPR
    { donorType: [692820001], NPR: [692820000, 692820001], sectionsToShow: ["tab_ordetails_section_dcdnrp"] },
    
    ];
    
    function hideAllSections(formContext) {
    ordetailsMappingsConfig.forEach(function(item) {
    item.sectionsToShow.forEach(function(fieldId) {
    let getsectionControl = formContext.ui.tabs.get("tab_ordetails").sections.get(fieldId);
    if(getsectionControl){ getsectionControl.getVisible()?getsectionControl.setVisible(false):'';}  
    });
    });
    }
    
    function updateSectionVisibility(formContext,donorType, NPR) {
    hideAllSections(formContext); // Hide all sections initially
    if(donorType==null ||NPR==null){
        return;
    }
    ordetailsMappingsConfig.forEach(function(item) {
    if (item.donorType.includes(donorType) && item.NPR.includes(NPR)) {
    item.sectionsToShow.forEach(function(fieldId) {
      let getsectionControl = formContext.ui.tabs.get("tab_ordetails").sections.get(fieldId);
      if(getsectionControl){getsectionControl.getVisible()?'':getsectionControl.setVisible(true);} 
    });
    }
    });
    }
    function initialLoad(executionContext){
    var formContext = executionContext.getFormContext();
    procurerequestorbusinessrule(executionContext);
    formContext.getAttribute("procure_donor").addOnChange(procurerequestorbusinessrule);
    }
    async function procurerequestorbusinessrule(executionContext){
        var formContext = executionContext.getFormContext();
    //let currentRecordId=formContext.data.entity.getId().replace("{", "").replace("}", "");
    let donorObject=formContext.getAttribute("procure_donor");
    //let procurerequestlogicalname=formContext.data.entity.getEntityName();
    //console.log(currentRecordId);
    
    if(!donorObject || !donorObject.getValue()){
        updateSectionVisibility(formContext,null,null); 
        return;
    }
    let donorObjectvalue = donorObject.getValue()[0].id.replace("{", "").replace("}", "");
    //let donorObjectvalue = donorObject.getValue();
    
    //Rule:1 Based on donor type and organ display different case photo fields
    try{
    let result = await Xrm.WebApi.retrieveRecord("procure_donor",donorObjectvalue,"?$select=procure_donortype,procure_nrp");
    if(result){
    //console.log(result.procure_donor.procure_donortype);
    //console.log(result.procure_donor.procure_nrp);
    //console.log(caseOrganValue);
    //perfrom webapi call to retirve donortype and NPR values
    updateSectionVisibility(formContext,result.procure_donortype,result.procure_nrp); 
    }
    }catch(e){
    console.log(e);
    }
    
    }