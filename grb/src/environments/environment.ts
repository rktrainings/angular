// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
  // url:"https://ddyamscpsma01.sl.bluecloud.ibm.com:8086",
    // url:"https://ddyamscpsma01.sl.bluecloud.ibm.com:8443",
  //url:"https://dgamscpsmd01.sl.bluecloud.ibm.com:7090",

export const environment = {
  production: false,
  url: "http://localhost:8086",
  clientUrl: "http://localhost:4200", //sit client url
  redirectUrl:"https://ddyamscpsma01.sl.bluecloud.ibm.com/GRB1/",
  LOGOUT:"/app01/dashboard/logout",
  CHECK_TERMS: "/app01/chkTermAndCond/",
  ACCEPT_TERMS: "/app01/accept-term",
  USER_DETAILS: "/app01/dashboard/user-data",
  LEFT_MENU: "/app01/dashboard/rolemapping",
  MY_SPAN: "/myspan",
  MY_REPORTEE: "/myreportee",
  EDIT_MY_SPAN: "/editfield",
  ADD_RESIGNATION: "/addLastWorkingDay",
  WITHDRAW_RESIGNATION: "/resignationWithdrawl",
  EDIT_FIELD: "/editfield",
  EXPORT_MY_SPAN_BIZOPS: '/myspanbizops',
  EXPORT_MYSPAN: "/exportmyspan",
  EXPORT_MYREPORTEE: "/exportmyreportee",
  ATTRITION_LIST: "/app01/attritionDashboard/attritedEmployees/",
  POST_REQUEST: "/app01/attritionDashboard/enableBackfill/",
  POST_APPROVE: "/app01/attritionDashboard/approveBackfill",
  ATTRITION_WITHDRAW_RESIGNATION: "/app01/attritionDashboard/withdrawResignation/",
  EXPORT_ATTRITED_EMPLOYEES: "/app01/attritionDashboard/attritionfile/",

  CONVERT_EXTERNAL_TO_INTERNAL: '/app02/modifymetro/convert-external-to-internal',
  GRB_SUBMIT_API: "/app02/hiringrequest/submit-hiring-request",
  BACKFILLATTRITION_LIST: "/app02/backfillAttritedEmployees/",
  BACKFILL_PROMOTION_LIST: "/app02/get-backfill-promotion-emp",
  ITT_LIST: "/app02/closedInternalTransferEmployees/",
  ORP_DETAILS: "/app02/orpAssessedDetails/",
  APPROVAL_CENTER_IOT_DATA_API: "/app02/approvalcenter/iot/",
  APPROVAL_CENTER_BOARD_DATA_API: "/app02/approvalcenter/board",
  APPROVAL_CENTER_BIZOPS_DATA_API: "/app02/approvalcenter/bizops",
  APPROVAL_CENTER_APPROVED_IOT_API: "/app02/approvalcenter/approvedIot",
  APPROVAL_CENTER_APPROVED_BOARD_API: "/app02/approvalcenter/approvedboard",
  APPROVAL_CENTER_APPROVED_BIZOPS_API: "/app02/approvalcenter/approvedbizops",
  APPROVAL_CENTER_TOLLS_DETAILS_API: "/app02/hireRequestTolls/",
  CCN_LIST_API: "/app02/newgrowth/get-approved-CCNPCR",
  CCN_DETALS_API: "/app02/newgrowth/ccnpcr-details/",
  APPROVAL_CENTER_GRB_INTERNAL_API: "/app02/approvalcenter/metrodetailinternal/",
  APPROVAL_CENTER_GRB_EXTERNAL_API: "/app02/approvalcenter/metrodetailexternal/",
  VERIFY_METRO: '/app02/hiringrequest/check-for-duplicate-metro/',
  VERIFY_METRO_SUBK: '/app03/hireemployee/check-for-duplicate-metro/',
  GET_SUPERVISOR_NAME: '/app02/hiringrequest/get-supervisor-name/',
  GET_SUPERVISOR_NAME_SUBK: '/app03/hireemployee/get-supervisor-name/',
  GET_DEPT_DETAILS: '/app02/hiringrequest/get-dept-details/',
  GET_JRSS: '/app02/hiringrequest/get-jrss/',
  GET_DEPT_DETAILS_SUBK: '/app03/hireemployee/get-dept-details/',
  POSTSERVICEURL: "/app02/hiringrequest/submit-hiring-request",
  APPROVAL_CENTER_GRB_TOLLS_MOREINFO_API: "/app02/hireRequestTolls/moreInformation/",
  APPROVAL_CENTER_GRB_TOLLS_APPROVE_API: "/app02/hireRequestTolls/approve/",

  APPROVAL_CENTER_GRB_IOT_ALL_SUBMIT_API: "/app02/approvalcenter/approvedIot",
  APPROVAL_CENTER_GRB_BOARD_ALL_SUBMIT_API: "/app02/approvalcenter/approvedboard",
  //  APPROVAL_CENTER_GRB_BIZOPS_ALL_SUBMIT_API: "/app02/approvalcenter/approvedbizops", 
  APPROVAL_CENTER_UPLOAD_DATA_API: "/app02/approvalcenter/upload",

  // APPROVAL_CENTER_GRB_BIZOPS_ALL_SUBMIT_API: "/app02/modifyGrbTemplateForBizops/",
  APPROVAL_CENTER_GRB_BIZOPS_ALL_SUBMIT_API: "/app02/modifyGrbTemplateForBizops/",
  APPROVAL_CENTER_AOD_SUBMIT_FETCH_API:"/app04/aod/modifyGrbTemplateForBizops",

  APPROVAL_CENTER_SWAP_GRB_TEMPLATE_ALL_SUBMIT_API: "/app03/grbswap/swapGrbTemplateForBizops/",

  // APPROVAL_CENTER_GRB_BIZOPS_ALL_SUBMIT_API: "/app02/approvalcenter/approvedbizops",

  MODIFY_GRB: "/app02/modifyGrbTemplateForHiring",
  CANCEL_GRB: "/app02/hiringrequest/cancel-metro/",

  MY_REQUEST_HIRE_REQUEST_API: "/app02/myrequest/myrequestStatus",
  MY_REQUEST_SWAP_API: "/app02/myrequest/swapStatus",
  MY_REQUEST_BAND_CHANGE_API: "/app02/myrequest/bandchangeStatus",
  MY_REQUEST_GRB_REVISE_API: "/app02/myrequest/reviseStatus",
  MY_REQUEST_COSTCASE_API: "/app02/myrequest/costcaseStatus",
  MY_REQUEST_CI_API: "/app04/cireleasedashboard",
  ORP_BACKFILL_DETAILS: "/app02/orpAssessedDetails/backfill/",
  ORP_NEWGROWTH_DETAILS: "/app02/orpAssessedDetails/newgrowth/",
  CREATE_REQUEST_GRB: "/app03/grbswap/getcommonlistformodifygrb",
  GRB_REVISE_INTERNAL_DETAILS: "/app03/grbrevise/getempdetailsbyidforgrbrevise/",
  // APPROVAL_CENTER_SWAP_AUDIT_DETAILS:"/app03/swap/auditDetails/",
  BAND_CHANGE_AUDIT_DETAILS: "/app03/swap/bandchangeauditdetails/",
  GRB_REVISE_AUDIT_DETAILS: "/app03/swap/grbreviseauditdetails/",
  APPROVAL_CENTER_SWAP_DETAILS_API: '/app03/grbswap/swapdetailsapproval',
  APPROVAL_CENTER_SWAP_GET_EMPLOYEE_DETAILS_API: '/app03/grbswap/backfillemployee/',
  APPROVAL_CENTER_SWAP_GET_AUDIT_DETAILS_API: '/app03/swap/auditDetails/',
  SUBMIT_GRB_REVISE_REQUEST: "/app03/grbrevise/submitgrbreviserequest",
  APPROVAL_CENTER_GRB_LIST: "/app03/grbswap/getcommonlistformodifygrbapprovalbybizops",
  GRB_REVISE_APPROVAL_EMPLOYEE_DETAILS: "/app03/grbrevise/getempdetailsforbizops/",
  APPROVAL_CENTER_GRB_REVISE_AUDIT: "/app03/swap/grbreviseauditdetails/",
  APPROVAL_CENTER_GRB_REVISE_AUDIT_DOWNLOAD: "/app03/grb-grbrevise-audit-report/",
  APPROVE_REJECT_GRB_REVISE: "/app03/grbrevise/approveorrejectgrbrevisebybizops",
  UPLOAD_HC_ACTUAL: "/app05/upload-headcount-actual-file",
  UPLOAD_HC_ACTUAL_UPDATE: "/app05/upload-headcount-actual-update-file",
  UPLOAD_HC_HISTORY: "/app05/upload-headcount-history-file",
  UPLOAD_COSTCASE: "/app05/upload-costcase-file",
  APPROVAL_CENTER_SWAP_GRB_SUBMIT_API: "/app03/grbswap/submit-hiring-request/",
  APPROVAL_CENTER_SWAP_AUDIT_DOWNLOAD: "/app03/swap/swapauditreport/",
  APPROVAL_CENTER_AOD_FETCH_API:"/app04/aod/aodlist",
  AOD_BACKFILL_EMP_API:"/app04/aod/backfillemployee/",

  CREATE_REQUEST_SWAP_AUDIT: '/app03/swap/auditDetails/',
  CREATE_REQUEST_GRB_REVISE: '/app03/swap/grbreviseauditdetails/',
  CREATE_REQUEST_BAND_CHANGE: '/app03/swap/bandchangeauditdetails/',



  CREATE_REQUEST_GRB_SWAP_GET_EMPLOYEE_API: "/app03/grbswap/autofillempswap/",
  APPROVAL_CENTER_BAND_CHANGE_AUDIT: "/app03/swap/bandchangeauditdetails/",
  APPROVAL_CENTER_SWAP_AUDIT: "/app03/swap/auditDetails/",

  CREATE_REQUEST_GRB_SWAP_CREATE_REQUEST_API: "/app03/grbswap/createswaprequest",
  APPROVAL_CENTER_BAND_CHANGE_AUDIT_DOWNLOAD: "/app03/grb-bandchange-audit-report/",

  BAND_CHANGE_SUBMIT: "/app03/getbandchangerequestfile",
  BAND_CHANGE_SUBMIT_DOWNGRADE: "/app03/getbandchangerequestdowngrade",
  APPROVAL_CENTER_BAND_CHANGE: "/app03/bandChange/bandChangedetails",
  GRB_TEMPLATE_FILE_UPLOAD_API: "/app02/upload-approval-file/",
  GRB_TEMPLATE_FILE_UPLOAD_API_SUBK: "/app03/upload-approval-file/",
  GREATER_BAND_LIST_API: "/app03/grbrevise/greaterbands/",

  REPORTS_RECRUITMENT: '/app05/grb-status-report/',
  REPORTS_BR_OPEN_POSITIONS: '/app05/bropenpostionexceldownload',
  REPORTS_BR_BACKFILL_REPORT: '/app05/backfillreportexceldownload',
  REPORTS_BR_BACKFILL_DETAILS: '/app05/backfilDetailseExceldownload',
  REPORTS_PENDING_HIRING_REQUESTS: '/app05/pendingHiringRequest',
  REPORTS_BR_CCN_PCR: '/app05/ccnpcr-report/',
  REPORTS_HEADCOUNT: "/app05/headcount-report/",
  REPORTS_GRB_DUMP: '/app05/grb-dump-report/',
  REPORTS_TRAM_EXPORT:'/app04/tram-export/',
  REPORTS_CI_EXPORT:'/app04/ciRelease-report-excel/',
  REPORTS_SUNDRY_EXPORT_PENDING:'/app05/sundry-pending-report/',
  REPORTS_SUNDRY_EXPORT_APPROVED:'/app05/sundry-approved-report/',
  REPORTS_SUNDRY_EXPORT_ALL:'/app05/sundry-allapproved-report/',  
  SUBKEMPLOYEES_LIST: '/app03/hireemployee/getSubKEmployees',
  GET_ACTUAL_COSTCASE: '/app04/cost-case/getActualCostCase/',
  SUBMIT_COSTCASE_REQUEST: '/app04/cost-case/submitCostCaseRequest',
  GET_COSTCASE_DATA: '/app04/cost-case/getAllCostCaseRequests',
  APPROVE_COST_CASE: '/app04/cost-case/approveCostCaseRequest',
  REJECT_COST_CASE: '/app04/cost-case/rejectCostCaseRequest',

  CI_RELEASE_EMP_DETAILS:'/app04/ci-release/getEmployee/',
  CI_RELEASE_CCN_PCR_MONTHS:'/app04/ci-release/getCcnpcrMonths/',
  CI_RELEASE_CCN_PCR_DETAILS:'/app04/ci-release/getCcnpcrDetails/',
  CI_RELEASE_VALID_CCN_PCR:'/app04/ci-release/getValidCcnpcrs',
  CI_RELEASE_SUBMIT:'/app04/ci-release/submit-ci-request',
  CI_RELEASE_GET_ALL_PENDING:'/app04/ci-release/getPendingRequests',
  CI_RELEASE_UPDATE:'/app04/ci-release/update-ci-request',
  GRB_TEMP_UTE_STICKYINFO: '/app04/stickyinfo/get-ute-details/',
  CI_RELEASE_DEPT_DEAILS:'/app04/ci-release/getAllDeptDetails',

  AUDIT_DETAILS: "/app02/grbauditcontroller/get-metro-audit/",


  CI_AUDIT_DETAILS: "/app04/cirelease-audit/",
  CI_DASHBOARD_API: '/app04/cireleasedashboard',
  REPORTS_BR_HIRINGSTATUS: '/app05/brreportexceldownload/',
  REPORTS_EXPORT_GRB: '/app05/grb-report/',

  CONVERSION_EMPLOYESS: '/app03/conversion/getConversionEmployees',
  CONVERSION_EXTENSION_EMPLOYEES: '/app03/conversion/getConversionExtensionEmployees',


  SUBMIT_CONVERSION_REQUEST: '/app03/conversion/submit-hiring-request',
  GRB_ARCHIVE_FETCH_API:'/app04/grbarchive/search-by-key/',
  GRB_ARCHIVE_AUDIT_API:'/app04/get-grbarchive-audit/',
  GRB_ARCHIVE_DELETE_API:'/app04/grbarchive/completeDelete',


  CC_REPORT_YEARS_LIST:'/app04/cost-case/costcase-list-of-year',
  CC_REPORT:'/app04/cost-case/costcase-report-excel/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
