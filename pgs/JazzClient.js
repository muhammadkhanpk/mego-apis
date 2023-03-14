const shConvertor = require("js-sha256");

const pmtObj = {
  pp_Version: "1.1",
  pp_TxnType: "MWALLET",
  pp_Language: "EN",
  pp_MerchantID: "MC53815",
  pp_SubMerchantID: "",
  pp_Password: "raomkhanpk1",
  pp_BankID: "",
  pp_ProductID: "",
  pp_TxnRefNo: "T" + Date.now(),
  pp_Amount: "100",
  pp_TxnCurrency: "PKR",
  pp_TxnDateTime: Date.now().toString(),
  pp_BillReference: "billref",
  pp_Description: "Description of transaction",
  pp_TxnExpiryDateTime: Date.now().toString(),
  pp_ReturnURL:
    "https://sandbox.jazzcash.com.pk/MerchantSimulator/HttpRequestDemoServer/Index",
  pp_SecureHash:
    "5C3ECCC251DD55A73164D6452C43F4FAEDEB1C520F14D1607E4349F7092FB8F1",
  ppmpf_1: "",
  ppmpf_2: "",
  ppmpf_3: "",
  ppmpf_4: "",
  ppmpf_5: "",
};
const convertHmac256 = () => {
  let pmtObj = {
    pp_MerchantID: "MC53815",
    pp_OrderInfo: "A48cvE28",
    pp_Amount: 100,
  };
  let modifiedPmtAsc = Object.keys(pmtObj)
    .sort()
    .reduce((obj, key) => {
      obj[key] = pmtObj[key];
      return obj;
    }, {});
  let pmtValues = Object.values(modifiedPmtAsc);
  pmtValues.unshift("0F5DD14AE2");
};
module.exports = { pmtObj };
