export class CompleteGRBTemplate {
    metro: String;
    band: String;
    totalQty: number;
    tower: String;
    hireType: String;
    hiringAs: String;
    deptCode: String;
    deptName: String;
    supId: String;
    supName: String;
    gpPercentage: number
    attritionYTDPercentage: number
    accountUTEPercentage: number
    practice: String;
    accountType: String;
    location: String;
    geo: String;
    iot: String;
    country: String;
    actualHeadCount: number;
    revenueType: String;
    workforceSolution: String;
    skill: String;
    subProcess: String;
    jobTitle: String;
    eob: Date
    resourceContractType: String;
    gicResourceType: String;
    jrs: String;
    tcv: number
    slaPenalityPerMonth: number
    revenueLossPerMonth: number
    hiringReason: String;
    costSaving: number
    businessJustification: String;
    comments: String;
    deBandingRequest: String;
    goLiveDate: Date

    //GOM Template feilds
    posting: String;
    requestType: String;
    employmentType: String;
    subBand: String;
    remoteWorkPlacePossible: String;
    workplaceIndicator: String;
    canditateAlreadyIdentified: String;
    reasonForCandidateBeenIdentified: String;
    shift: String;
    billable: String;
    travelRequired: String;
    restrictions: String;
    idType: String;
    poolType: String;
     TransferEmployees:GRBTemplateEmployee
     BackfillEmployees:GRBTemplateEmployee
}