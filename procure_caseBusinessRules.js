  let caseConstants={NPRCaseTypeValue:2,};
    
  let photoMappingsConfig = [
    //BD,NPR-None,Heart,Heart-Lung
    { donorType: 692820000, NPR: [692820002], organType: [692820020, 692820032], fieldsToShow: ["procure_photo_podxsupplylist", "procure_photo_cardiacmonitor","procure_photo_heartbeatinginsitu_bdornrp","procure_photo_orgononbacktable","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //BD,NPR-None,Lung-Left.Lung-Right,Billateral-Lungs
    { donorType: 692820000, NPR: [692820002], organType: [692820024, 692820025, 692820033], fieldsToShow: ["procure_photo_podxsupplylist", "procure_photo_cxrvideoofct","procure_photo_recentabg","procure_photo_ventilatormonitor","procure_photo_bronchoscopy","procure_photo_organinsitue_bdornrp","procure_photo_orgononbacktable_lat","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //BD,NPR-None,Liver-Full,Liver-Segment Left,Liver Segment Right
    { donorType: 692820000, NPR: [692820002], organType: [692820036, 692820038, 692820039], fieldsToShow: ["procure_photo_currentliverlabs","procure_photo_videoliversoftpliable","procure_photo_orgononbacktable_rul","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //BD,NPR-None,Kideny-Left,Kidney-Right,Kidney-Enbloc
    { donorType: 692820000, NPR: [692820002], organType: [692820021, 692820022, 692820023], fieldsToShow: ["procure_photo_orgononbacktable_rul","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //DCD,NPR-None,Heart,Heart-Lung
    { donorType: 692820001, NPR: [692820002], organType: [692820020, 692820032], fieldsToShow: ["procure_photo_podxsupplylist", "procure_photo_cardiacmonitor","procure_photo_orgononbacktable","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"]},
    //DCD,NPR-None,,Lung-Left.Lung-Right,Billateral-Lungs
    { donorType: 692820001, NPR: [692820002], organType: [692820024, 692820025, 692820033], fieldsToShow: ["procure_photo_podxsupplylist", "procure_photo_cxrvideoofct","procure_photo_recentabg","procure_photo_ventilatormonitor","procure_photo_bronchoscopy","procure_photo_orgononbacktable_lat","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"]},
    //DCD,NPR-None,Liver-Full,Liver-Segment Left,Liver Segment Right
    { donorType: 692820001, NPR: [692820002], organType: [692820036, 692820038, 692820039], fieldsToShow: ["procure_photo_currentliverlabs","procure_photo_videoliversoftpliable","procure_photo_orgononbacktable_rul","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //DCD,NPR-None,Kideny-Left,Kidney-Right,Kidney-Enbloc
    { donorType: 692820001, NPR: [692820002], organType: [692820021, 692820022, 692820023], fieldsToShow: ["procure_photo_orgononbacktable_rul","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //DCD,NPR-TA/A,Heart,Heart-Lung
    { donorType: 692820001, NPR: [692820000, 692820001], organType: [692820020, 692820032], fieldsToShow: ["procure_photo_podxsupplylist","procure_photo_cardiacmonitor","procure_photo_heartbeatinginsitu_bdornrp", "procure_photo_orgononbacktable","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"]},
    //DCD,NPR-TA/A,Lung-Left.Lung-Right,Billateral-Lungs
    { donorType: 692820001, NPR: [692820000, 692820001], organType: [692820024, 692820025, 692820033], fieldsToShow: ["procure_photo_podxsupplylist", "procure_photo_cxrvideoofct","procure_photo_recentabg","procure_photo_bronchoscopy","procure_photo_organinsitue_bdornrp","procure_photo_orgononbacktable_lat","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"]},
    //DCD,NPR-TA/A,Liver-Full,Liver-Segment Left,Liver Segment Right
    { donorType: 692820001, NPR: [692820000, 692820001], organType: [692820036, 692820038, 692820039], fieldsToShow: ["procure_photo_currentliverlabs","procure_photo_videoliversoftpliable","procure_photo_orgononbacktable_rul","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
    //DCD,NPR-TA/A,Kideny-Left,Kidney-Right,Kidney-Enbloc
    { donorType: 692820001, NPR: [692820000, 692820001], organType: [692820021, 692820022, 692820023], fieldsToShow: ["procure_photo_orgononbacktable_rul","procure_photo_anatomical_surgicalissues","procure_clientrequestedphotos"] },
  ];
  
  function hideAllFields(formContext) {
    photoMappingsConfig.forEach(function(item) {
        item.fieldsToShow.forEach(function(fieldId) {
          let getFieldControl = formContext.getControl(fieldId);
          if(getFieldControl){ getFieldControl.getVisible()?getFieldControl.setVisible(false):'';}  
        });
    });
  }
  
  function updateFieldVisibility(formContext,donorType, NPR, organType) {
    hideAllFields(formContext); // Hide all fields initially
    photoMappingsConfig.forEach(function(item) {
        if (item.donorType === donorType && item.NPR.includes(NPR) && item.organType.includes(organType)) {
            item.fieldsToShow.forEach(function(fieldId) {
              let getFieldControl = formContext.getControl(fieldId);
              if(getFieldControl){getFieldControl.getVisible()?'':getFieldControl.setVisible(true);} 
            });
        }
    });
  }
   function initialLoad(executionContext){
    var formContext = executionContext.getFormContext();
    casephotosbusinessrule(formContext);
  }
  async function casephotosbusinessrule(formContext){
  
    let currentRecordId=formContext.data.entity.getId().replace("{", "").replace("}", "");
    let caselogicalname=formContext.data.entity.getEntityName();
    let caseOrganValue=formContext.getAttribute("procure_case_organ").getValue();
    let caseTypegteObject=formContext.getAttribute("casetypecode");
    let tabCasePhotosObj = formContext.ui.tabs.get("tab_casephotos");
    //console.log(currentRecordId);

    //Rule:1 if case type equals NPR then Hide case photos tab
    if(!caseTypegteObject || !tabCasePhotosObj){return;}
    let caseTypeValue=caseTypegteObject.getValue();
    if(caseTypeValue=== caseConstants.NPRCaseTypeValue){tabCasePhotosObj.getVisible()?tabCasePhotosObj.setVisible(false):'';return;}

    //Rule:2 Based on donor type and organ display different case photo fields
    try{
    let result = await Xrm.WebApi.retrieveRecord(caselogicalname,currentRecordId,"?$select=title&$expand=procure_donor($select=procure_donortype,procure_nrp)");
    if(result){
    //console.log(result.procure_donor.procure_donortype);
    //console.log(result.procure_donor.procure_nrp);
    //console.log(caseOrganValue);
    //perfrom webapi call to retirve donortype and NPR values
    updateFieldVisibility(formContext,result.procure_donor.procure_donortype,result.procure_donor.procure_nrp,caseOrganValue); 
    }
  }catch(e){
    console.log(e);
  }
  
  }
  