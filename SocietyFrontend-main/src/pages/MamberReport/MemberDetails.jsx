// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Box,
//     Typography,
//     Grid,
//     Card,
//     CardContent,
//     Button,
//     CircularProgress,
//     Alert,
//     Chip,
//     Tabs,
//     Tab,
//     IconButton,
//     FormControl,
//     Snackbar,
//     InputLabel,
//     Select,
//     MenuItem
// } from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import EditIcon from "@mui/icons-material/Edit";
// import ImageIcon from "@mui/icons-material/Image";
// import { fetchMemberById, clearSelectedMember, updateMember } from "../../features/member/memberSlice";

// // Import from the new PDF generator
// import {
//     FIELD_MAP,
//     getValueByPath,
//     isMissing,
//     generateMemberFieldsPDF,
//     getOccupationType,
// } from "./MemberCategoryPdf";

// // Import components
// import ImageDisplay from "./ImageDisplay";
// import EditFieldDialog from "./MemberEdit";

// // Image field names array
// const imageFields = [
//     first{values.proofDocument
//               ? `Uploaded: ${values.proofDocument.name}`
//               : "Upload Address Proof Document"}
//             <input
//               type="file"
//               hidden
//               accept="image/*,application/pdf"
//               onChange={(e) => handleFileUpload(addressType, e.target.files[0])}
//             /> 
//             for address ('addressDetails.permanentAddress',
//     'addressDetails.currentResidental',),
    
//     "documents.passportSize",
//     'document.signedPhoto',
//     'document.aadhaarFrontPhoto',
//     'documents.aadhaarBackPhoto',
//     'documents.panCardPhoto',
//     'documents.voterFrontPhoto',
//     'documents.voterBackPhoto',
//     'documents.passportPhoto',
//     'documents.drivingFrontPhoto',
//     'documents.drivingBackPhoto',
//     'documents.rationFrontPhoto',
//     'documents.rationBackPhoto',
    
//     OccupationType:(
//         if (inCaseOfServiceGovt) {
//             {professionalDetails.serviceDetails?.bankStatement
//                       ? `Bank Statement Uploaded`
//                       : "Attach Bank Statement of 6 months"}
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*,application/pdf"
//                       onChange={(e) =>
//                         handleProfessionalFieldChange("serviceDetails", {
//                           ...professionalDetails.serviceDetails,
//                           bankStatement: e.target.files[0],
//                         })
//                       }

//             {professionalDetails.serviceDetails?.monthlySlip
//                       ? `Monthly Slip Uploaded`
//                       : "Attach Monthly slip of last 6 months"}
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*,application/pdf"
//                       onChange={(e) =>
//                         handleProfessionalFieldChange("serviceDetails", {
//                           ...professionalDetails.serviceDetails,
//                           monthlySlip: e.target.files[0],
//                         })
//                       }

//                       {professionalDetails.serviceDetails?.idCard
//                       ? `Office ID Uploaded`
//                       : "Attach Office ID"}
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*,application/pdf"
//                       onChange={(e) =>
//                         handleProfessionalFieldChange("serviceDetails", {
//                           ...professionalDetails.serviceDetails,
//                           idCard: e.target.files[0],
//                         })
//                       }
//                     }

//         if(inCaseOfPrivate) {
//             {professionalDetails.serviceDetails?.idCard
//                       ? `ID Card Uploaded`
//                       : "Attach ID Card"}
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*,application/pdf"
//                       onChange={(e) =>
//                         handleProfessionalFieldChange("serviceDetails", {
//                           ...professionalDetails.serviceDetails,
//                           idCard: e.target.files[0],
//                         })
//                       }
//         }
        
//         if(inCaseOfBusiness){
//             {professionalDetails.businessDetails?.gstCertificate
//                       ? `GST Certificate Uploaded`
//                       : "Upload GST Certificate"}
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*,application/pdf"
//                       onChange={(e) =>
//                         handleProfessionalFieldChange("businessDetails", {
//                           ...professionalDetails.businessDetails,
//                           gstCertificate: e.target.files[0],
//                         })
//                       }
//         }
//     )
// ];

// export const FIELD_MAP = {
//     // Personal
//     "personalDetails.title": "Title",
//     "personalDetails.nameOfMember": "Member Name",
//     "personalDetails.membershipNumber": "Membership No",
//     "personalDetails.membershipDate": "Membership Date",
//     "personalDetails.fatherTitle": "Father's Title",
//     "personalDetails.nameOfFather": "Father's Name",
//     "personalDetails.motherTitle" : "Mother's Title",
//     "personalDetails.nameOfMother": "Mother's Name",
//     "personalDetails.dateOfBirth": "Date of Birth",
//     "personalDetails.ageInYears": "Age (Years)",
//     "personalDetails.minor": "Is Minor",
//     "personalDetails.gender": "Gender",
//     "personalDetails.religion": "Religion",
//     "personalDetails.maritalStatus": "Marital Status", if(married) {spouseTitle, nameOfSpouse,},
//     "personalDetails.caste": "Caste",
//     "personalDetails.phoneNo": "Phone No",
//     "personalDetails.alternatePhoneNo": "Alternate Phone",
//     "personalDetails.emailId": "Email",
//     "personalDetails.nameOfSpouse": "Spouse's Name",
//     "personalDetails.amountInCredit": "Amount In Credit",
  

//     // Address
//     "addressDetails.permanentAddress": "Permanent Address",
//     "addressDetails.currentResidentalAddress": "Current Address",
//     "addressDetails.previousCurrentAddress": "Previous Addresses",


//     // Documents - Text Fields
//     "documents.panNo": "PAN No",
//     "documents.rationCard": "Ration Card",
//     "documents.drivingLicense": "Driving License",
//     "documents.aadhaarNo": "Aadhaar No",
//     "documents.voterId": "Voter ID",
//     "documents.passportNo": "Passport No",

//     // Professional - Basic
//     "professionalDetails.qualification": "Qualification",
//     "professionalDetails.occupation": "Occupation",
//     "professionalDetails.degreeNumber": "Degree Number",

//     // Professional - Employment Type
//     "professionalDetails.inCaseOfServiceGovt": "Government Service",
//     "professionalDetails.inCaseOfPrivate": "Private Service",
//     "professionalDetails.inCaseOfService": "Service",
//     "professionalDetails.serviceType": "Service Type",

//     // Professional - Service Details
//     "professionalDetails.serviceDetails.fullNameOfCompany": "Company Name",
//     "professionalDetails.serviceDetails.addressOfCompany": "Company Address",
//     "professionalDetails.serviceDetails.monthlyIncome": "Monthly Income",
//     "professionalDetails.serviceDetails.designation": "Designation",
//     "professionalDetails.serviceDetails.dateOfJoining": "Date of Joining",
//     "professionalDetails.serviceDetails.employeeCode": "Employee Code",
//     "professionalDetails.serviceDetails.dateOfRetirement": "Date of Retirement",
//     "professionalDetails.serviceDetails.officeNo": "Office Phone",

//     // Professional - Business
//     "professionalDetails.inCaseOfBusiness": "Business",
//     "professionalDetails.businessDetails.fullNameOfCompany": "Business Name",
//     "professionalDetails.businessDetails.addressOfCompany": "Business Address",
//     "professionalDetails.businessDetails.businessStructure": "Business Structure",
//     "professionalDetails.businessDetails.gstCertificate": "GST Certificate",

//     // Family
//     "familyDetails.familyMembersMemberOfSociety": "Family Members in Society",
//     "familyDetails.familyMember": "Family Member Names",
//     "familyDetails.familyMemberNo": "Family Member Phones",

//     // Nominee
//     "nomineeDetails.nomineeName": "Nominee Name",
//     "nomineeDetails.relationWithApplicant": "Relation with Applicant",
//     "nomineeDetails.introduceBy": "Introduced By",
//     "nomineeDetails.memberShipNo": "Membership No",
// };

// // Category mapping
// export const CATEGORY_MAP = {
//     personalDetails: "Personal Details",
//     addressDetails: "Address Details", 
//     documents: "Documents",
//     professionalDetails: "Professional Details",
//     familyDetails: "Family Details",
//     nomineeDetails: "Nominee Details",
// };

// const MemberDetails = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { selectedMember, loading, error, operationLoading } = useSelector((state) => state.members);

//     const [viewType, setViewType] = useState('all');
//     const [category, setCategory] = useState('all');
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [selectedField, setSelectedField] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//     useEffect(() => {
//         if (id) {
//             dispatch(fetchMemberById(id));
//         }
//     }, [id, dispatch]);

//     useEffect(() => {
//         return () => {
//             dispatch(clearSelectedMember());
//         };
//     }, [dispatch]);

//     const handleEditField = (fieldKey, fieldName, currentValue) => {
//         setSelectedField({
//             key: fieldKey,
//             name: fieldName,
//             value: currentValue,
//             isImage: imageFields.includes(fieldKey)
//         });
//         setEditDialogOpen(true);
//     };

//     const handleSaveField = async (fieldKey, newValue) => {
//         try {
//             const isImageField = imageFields.includes(fieldKey);
//             const formData = new FormData();

//             if (isImageField && newValue instanceof File) {
//                 formData.append(fieldKey, newValue);
//                 formData.append('fieldPath', fieldKey);
//             } else {
//                 const updateData = {};
//                 const parts = fieldKey.split('.');
//                 let current = updateData;

//                 for (let i = 0; i < parts.length - 1; i++) {
//                     current[parts[i]] = {};
//                     current = current[parts[i]];
//                 }
//                 current[parts[parts.length - 1]] = newValue;

//                 Object.keys(updateData).forEach(section => {
//                     if (typeof updateData[section] === 'object') {
//                         Object.keys(updateData[section]).forEach(subSection => {
//                             if (typeof updateData[section][subSection] === 'object') {
//                                 Object.keys(updateData[section][subSection]).forEach(field => {
//                                     const formKey = `${section}[${subSection}][${field}]`;
//                                     formData.append(formKey, updateData[section][subSection][field] || '');
//                                 });
//                             } else {
//                                 const formKey = `${section}[${subSection}]`;
//                                 formData.append(formKey, updateData[section][subSection] || '');
//                             }
//                         });
//                     } else {
//                         formData.append(section, updateData[section] || '');
//                     }
//                 });
//             }

//             const result = await dispatch(updateMember({
//                 id: selectedMember._id,
//                 formData: formData
//             })).unwrap();

//             setSnackbarMessage(`"${FIELD_MAP[fieldKey]}" updated successfully!`);
//             setSnackbarSeverity('success');
//             setSnackbarOpen(true);
//             setEditDialogOpen(false);

//             setTimeout(() => {
//                 dispatch(fetchMemberById(id));
//             }, 1500);

//         } catch (error) {
//             console.error('Error updating field:', error);
//             setSnackbarMessage(`Error updating field: ${error.message || 'Something went wrong'}`);
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     const handleCloseEditDialog = () => {
//         setEditDialogOpen(false);
//         setSelectedField(null);
//     };

//     const handleDownload = () => {
//         if (!selectedMember) return;

//         try {
//             generateMemberFieldsPDF(selectedMember, category, viewType);
//         } catch (e) {
//             console.error("PDF generation failed:", e);
//             setSnackbarMessage("Error generating PDF");
//             setSnackbarSeverity("error");
//             setSnackbarOpen(true);
//         }
//     };

//     const handleExcelDownload = () => {
//         if (!selectedMember) return;

//         try {
//             // exportMemberToExcel(selectedMember, category, viewType);
//             console.log("Excel download functionality not implemented yet");
//             setSnackbarMessage("Excel download not available yet");
//             setSnackbarSeverity("info");
//             setSnackbarOpen(true);
//         } catch (e) {
//             console.error("Excel export failed:", e);
//             setSnackbarMessage("Error generating Excel");
//             setSnackbarSeverity("error");
//             setSnackbarOpen(true);
//         }
//     };

//     // Enhanced formatValue function
//     const formatValue = (value, fieldKey) => {
//         if (isMissing(value)) return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;

//         // Handle image fields
//         if (imageFields.includes(fieldKey)) {
//             const hasImage = value && (value.includes('cloudinary') || value.includes('http'));
//             if (hasImage) {
//                 return (
//                     <Box sx={{ mt: 1 }}>
//                         <ImageDisplay
//                             imageUrl={value}
//                             alt={FIELD_MAP[fieldKey]}
//                             height={120}
//                         />
//                     </Box>
//                 );
//             }
//             return (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
//                     <ImageIcon color="disabled" fontSize="small" />
//                     <Typography variant="body2" color="text.secondary" fontStyle="italic">
//                         No Image
//                     </Typography>
//                 </Box>
//             );
//         }

//         // Handle Our Society Guarantees
//         if (fieldKey === 'guaranteeDetails.ourSociety' || fieldKey === 'guaranteeDetails.otherSociety') {
//             if (!value || value.length === 0) return "No guarantees";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     {value.map((guarantee, index) => (
//                         <Card key={index} variant="outlined" sx={{ mb: 1, p: 1.5, backgroundColor: '#f8f9fa' }}>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Member:</strong> {guarantee.nameOfMember || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Membership No:</strong> {guarantee.membershipNo || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Loan Amount:</strong> ₹{guarantee.amountOfLoan || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Loan Type:</strong> {guarantee.typeOfLoan || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2">
//                                 <strong>Irregular:</strong> {guarantee.ifIrregular === 'Yes' ? 'Yes ⚠️' : 'No ✅'}
//                             </Typography>
//                         </Card>
//                     ))}
//                 </Box>
//             );
//         }

//         // Handle Loan Details
//         if (fieldKey === 'loanDetails') {
//             if (!value || value.length === 0) return "No loans";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     {value.map((loan, index) => (
//                         <Card key={index} variant="outlined" sx={{ mb: 1, p: 1.5, backgroundColor: '#f0f8ff' }}>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Loan Type:</strong> {loan.loanType || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Amount:</strong> ₹{loan.amount || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Purpose:</strong> {loan.purpose || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2">
//                                 <strong>Date:</strong> {loan.dateOfLoan ? new Date(loan.dateOfLoan).toLocaleDateString() : 'N/A'}
//                             </Typography>
//                         </Card>
//                     ))}
//                 </Box>
//             );
//         }

//         // Handle Reference Details
//         if (fieldKey === 'referenceDetails') {
//             if (!value || value.length === 0) return "No references";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     {value.map((reference, index) => (
//                         <Card key={index} variant="outlined" sx={{ mb: 1, p: 1.5, backgroundColor: '#f0f8ff' }}>
//                             <Typography variant="body2" gutterBottom>
//                                 <strong>Name:</strong> {reference.referenceName || 'N/A'}
//                             </Typography>
//                             <Typography variant="body2">
//                                 <strong>Mobile:</strong> {reference.referenceMno || 'N/A'}
//                             </Typography>
//                         </Card>
//                     ))}
//                 </Box>
//             );
//         }

//         // Handle Service Details
//         if (fieldKey.startsWith('professionalDetails.serviceDetails.')) {
//             if (!value || typeof value !== 'object') return "No service details";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     <Typography variant="body2"><strong>Company:</strong> {value.fullNameOfCompany || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Address:</strong> {value.addressOfCompany || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Income:</strong> {value.monthlyIncome || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {value.designation || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Joining Date:</strong> {value.dateOfJoining || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Employee Code:</strong> {value.employeeCode || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Retirement Date:</strong> {value.dateOfRetirement || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Office Phone:</strong> {value.officeNo || 'N/A'}</Typography>
//                 </Box>
//             );
//         }

//         // Handle Business Details
//         if (fieldKey.startsWith('professionalDetails.businessDetails.')) {
//             if (!value || typeof value !== 'object') return "No business details";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     <Typography variant="body2"><strong>Company:</strong> {value.fullNameOfCompany || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Address:</strong> {value.addressOfCompany || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Structure:</strong> {value.businessStructure || 'N/A'}</Typography>
//                     {value.gstCertificate && (
//                         <Box sx={{ mt: 1 }}>
//                             <Typography variant="body2" gutterBottom><strong>GST Certificate:</strong></Typography>
//                             <ImageDisplay
//                                 imageUrl={value.gstCertificate}
//                                 alt="GST Certificate"
//                                 height={120}
//                             />
//                         </Box>
//                     )}
//                 </Box>
//             );
//         }

//         // Handle Nominee Details
//         if (fieldKey.startsWith('nomineeDetails.')) {
//             if (!value || typeof value !== 'object') return "No nominee details";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     <Typography variant="body2"><strong>Name:</strong> {value.nomineeName || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Relation:</strong> {value.relationWithApplicant || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Introduced By:</strong> {value.introduceBy || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Membership No:</strong> {value.memberShipNo || 'N/A'}</Typography>
//                 </Box>
//             );
//         }

//         // Handle Previous Addresses
//         if (fieldKey === 'addressDetails.previousCurrentAddress') {
//             if (!value || value.length === 0) return "No previous addresses";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     {value.map((address, index) => (
//                         <Card key={index} variant="outlined" sx={{ mb: 1, p: 1.5, backgroundColor: '#fff8e1' }}>
//                             <Typography variant="body2" gutterBottom><strong>Address {index + 1}:</strong></Typography>
//                             <Typography variant="body2"><strong>House No:</strong> {address.flatHouseNo || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>Area:</strong> {address.areaStreetSector || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>Locality:</strong> {address.locality || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>Landmark:</strong> {address.landmark || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>City:</strong> {address.city || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>State:</strong> {address.state || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>Pincode:</strong> {address.pincode || 'N/A'}</Typography>
//                             <Typography variant="body2"><strong>Country:</strong> {address.country || 'N/A'}</Typography>
//                         </Card>
//                     ))}
//                 </Box>
//             );
//         }

//         // Handle address objects
//         if (fieldKey === 'addressDetails.permanentAddress' || fieldKey === 'addressDetails.currentResidentalAddress') {
//             if (!value || typeof value !== 'object') return "No address data";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     <Typography variant="body2"><strong>House No:</strong> {value.flatHouseNo || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Area:</strong> {value.areaStreetSector || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Locality:</strong> {value.locality || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Landmark:</strong> {value.landmark || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>City:</strong> {value.city || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>State:</strong> {value.state || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Pincode:</strong> {value.pincode || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Country:</strong> {value.country || 'N/A'}</Typography>
//                 </Box>
//             );
//         }

//         // Handle arrays
//         if (Array.isArray(value)) {
//             return value.length > 0 ? value.join(", ") : "No data";
//         }

//         // Handle objects
//         if (typeof value === "object" && value !== null) {
//             const entries = Object.entries(value);
//             if (entries.length === 0) return "No data";
//             return (
//                 <Box sx={{ mt: 1 }}>
//                     {entries.map(([k, v]) => (
//                         <Typography key={k} variant="body2">
//                             <strong>{k}:</strong> {v || "N/A"}
//                         </Typography>
//                     ))}
//                 </Box>
//             );
//         }

//         if (typeof value === "boolean") return value ? "Yes" : "No";
//         return value || "No data";
//     };

//     // Get filtered fields based on category and view type WITH PROFESSIONAL FIELDS EXCLUDED FROM "ALL" CATEGORY
//     const getFilteredFields = () => {
//         const allKeys = Object.keys(FIELD_MAP);

//         if (category === "all") {
//             const filtered = allKeys.filter(key => {
//                 const value = getValueByPath(selectedMember, key);
//                 const missing = isMissing(value);

//                 // For "all" category, EXCLUDE professional details fields
//                 if (key.startsWith("professionalDetails.")) {
//                     return false;
//                 }

//                 if (viewType === "all") return true;
//                 if (viewType === "filled") return !missing;
//                 if (viewType === "missing") return missing;
//                 return true;
//             });
            
//             return filtered;
//         }

//         if (category === "filled") {
//             return allKeys.filter(key => {
//                 const value = getValueByPath(selectedMember, key);
//                 return !isMissing(value);
//             });
//         }

//         if (category === "missing") {
//             return allKeys.filter(key => {
//                 const value = getValueByPath(selectedMember, key);
//                 return isMissing(value);
//             });
//         }

//         // Specific category
//         return allKeys.filter(key => {
//             const value = getValueByPath(selectedMember, key);
//             const missing = isMissing(value);
//             const matchesCategory = key.startsWith(category);

//             if (viewType === "all") return matchesCategory;
//             if (viewType === "filled") return matchesCategory && !missing;
//             if (viewType === "missing") return matchesCategory && missing;
//             return matchesCategory;
//         });
//     };

//     if (loading) {
//         return (
//             <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
//                 <CircularProgress />
//                 <Typography sx={{ ml: 2 }}>Loading member details...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                     Error loading member: {error.message || error.toString()}
//                 </Alert>
//                 <Button variant="contained" onClick={() => navigate(-1)}>
//                     Go Back
//                 </Button>
//             </Box>
//         );
//     }

//     if (!selectedMember) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="info">
//                     Member not found.
//                 </Alert>
//                 <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
//                     Go Back
//                 </Button>
//             </Box>
//         );
//     }

//     const filteredFields = getFilteredFields();
//     const missingCount = Object.keys(FIELD_MAP).filter(f => isMissing(getValueByPath(selectedMember, f))).length;
//     const filledCount = Object.keys(FIELD_MAP).length - missingCount;
    
//     // Calculate allCount - total fields excluding professional fields
//     const allCount = Object.keys(FIELD_MAP).filter(key => !key.startsWith("professionalDetails.")).length;

//     return (
//         <Box sx={{ p: 3 }}>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <IconButton onClick={() => navigate(-1)}>
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
//                         Member Details
//                     </Typography>
//                 </Box>
//             </Box>

//             {/* Member Info Summary */}
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Member Name: {getValueByPath(selectedMember, "personalDetails.nameOfMember") || "Unknown Member"}
//                     </Typography>
//                     <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                         <Chip
//                             label={`Membership: ${getValueByPath(selectedMember, "personalDetails.membershipNumber") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Phone: ${getValueByPath(selectedMember, "personalDetails.phoneNo") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Email: ${getValueByPath(selectedMember, "personalDetails.emailId") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Filled: ${filledCount}/${Object.keys(FIELD_MAP).length}`}
//                             color="success"
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Missing: ${missingCount}`}
//                             color="error"
//                             variant="outlined"
//                         />
//                     </Box>
//                 </CardContent>
//             </Card>

//             {/* Download Section */}
//             <Card sx={{ mb: 3, p: 2 }}>
//                 <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
//                     <FormControl size="small" sx={{ minWidth: 180 }}>
//                         <InputLabel>Category Details</InputLabel>
//                         <Select
//                             value={category}
//                             label="Category Details"
//                             onChange={(e) => setCategory(e.target.value)}
//                             fullWidth
//                             size="small"
//                         >
//                             <MenuItem value="all">All</MenuItem>
//                             <MenuItem value="filled">Filled</MenuItem>
//                             <MenuItem value="missing">Missing</MenuItem>
//                             <MenuItem value="personalDetails">Personal</MenuItem>
//                             <MenuItem value="addressDetails">Address</MenuItem>
//                             <MenuItem value="documents">Document</MenuItem>
//                             <MenuItem value="professionalDetails">Professional</MenuItem>
//                             <MenuItem value="familyDetails">Family</MenuItem>
//                             <MenuItem value="bankDetails">Bank</MenuItem>
//                             <MenuItem value="referenceDetails">Reference</MenuItem>
//                             <MenuItem value="guaranteeDetails">Guarantee</MenuItem>
//                             <MenuItem value="loanDetails">Loan</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         startIcon={<PictureAsPdfIcon />}
//                         onClick={handleDownload}
//                         color="primary"
//                     >
//                         Download PDF
//                     </Button>
//                 </Box>
//             </Card>

//             {/* Tabs */}
//             <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//                 <Tabs value={viewType} onChange={(e, newValue) => setViewType(newValue)}>
//                     <Tab value="all" label={
//                         <Box display="flex" alignItems="center" gap={1}>
//                             <Typography>All Fields</Typography>
//                             <Chip label={allCount} size="small" variant="outlined" />
//                         </Box>
//                     } />
//                     <Tab value="missing" label={
//                         <Box display="flex" alignItems="center" gap={1}>
//                             <ErrorOutlineIcon color="error" fontSize="small" />
//                             <Typography>Missing Fields</Typography>
//                             <Chip label={missingCount} size="small" color="error" variant="outlined" />
//                         </Box>
//                     } />
//                     <Tab value="filled" label={
//                         <Box display="flex" alignItems="center" gap={1}>
//                             <CheckCircleOutlineIcon color="success" fontSize="small" />
//                             <Typography>Filled Fields</Typography>
//                             <Chip label={filledCount} size="small" color="success" variant="outlined" />
//                         </Box>
//                     } />
//                 </Tabs>
//             </Box>

//             {/* Fields Grid */}
//             <Grid container spacing={2}>
//                 {filteredFields.map((fieldKey) => {
//                     const fieldName = FIELD_MAP[fieldKey];
//                     const value = getValueByPath(selectedMember, fieldKey);
//                     const missing = isMissing(value);
//                     const isImageField = imageFields.includes(fieldKey);
//                     const hasImage = isImageField && value && (value.includes('cloudinary') || value.includes('http'));

//                     const isSpecialField = fieldKey === 'guaranteeDetails.ourSociety' ||
//                         fieldKey === 'guaranteeDetails.otherSociety' ||
//                         fieldKey === 'loanDetails' ||
//                         fieldKey === 'addressDetails.permanentAddress' ||
//                         fieldKey === 'addressDetails.currentResidentalAddress' ||
//                         fieldKey === 'referenceDetails' ||
//                         fieldKey === 'addressDetails.previousCurrentAddress' ||
//                         fieldKey.startsWith('professionalDetails.serviceDetails.') ||
//                         fieldKey.startsWith('professionalDetails.businessDetails.') ||
//                         fieldKey.startsWith('nomineeDetails.');

//                     const displayValue = formatValue(value, fieldKey);

//                     return (
//                         <Grid
//                             item
//                             xs={12}
//                             md={isSpecialField ? 12 : 6}
//                             lg={isSpecialField ? 12 : 4}
//                             key={fieldKey}
//                         >
//                             <Card
//                                 variant="outlined"
//                                 sx={{
//                                     borderColor: missing ? 'error.main' : hasImage ? 'success.main' : 'primary.main',
//                                     backgroundColor: missing ? '#fff5f5' : hasImage ? '#f0fff0' : isSpecialField ? '#f8f9fa' : '#f5fff5',
//                                     height: isSpecialField ? 'auto' : '100%',
//                                     '&:hover': {
//                                         boxShadow: 3,
//                                         transform: 'translateY(-2px)',
//                                         transition: 'all 0.2s ease-in-out'
//                                     }
//                                 }}
//                             >
//                                 <CardContent sx={{ p: 2 }}>
//                                     <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
//                                         <Box display="flex" alignItems="center" gap={1}>
//                                             {missing ? (
//                                                 <ErrorOutlineIcon color="error" fontSize="small" />
//                                             ) : hasImage ? (
//                                                 <CheckCircleOutlineIcon color="success" fontSize="small" />
//                                             ) : (
//                                                 <CheckCircleOutlineIcon color="primary" fontSize="small" />
//                                             )}
//                                             <Typography variant="subtitle2" color={missing ? "error" : hasImage ? "success" : "primary"}>
//                                                 {fieldName}
//                                             </Typography>
//                                         </Box>
//                                         <IconButton
//                                             size="small"
//                                             onClick={() => handleEditField(fieldKey, fieldName, value)}
//                                             title="Edit this field"
//                                         >
//                                             <EditIcon fontSize="small" />
//                                         </IconButton>
//                                     </Box>
//                                     <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
//                                         {displayValue}
//                                     </Typography>
//                                     {isImageField && hasImage && (
//                                         <Typography variant="caption" color="success.main" display="block" sx={{ mt: 1 }}>
//                                             ✅ Image Uploaded (Click to view full size)
//                                         </Typography>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     );
//                 })}

//                 {filteredFields.length === 0 && (
//                     <Grid item xs={12}>
//                         <Box sx={{ textAlign: 'center', py: 4 }}>
//                             <Typography variant="h6" color="text.secondary">
//                                 {viewType === 'missing' ? "No missing fields found!" : "No filled fields found!"}
//                             </Typography>
//                         </Box>
//                     </Grid>
//                 )}
//             </Grid>

//             {/* Edit Field Dialog */}
//             <EditFieldDialog
//                 open={editDialogOpen}
//                 onClose={handleCloseEditDialog}
//                 fieldKey={selectedField?.key}
//                 fieldName={selectedField?.name}
//                 currentValue={selectedField?.value}
//                 onSave={handleSaveField}
//                 loading={operationLoading.update}
//                 isImageField={selectedField?.isImage}
//             />

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={4000}
//                 onClose={() => setSnackbarOpen(false)}
//             >
//                 <Alert
//                     onClose={() => setSnackbarOpen(false)}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default MemberDetails;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Box,
//     Typography,
//     Grid,
//     Card,
//     CardContent,
//     Button,
//     CircularProgress,
//     Alert,
//     Chip,
//     IconButton,
//     Snackbar,
//     Divider,
//     Paper
// } from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import ImageIcon from "@mui/icons-material/Image";
// import { fetchMemberById, clearSelectedMember, updateMember } from "../../features/member/memberSlice";

// // Import components
// import ImageDisplay from "./ImageDisplay";

// // Section configuration
// const SECTIONS = {
//     personalDetails: {
//         title: "Personal Details",
//         fields: [
//             "personalDetails.title",
//             "personalDetails.nameOfMember",
//             "personalDetails.membershipNumber",
//             "personalDetails.membershipDate",
//             "personalDetails.fatherTitle",
//             "personalDetails.nameOfFather",
//             "personalDetails.motherTitle",
//             "personalDetails.nameOfMother",
//             "personalDetails.dateOfBirth",
//             "personalDetails.ageInYears",
//             "personalDetails.minor",
//             "personalDetails.gender",
//             "personalDetails.religion",
//             "personalDetails.maritalStatus",
//             "personalDetails.spouseTitle",
//             "personalDetails.nameOfSpouse",
//             "personalDetails.caste",
//             "personalDetails.phoneNo",
//             "personalDetails.alternatePhoneNo",
//             "personalDetails.emailId",
//             "personalDetails.amountInCredit"
//         ]
//     },
//     addressDetails: {
//         title: "Address Details",
//         fields: [
//             "addressDetails.permanentAddress",
//             "addressDetails.currentResidentalAddress",
//             "addressDetails.previousCurrentAddress",
//             "addressDetails.permanentAddress.proofDocument",
//             "addressDetails.currentResidentalAddress.proofDocument"
//         ]
//     },
//     documents: {
//         title: "Identity Documents",
//         fields: [
//             "documents.panNo",
//             "documents.panCardPhoto",
//             "documents.rationCard",
//             "documents.rationFrontPhoto",
//             "documents.rationBackPhoto",
//             "documents.drivingLicense",
//             "documents.drivingFrontPhoto",
//             "documents.drivingBackPhoto",
//             "documents.aadhaarNo",
//             "documents.aadhaarFrontPhoto",
//             "documents.aadhaarBackPhoto",
//             "documents.voterId",
//             "documents.voterFrontPhoto",
//             "documents.voterBackPhoto",
//             "documents.passportNo",
//             "documents.passportPhoto",
//             "documents.passportSize",
//             "documents.signedPhoto"
//         ]
//     },
//     professionalDetails: {
//         title: "Professional Details",
//         fields: [
//             "professionalDetails.qualification",
//             "professionalDetails.occupation",
//             "professionalDetails.degreeNumber",
//             "professionalDetails.inCaseOfServiceGovt",
//             "professionalDetails.inCaseOfPrivate",
//             "professionalDetails.inCaseOfService",
//             "professionalDetails.serviceType",
//             "professionalDetails.inCaseOfBusiness"
//         ]
//     },
//     serviceDetails: {
//         title: "Service Details",
//         fields: [
//             "professionalDetails.serviceDetails.fullNameOfCompany",
//             "professionalDetails.serviceDetails.department",
//             "professionalDetails.serviceDetails.addressOfCompany",
//             "professionalDetails.serviceDetails.monthlyIncome",
//             "professionalDetails.serviceDetails.designation",
//             "professionalDetails.serviceDetails.dateOfJoining",
//             "professionalDetails.serviceDetails.employeeCode",
//             "professionalDetails.serviceDetails.dateOfRetirement",
//             "professionalDetails.serviceDetails.officeNo",
//             "professionalDetails.serviceDetails.bankStatement",
//             "professionalDetails.serviceDetails.monthlySlip",
//             "professionalDetails.serviceDetails.idCard"
//         ]
//     },
//     businessDetails: {
//         title: "Business Details",
//         fields: [
//             "professionalDetails.businessDetails.fullNameOfCompany",
//             "professionalDetails.businessDetails.addressOfCompany",
//             "professionalDetails.businessDetails.businessStructure",
//             "professionalDetails.businessDetails.gstCertificate"
//         ]
//     },
//     familyDetails: {
//         title: "Family Details",
//         fields: [
//             "familyDetails.familyMembersMemberOfSociety",
//             "familyDetails.familyMember",
//             "familyDetails.familyMemberNo"
//         ]
//     },
//     nomineeDetails: {
//         title: "Nominee Details",
//         fields: [
//             "nomineeDetails.nomineeName",
//             "nomineeDetails.relationWithApplicant",
//             "nomineeDetails.introduceBy",
//             "nomineeDetails.memberShipNo"
//         ]
//     }
// };

// const MemberDetails = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { selectedMember, loading, error, operationLoading } = useSelector((state) => state.members);

//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [selectedField, setSelectedField] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const [editingSections, setEditingSections] = useState({});
//     const [sectionData, setSectionData] = useState({});

//     useEffect(() => {
//         if (id) {
//             dispatch(fetchMemberById(id));
//         }
//     }, [id, dispatch]);

//     useEffect(() => {
//         return () => {
//             dispatch(clearSelectedMember());
//         };
//     }, [dispatch]);

//     // Initialize section data when member loads
//     useEffect(() => {
//         if (selectedMember) {
//             const initialData = {};
//             Object.keys(SECTIONS).forEach(section => {
//                 initialData[section] = {};
//                 SECTIONS[section].fields.forEach(field => {
//                     initialData[section][field] = getValueByPath(selectedMember, field);
//                 });
//             });
//             setSectionData(initialData);
//         }
//     }, [selectedMember]);

//     const handleEditField = (fieldKey, fieldName, currentValue) => {
//         setSelectedField({
//             key: fieldKey,
//             name: fieldName,
//             value: currentValue,
//             isImage: imageFields.includes(fieldKey)
//         });
//         setEditDialogOpen(true);
//     };

//     const handleSaveField = async (fieldKey, newValue) => {
//         try {
//             const isImageField = imageFields.includes(fieldKey);
//             const formData = new FormData();

//             if (isImageField && newValue instanceof File) {
//                 formData.append(fieldKey, newValue);
//                 formData.append('fieldPath', fieldKey);
//             } else {
//                 const updateData = {};
//                 const parts = fieldKey.split('.');
//                 let current = updateData;

//                 for (let i = 0; i < parts.length - 1; i++) {
//                     current[parts[i]] = current[parts[i]] || {};
//                     current = current[parts[i]];
//                 }
//                 current[parts[parts.length - 1]] = newValue;

//                 // Convert to form data with proper nesting
//                 const appendNestedData = (data, prefix = '') => {
//                     Object.keys(data).forEach(key => {
//                         const value = data[key];
//                         const formKey = prefix ? `${prefix}[${key}]` : key;
                        
//                         if (value && typeof value === 'object' && !(value instanceof File)) {
//                             appendNestedData(value, formKey);
//                         } else {
//                             formData.append(formKey, value || '');
//                         }
//                     });
//                 };

//                 appendNestedData(updateData);
//             }

//             await dispatch(updateMember({
//                 id: selectedMember._id,
//                 formData: formData
//             })).unwrap();

//             setSnackbarMessage(`"${FIELD_MAP[fieldKey]}" updated successfully!`);
//             setSnackbarSeverity('success');
//             setSnackbarOpen(true);
//             setEditDialogOpen(false);

//             setTimeout(() => {
//                 dispatch(fetchMemberById(id));
//             }, 1500);

//         } catch (error) {
//             console.error('Error updating field:', error);
//             setSnackbarMessage(`Error updating field: ${error.message || 'Something went wrong'}`);
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     const handleCloseEditDialog = () => {
//         setEditDialogOpen(false);
//         setSelectedField(null);
//     };

//     const toggleSectionEdit = (section) => {
//         setEditingSections(prev => ({
//             ...prev,
//             [section]: !prev[section]
//         }));
//     };

//     const handleSectionFieldChange = (section, fieldKey, value) => {
//         setSectionData(prev => ({
//             ...prev,
//             [section]: {
//                 ...prev[section],
//                 [fieldKey]: value
//             }
//         }));
//     };

//     const saveSection = async (section) => {
//         try {
//             const formData = new FormData();
//             const sectionFields = sectionData[section];

//             Object.keys(sectionFields).forEach(fieldKey => {
//                 const value = sectionFields[fieldKey];
                
//                 if (imageFields.includes(fieldKey) && value instanceof File) {
//                     formData.append(fieldKey, value);
//                 } else {
//                     const parts = fieldKey.split('.');
//                     let current = {};
//                     let temp = current;
                    
//                     for (let i = 0; i < parts.length - 1; i++) {
//                         temp[parts[i]] = {};
//                         temp = temp[parts[i]];
//                     }
//                     temp[parts[parts.length - 1]] = value;

//                     const appendNestedData = (data, prefix = '') => {
//                         Object.keys(data).forEach(key => {
//                             const val = data[key];
//                             const formKey = prefix ? `${prefix}[${key}]` : key;
                            
//                             if (val && typeof val === 'object' && !(val instanceof File)) {
//                                 appendNestedData(val, formKey);
//                             } else {
//                                 formData.append(formKey, val || '');
//                             }
//                         });
//                     };

//                     appendNestedData(current);
//                 }
//             });

//             await dispatch(updateMember({
//                 id: selectedMember._id,
//                 formData: formData
//             })).unwrap();

//             setSnackbarMessage(`${SECTIONS[section].title} updated successfully!`);
//             setSnackbarSeverity('success');
//             setSnackbarOpen(true);
//             setEditingSections(prev => ({ ...prev, [section]: false }));

//             setTimeout(() => {
//                 dispatch(fetchMemberById(id));
//             }, 1500);

//         } catch (error) {
//             console.error('Error updating section:', error);
//             setSnackbarMessage(`Error updating section: ${error.message || 'Something went wrong'}`);
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     // Enhanced formatValue function
//     const formatValue = (value, fieldKey) => {
//         if (isMissing(value)) {
//             return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;
//         }

//         // Handle image fields
//         if (imageFields.includes(fieldKey)) {
//             const hasImage = value && (typeof value === 'string' && (value.includes('cloudinary') || value.includes('http')));
//             if (hasImage) {
//                 return (
//                     <Box sx={{ mt: 1 }}>
//                         <ImageDisplay
//                             imageUrl={value}
//                             alt={FIELD_MAP[fieldKey]}
//                             height={120}
//                         />
//                     </Box>
//                 );
//             }
//             return (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
//                     <ImageIcon color="disabled" fontSize="small" />
//                     <Typography variant="body2" color="text.secondary" fontStyle="italic">
//                         No Image
//                     </Typography>
//                 </Box>
//             );
//         }

//         // Handle address objects
//         if (fieldKey === 'addressDetails.permanentAddress' || fieldKey === 'addressDetails.currentResidentalAddress') {
//             if (!value || typeof value !== 'object') return "No address data";

//             return (
//                 <Box sx={{ mt: 1 }}>
//                     <Typography variant="body2"><strong>House No:</strong> {value.flatHouseNo || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Area:</strong> {value.areaStreetSector || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Locality:</strong> {value.locality || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Landmark:</strong> {value.landmark || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>City:</strong> {value.city || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>State:</strong> {value.state || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Pincode:</strong> {value.pincode || 'N/A'}</Typography>
//                     <Typography variant="body2"><strong>Country:</strong> {value.country || 'N/A'}</Typography>
//                 </Box>
//             );
//         }

//         if (typeof value === "boolean") return value ? "Yes" : "No";
//         if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "No data";
//         if (typeof value === "object" && value !== null) {
//             return JSON.stringify(value);
//         }

//         return value || "No data";
//     };

//     // Check occupation type to conditionally render sections
//     const shouldShowServiceDetails = () => {
//         return getValueByPath(selectedMember, "professionalDetails.inCaseOfServiceGovt") || 
//                getValueByPath(selectedMember, "professionalDetails.inCaseOfPrivate") ||
//                getValueByPath(selectedMember, "professionalDetails.inCaseOfService");
//     };

//     const shouldShowBusinessDetails = () => {
//         return getValueByPath(selectedMember, "professionalDetails.inCaseOfBusiness");
//     };

//     const shouldShowFamilyDetails = () => {
//         return getValueByPath(selectedMember, "familyDetails.familyMembersMemberOfSociety");
//     };

//     // Calculate statistics
//     const calculateStats = () => {
//         let totalFields = 0;
//         let filledFields = 0;

//         Object.keys(SECTIONS).forEach(section => {
//             SECTIONS[section].fields.forEach(field => {
//                 totalFields++;
//                 if (!isMissing(getValueByPath(selectedMember, field))) {
//                     filledFields++;
//                 }
//             });
//         });

//         return { total: totalFields, filled: filledFields, missing: totalFields - filledFields };
//     };

//     if (loading) {
//         return (
//             <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
//                 <CircularProgress />
//                 <Typography sx={{ ml: 2 }}>Loading member details...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                     Error loading member: {error.message || error.toString()}
//                 </Alert>
//                 <Button variant="contained" onClick={() => navigate(-1)}>
//                     Go Back
//                 </Button>
//             </Box>
//         );
//     }

//     if (!selectedMember) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="info">
//                     Member not found.
//                 </Alert>
//                 <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
//                     Go Back
//                 </Button>
//             </Box>
//         );
//     }

//     const stats = calculateStats();

//     // Render Section Component
//     const renderSection = (sectionKey) => {
//         const section = SECTIONS[sectionKey];
//         const isEditing = editingSections[sectionKey];
        
//         return (
//             <Card key={sectionKey} sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             {section.title}
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit(sectionKey)}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection(sectionKey)}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     <Grid container spacing={2}>
//                         {section.fields.map((fieldKey) => {
//                             const fieldName = FIELD_MAP[fieldKey];
//                             const value = getValueByPath(selectedMember, fieldKey);
//                             const missing = isMissing(value);
//                             const isImageField = imageFields.includes(fieldKey);

//                             return (
//                                 <Grid item xs={12} md={6} lg={4} key={fieldKey}>
//                                     <Paper 
//                                         variant="outlined" 
//                                         sx={{ 
//                                             p: 2, 
//                                             borderColor: missing ? 'error.main' : 'grey.300',
//                                             backgroundColor: missing ? '#fff5f5' : 'transparent'
//                                         }}
//                                     >
//                                         <Box display="flex" justifyContent="space-between" alignItems="flex-start">
//                                             <Box display="flex" alignItems="center" gap={1} flex={1}>
//                                                 {missing ? (
//                                                     <ErrorOutlineIcon color="error" fontSize="small" />
//                                                 ) : isImageField && value ? (
//                                                     <CheckCircleOutlineIcon color="success" fontSize="small" />
//                                                 ) : (
//                                                     <CheckCircleOutlineIcon color="primary" fontSize="small" />
//                                                 )}
//                                                 <Typography variant="subtitle2" color={missing ? "error" : "text.primary"}>
//                                                     {fieldName}
//                                                 </Typography>
//                                             </Box>
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={() => handleEditField(fieldKey, fieldName, value)}
//                                                 title="Edit this field"
//                                             >
//                                                 <EditIcon fontSize="small" />
//                                             </IconButton>
//                                         </Box>
                                        
//                                         <Box sx={{ mt: 1 }}>
//                                             {formatValue(value, fieldKey)}
//                                         </Box>
//                                     </Paper>
//                                 </Grid>
//                             );
//                         })}
//                     </Grid>
//                 </CardContent>
//             </Card>
//         );
//     };

//     return (
//         <Box sx={{ p: 3 }}>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <IconButton onClick={() => navigate(-1)}>
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
//                         Member Details
//                     </Typography>
//                 </Box>
//             </Box>

//             {/* Member Info Summary */}
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Member Name: {getValueByPath(selectedMember, "personalDetails.nameOfMember") || "Unknown Member"}
//                     </Typography>
//                     <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                         <Chip
//                             label={`Membership: ${getValueByPath(selectedMember, "personalDetails.membershipNumber") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Phone: ${getValueByPath(selectedMember, "personalDetails.phoneNo") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Email: ${getValueByPath(selectedMember, "personalDetails.emailId") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Filled: ${stats.filled}/${stats.total}`}
//                             color="success"
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Missing: ${stats.missing}`}
//                             color="error"
//                             variant="outlined"
//                         />
//                     </Box>
//                 </CardContent>
//             </Card>

//             {/* Sections */}
//             {renderSection('personalDetails')}
//             {renderSection('addressDetails')}
//             {renderSection('documents')}
//             {renderSection('professionalDetails')}
            
//             {/* Conditional Professional Sections */}
//             {shouldShowServiceDetails() && renderSection('serviceDetails')}
//             {shouldShowBusinessDetails() && renderSection('businessDetails')}
            
//             {/* Conditional Family Section */}
//             {shouldShowFamilyDetails() && renderSection('familyDetails')}
            
//             {/* Nominee Section */}
//             {renderSection('nomineeDetails')}

//             {/* Edit Field Dialog */}
//             <EditFieldDialog
//                 open={editDialogOpen}
//                 onClose={handleCloseEditDialog}
//                 fieldKey={selectedField?.key}
//                 fieldName={selectedField?.name}
//                 currentValue={selectedField?.value}
//                 onSave={handleSaveField}
//                 loading={operationLoading.update}
//                 isImageField={selectedField?.isImage}
//             />

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={4000}
//                 onClose={() => setSnackbarOpen(false)}
//             >
//                 <Alert
//                     onClose={() => setSnackbarOpen(false)}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default MemberDetails;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Box,
//     Typography,
//     Grid,
//     Card,
//     CardContent,
//     Button,
//     CircularProgress,
//     Alert,
//     Chip,
//     IconButton,
//     Snackbar,
//     Divider,
//     Paper,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Checkbox,
//     FormControlLabel
// } from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import ImageIcon from "@mui/icons-material/Image";
// import { fetchMemberById, clearSelectedMember, updateMember } from "../../features/member/memberSlice";

// // Import components
// import ImageDisplay from "./ImageDisplay";

// // Helper functions
// const getValueByPath = (obj, path) => {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
// };

// const isMissing = (value) => {
//     if (value === null || value === undefined) return true;
//     if (typeof value === 'string' && value.trim() === '') return true;
//     if (Array.isArray(value) && value.length === 0) return true;
//     if (typeof value === 'object' && Object.keys(value).length === 0) return true;
//     return false;
// };

// // Image field names array
// const imageFields = [
//     'addressDetails.permanentAddress.proofDocument',
//     'addressDetails.currentResidentalAddress.proofDocument',
//     'documents.passportSize',
//     'documents.signedPhoto',
//     'documents.aadhaarFrontPhoto',
//     'documents.aadhaarBackPhoto',
//     'documents.panCardPhoto',
//     'documents.voterFrontPhoto',
//     'documents.voterBackPhoto',
//     'documents.passportPhoto',
//     'documents.drivingFrontPhoto',
//     'documents.drivingBackPhoto',
//     'documents.rationFrontPhoto',
//     'documents.rationBackPhoto',
//     'professionalDetails.serviceDetails.bankStatement',
//     'professionalDetails.serviceDetails.monthlySlip',
//     'professionalDetails.serviceDetails.idCard',
//     'professionalDetails.businessDetails.gstCertificate'
// ];

// // Field mapping
// const FIELD_MAP = {
//     // Personal Details
//     "personalDetails.title": "Title",
//     "personalDetails.nameOfMember": "Member Name",
//     "personalDetails.membershipNumber": "Membership No",
//     "personalDetails.membershipDate": "Membership Date",
//     "personalDetails.fatherTitle": "Father's Title",
//     "personalDetails.nameOfFather": "Father's Name",
//     "personalDetails.motherTitle": "Mother's Title",
//     "personalDetails.nameOfMother": "Mother's Name",
//     "personalDetails.dateOfBirth": "Date of Birth",
//     "personalDetails.ageInYears": "Age (Years)",
//     "personalDetails.minor": "Is Minor",
//     "personalDetails.gender": "Gender",
//     "personalDetails.religion": "Religion",
//     "personalDetails.maritalStatus": "Marital Status",
//     "personalDetails.spouseTitle": "Spouse Title",
//     "personalDetails.nameOfSpouse": "Spouse Name",
//     "personalDetails.caste": "Caste",
//     "personalDetails.phoneNo": "Phone No",
//     "personalDetails.alternatePhoneNo": "Alternate Phone",
//     "personalDetails.emailId": "Email",
//     "personalDetails.amountInCredit": "Amount In Credit",

//     // Address
//     "addressDetails.residentType": "Resident Type",
//     "addressDetails.permanentAddress.flatHouseNo": "House No",
//     "addressDetails.permanentAddress.areaStreetSector": "Area/Street/Sector",
//     "addressDetails.permanentAddress.locality": "Locality",
//     "addressDetails.permanentAddress.landmark": "Landmark",
//     "addressDetails.permanentAddress.city": "City",
//     "addressDetails.permanentAddress.state": "State",
//     "addressDetails.permanentAddress.pincode": "Pincode",
//     "addressDetails.permanentAddress.country": "Country",
//     "addressDetails.currentResidentalAddress.flatHouseNo": "House No",
//     "addressDetails.currentResidentalAddress.areaStreetSector": "Area/Street/Sector",
//     "addressDetails.currentResidentalAddress.locality": "Locality",
//     "addressDetails.currentResidentalAddress.landmark": "Landmark",
//     "addressDetails.currentResidentalAddress.city": "City",
//     "addressDetails.currentResidentalAddress.state": "State",
//     "addressDetails.currentResidentalAddress.pincode": "Pincode",
//     "addressDetails.currentResidentalAddress.country": "Country",

//     // Documents
//     "documents.panNo": "PAN No",
//     "documents.panCardPhoto": "PAN Card Photo",
//     "documents.rationCard": "Ration Card No",
//     "documents.rationFrontPhoto": "Ration Card Front",
//     "documents.rationBackPhoto": "Ration Card Back",
//     "documents.drivingLicense": "Driving License",
//     "documents.drivingFrontPhoto": "Driving License Front",
//     "documents.drivingBackPhoto": "Driving License Back",
//     "documents.aadhaarNo": "Aadhaar No",
//     "documents.aadhaarFrontPhoto": "Aadhaar Front",
//     "documents.aadhaarBackPhoto": "Aadhaar Back",
//     "documents.voterId": "Voter ID",
//     "documents.voterFrontPhoto": "Voter ID Front",
//     "documents.voterBackPhoto": "Voter ID Back",
//     "documents.passportNo": "Passport No",
//     "documents.passportPhoto": "Passport Photo",
//     "documents.passportSize": "Passport Size Photo",
//     "documents.signedPhoto": "Signed Photo",

//     // Professional
//     "professionalDetails.qualification": "Qualification",
//     "professionalDetails.occupation": "Occupation",
//     "professionalDetails.degreeNumber": "Degree Number",
//     "professionalDetails.inCaseOfServiceGovt": "Government Service",
//     "professionalDetails.inCaseOfPrivate": "Private Service",
//     "professionalDetails.inCaseOfService": "Service",
//     "professionalDetails.serviceType": "Service Type",
//     "professionalDetails.inCaseOfBusiness": "Business",

//     // Service Details
//     "professionalDetails.serviceDetails.fullNameOfCompany": "Company Name",
//     "professionalDetails.serviceDetails.department": "Department",
//     "professionalDetails.serviceDetails.addressOfCompany": "Company Address",
//     "professionalDetails.serviceDetails.monthlyIncome": "Monthly Income",
//     "professionalDetails.serviceDetails.designation": "Designation",
//     "professionalDetails.serviceDetails.dateOfJoining": "Date of Joining",
//     "professionalDetails.serviceDetails.employeeCode": "Employee Code",
//     "professionalDetails.serviceDetails.dateOfRetirement": "Date of Retirement",
//     "professionalDetails.serviceDetails.officeNo": "Office Phone",
//     "professionalDetails.serviceDetails.bankStatement": "Bank Statement",
//     "professionalDetails.serviceDetails.monthlySlip": "Monthly Slip",
//     "professionalDetails.serviceDetails.idCard": "ID Card",

//     // Business Details
//     "professionalDetails.businessDetails.fullNameOfCompany": "Business Name",
//     "professionalDetails.businessDetails.addressOfCompany": "Business Address",
//     "professionalDetails.businessDetails.businessStructure": "Business Structure",
//     "professionalDetails.businessDetails.gstCertificate": "GST Certificate",

//     // Family
//     "familyDetails.familyMembersMemberOfSociety": "Family Members in Society",
//     "familyDetails.familyMember.membershipNo": "Membership No",
//     "familyDetails.familyMember.name": "Name of Member",
//     "familyDetails.familyMember.relation": "Relation with Applicant",

//     // Nominee
//     "nomineeDetails.nomineeName": "Nominee Name",
//     "nomineeDetails.relationWithApplicant": "Relation with Applicant",
//     "nomineeDetails.introduceBy": "Introduced By",
//     "nomineeDetails.memberShipNo": "Membership No"
// };

// const MemberDetails = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { selectedMember, loading, error, operationLoading } = useSelector((state) => state.members);

//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const [editingSections, setEditingSections] = useState({});
//     const [sectionData, setSectionData] = useState({});

//     useEffect(() => {
//         if (id) {
//             dispatch(fetchMemberById(id));
//         }
//     }, [id, dispatch]);

//     useEffect(() => {
//         return () => {
//             dispatch(clearSelectedMember());
//         };
//     }, [dispatch]);

//     // Initialize section data when member loads
//     useEffect(() => {
//         if (selectedMember) {
//             const initialData = {};
//             Object.keys(FIELD_MAP).forEach(field => {
//                 const section = field.split('.')[0];
//                 if (!initialData[section]) initialData[section] = {};
//                 initialData[section][field] = getValueByPath(selectedMember, field);
//             });
//             setSectionData(initialData);
//         }
//     }, [selectedMember]);

//     const toggleSectionEdit = (section) => {
//         setEditingSections(prev => ({
//             ...prev,
//             [section]: !prev[section]
//         }));
//     };

//     const handleFieldChange = (section, fieldKey, value) => {
//         setSectionData(prev => ({
//             ...prev,
//             [section]: {
//                 ...prev[section],
//                 [fieldKey]: value
//             }
//         }));
//     };

//     const saveSection = async (section) => {
//         try {
//             const formData = new FormData();
//             const sectionFields = sectionData[section];

//             Object.keys(sectionFields).forEach(fieldKey => {
//                 const value = sectionFields[fieldKey];
                
//                 if (imageFields.includes(fieldKey) && value instanceof File) {
//                     formData.append(fieldKey, value);
//                 } else {
//                     const parts = fieldKey.split('.');
//                     let current = {};
//                     let temp = current;
                    
//                     for (let i = 0; i < parts.length - 1; i++) {
//                         temp[parts[i]] = {};
//                         temp = temp[parts[i]];
//                     }
//                     temp[parts[parts.length - 1]] = value;

//                     const appendNestedData = (data, prefix = '') => {
//                         Object.keys(data).forEach(key => {
//                             const val = data[key];
//                             const formKey = prefix ? `${prefix}[${key}]` : key;
                            
//                             if (val && typeof val === 'object' && !(val instanceof File)) {
//                                 appendNestedData(val, formKey);
//                             } else {
//                                 formData.append(formKey, val || '');
//                             }
//                         });
//                     };

//                     appendNestedData(current);
//                 }
//             });

//             await dispatch(updateMember({
//                 id: selectedMember._id,
//                 formData: formData
//             })).unwrap();

//             setSnackbarMessage(`${section} updated successfully!`);
//             setSnackbarSeverity('success');
//             setSnackbarOpen(true);
//             setEditingSections(prev => ({ ...prev, [section]: false }));

//             setTimeout(() => {
//                 dispatch(fetchMemberById(id));
//             }, 1500);

//         } catch (error) {
//             console.error('Error updating section:', error);
//             setSnackbarMessage(`Error updating section: ${error.message || 'Something went wrong'}`);
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
//     };

//     // Enhanced formatValue function
//     const formatValue = (value, fieldKey) => {
//         if (isMissing(value)) {
//             return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;
//         }

//         // Handle image fields
//         if (imageFields.includes(fieldKey)) {
//             const hasImage = value && (typeof value === 'string' && (value.includes('cloudinary') || value.includes('http')));
//             if (hasImage) {
//                 return (
//                     <Box sx={{ mt: 1 }}>
//                         <ImageDisplay
//                             imageUrl={value}
//                             alt={FIELD_MAP[fieldKey]}
//                             height={120}
//                         />
//                     </Box>
//                 );
//             }
//             return (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, minHeight: 120, justifyContent: 'center', border: '1px dashed #ccc', borderRadius: 1 }}>
//                     <ImageIcon color="disabled" fontSize="small" />
//                     <Typography variant="body2" color="text.secondary" fontStyle="italic">
//                         No Image
//                     </Typography>
//                 </Box>
//             );
//         }

//         if (typeof value === "boolean") return value ? "Yes" : "No";
//         if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "No data";
//         return value || "No data";
//     };

//     // Render Personal Details Section
//     const renderPersonalDetails = () => {
//         const isEditing = editingSections.personalDetails;
//         const fields = [
//             ["personalDetails.title", "personalDetails.nameOfMember", "personalDetails.membershipNumber"],
//             ["personalDetails.membershipDate", "personalDetails.fatherTitle", "personalDetails.nameOfFather"],
//             ["personalDetails.motherTitle", "personalDetails.nameOfMother", "personalDetails.dateOfBirth"],
//             ["personalDetails.ageInYears", "personalDetails.minor", "personalDetails.gender"],
//             ["personalDetails.religion", "personalDetails.maritalStatus", "personalDetails.spouseTitle"],
//             ["personalDetails.nameOfSpouse", "personalDetails.caste", "personalDetails.phoneNo"],
//             ["personalDetails.alternatePhoneNo", "personalDetails.emailId", "personalDetails.amountInCredit"]
//         ];

//         return (
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             Personal Details
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit('personalDetails')}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection('personalDetails')}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     {fields.map((row, rowIndex) => (
//                         <Grid container spacing={2} key={rowIndex} sx={{ mb: 2 }}>
//                             {row.map((fieldKey) => {
//                                 const fieldName = FIELD_MAP[fieldKey];
//                                 const value = getValueByPath(selectedMember, fieldKey);
//                                 const missing = isMissing(value);

//                                 return (
//                                     <Grid item xs={12} md={4} key={fieldKey}>
//                                         <Paper variant="outlined" sx={{ p: 2 }}>
//                                             <Typography variant="subtitle2" color={missing ? "error" : "text.primary"} gutterBottom>
//                                                 {fieldName}
//                                             </Typography>
//                                             {isEditing ? (
//                                                 <TextField
//                                                     fullWidth
//                                                     size="small"
//                                                     value={sectionData.personalDetails?.[fieldKey] || ''}
//                                                     onChange={(e) => handleFieldChange('personalDetails', fieldKey, e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <Typography variant="body2">
//                                                     {formatValue(value, fieldKey)}
//                                                 </Typography>
//                                             )}
//                                         </Paper>
//                                     </Grid>
//                                 );
//                             })}
//                         </Grid>
//                     ))}
//                 </CardContent>
//             </Card>
//         );
//     };

//     // Render Address Details Section
//     const renderAddressDetails = () => {
//         const isEditing = editingSections.addressDetails;
//         const residentType = getValueByPath(selectedMember, 'addressDetails.residentType') || 'owned';

//         return (
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             Address Details
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit('addressDetails')}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection('addressDetails')}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     {/* Resident Type Dropdown */}
//                     <Grid container spacing={2} sx={{ mb: 3 }}>
//                         <Grid item xs={12} md={6}>
//                             <FormControl fullWidth size="small">
//                                 <InputLabel>Resident Type</InputLabel>
//                                 <Select
//                                     value={isEditing ? (sectionData.addressDetails?.['addressDetails.residentType'] || residentType) : residentType}
//                                     label="Resident Type"
//                                     onChange={(e) => handleFieldChange('addressDetails', 'addressDetails.residentType', e.target.value)}
//                                     disabled={!isEditing}
//                                 >
//                                     <MenuItem value="owned">Owned</MenuItem>
//                                     <MenuItem value="rented">Rented</MenuItem>
//                                     <MenuItem value="company">Company Provided</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>

//                     {/* Current Address */}
//                     <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                         Current Residential Address
//                     </Typography>
//                     <Grid container spacing={2}>
//                         {/* Address Fields - 8 columns */}
//                         <Grid item xs={12} md={8}>
//                             <Grid container spacing={2}>
//                                 {[
//                                     ['addressDetails.currentResidentalAddress.flatHouseNo', 'addressDetails.currentResidentalAddress.areaStreetSector'],
//                                     ['addressDetails.currentResidentalAddress.locality', 'addressDetails.currentResidentalAddress.landmark'],
//                                     ['addressDetails.currentResidentalAddress.city', 'addressDetails.currentResidentalAddress.state'],
//                                     ['addressDetails.currentResidentalAddress.pincode', 'addressDetails.currentResidentalAddress.country']
//                                 ].map((row, rowIndex) => (
//                                     <Grid container spacing={2} key={rowIndex}>
//                                         {row.map((fieldKey) => (
//                                             <Grid item xs={12} md={6} key={fieldKey}>
//                                                 <Typography variant="subtitle2" gutterBottom>
//                                                     {FIELD_MAP[fieldKey]}
//                                                 </Typography>
//                                                 {isEditing ? (
//                                                     <TextField
//                                                         fullWidth
//                                                         size="small"
//                                                         value={sectionData.addressDetails?.[fieldKey] || ''}
//                                                         onChange={(e) => handleFieldChange('addressDetails', fieldKey, e.target.value)}
//                                                     />
//                                                 ) : (
//                                                     <Typography variant="body2">
//                                                         {formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)}
//                                                     </Typography>
//                                                 )}
//                                             </Grid>
//                                         ))}
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Grid>
                        
//                         {/* Proof Document - 4 columns */}
//                         <Grid item xs={12} md={4}>
//                             <Typography variant="subtitle2" gutterBottom>
//                                 Proof Document
//                             </Typography>
//                             {formatValue(getValueByPath(selectedMember, 'addressDetails.currentResidentalAddress.proofDocument'), 'addressDetails.currentResidentalAddress.proofDocument')}
//                         </Grid>
//                     </Grid>

//                     <Divider sx={{ my: 3 }} />

//                     {/* Permanent Address */}
//                     <Typography variant="h6" gutterBottom>
//                         Permanent Address
//                     </Typography>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={8}>
//                             <Grid container spacing={2}>
//                                 {[
//                                     ['addressDetails.permanentAddress.flatHouseNo', 'addressDetails.permanentAddress.areaStreetSector'],
//                                     ['addressDetails.permanentAddress.locality', 'addressDetails.permanentAddress.landmark'],
//                                     ['addressDetails.permanentAddress.city', 'addressDetails.permanentAddress.state'],
//                                     ['addressDetails.permanentAddress.pincode', 'addressDetails.permanentAddress.country']
//                                 ].map((row, rowIndex) => (
//                                     <Grid container spacing={2} key={rowIndex}>
//                                         {row.map((fieldKey) => (
//                                             <Grid item xs={12} md={6} key={fieldKey}>
//                                                 <Typography variant="subtitle2" gutterBottom>
//                                                     {FIELD_MAP[fieldKey]}
//                                                 </Typography>
//                                                 {isEditing ? (
//                                                     <TextField
//                                                         fullWidth
//                                                         size="small"
//                                                         value={sectionData.addressDetails?.[fieldKey] || ''}
//                                                         onChange={(e) => handleFieldChange('addressDetails', fieldKey, e.target.value)}
//                                                     />
//                                                 ) : (
//                                                     <Typography variant="body2">
//                                                         {formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)}
//                                                     </Typography>
//                                                 )}
//                                             </Grid>
//                                         ))}
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Grid>
                        
//                         <Grid item xs={12} md={4}>
//                             <Typography variant="subtitle2" gutterBottom>
//                                 Proof Document
//                             </Typography>
//                             {formatValue(getValueByPath(selectedMember, 'addressDetails.permanentAddress.proofDocument'), 'addressDetails.permanentAddress.proofDocument')}
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
//         );
//     };

//     // Render Documents Section
//     const renderDocuments = () => {
//         const isEditing = editingSections.documents;
//         const documentRows = [
//             [{}, 'documents.passportSize', 'documents.signedPhoto'],
//             ['documents.aadhaarNo', 'documents.aadhaarFrontPhoto', 'documents.aadhaarBackPhoto'],
//             ['documents.panNo', 'documents.panCardPhoto', {}],
//             ['documents.voterId', 'documents.voterFrontPhoto', 'documents.voterBackPhoto'],
//             ['documents.passportNo', 'documents.passportPhoto', {}],
//             ['documents.drivingLicense', 'documents.drivingFrontPhoto', 'documents.drivingBackPhoto'],
//             ['documents.rationCard', 'documents.rationFrontPhoto', 'documents.rationBackPhoto']
//         ];

//         return (
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             Identity Documents
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit('documents')}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection('documents')}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     {documentRows.map((row, rowIndex) => (
//                         <Grid container spacing={2} key={rowIndex} sx={{ mb: 3 }}>
//                             {row.map((fieldKey, colIndex) => (
//                                 <Grid item xs={12} md={4} key={`${rowIndex}-${colIndex}`}>
//                                     {fieldKey && FIELD_MAP[fieldKey] ? (
//                                         <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                                             <Typography variant="subtitle2" gutterBottom>
//                                                 {FIELD_MAP[fieldKey]}
//                                             </Typography>
//                                             {isEditing && !imageFields.includes(fieldKey) ? (
//                                                 <TextField
//                                                     fullWidth
//                                                     size="small"
//                                                     value={sectionData.documents?.[fieldKey] || ''}
//                                                     onChange={(e) => handleFieldChange('documents', fieldKey, e.target.value)}
//                                                 />
//                                             ) : (
//                                                 formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)
//                                             )}
//                                         </Paper>
//                                     ) : (
//                                         <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }}>
//                                             <Typography variant="body2" color="text.secondary" fontStyle="italic">
//                                                 -
//                                             </Typography>
//                                         </Paper>
//                                     )}
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     ))}
//                 </CardContent>
//             </Card>
//         );
//     };

//     // Render Professional Details Section
//     const renderProfessionalDetails = () => {
//         const isEditing = editingSections.professionalDetails;
//         const isService = getValueByPath(selectedMember, 'professionalDetails.inCaseOfServiceGovt') || 
//                          getValueByPath(selectedMember, 'professionalDetails.inCaseOfPrivate');
//         const isBusiness = getValueByPath(selectedMember, 'professionalDetails.inCaseOfBusiness');

//         return (
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             Professional Details
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit('professionalDetails')}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection('professionalDetails')}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     {/* Basic Professional Fields */}
//                     <Grid container spacing={2} sx={{ mb: 3 }}>
//                         {['professionalDetails.qualification', 'professionalDetails.occupation', 'professionalDetails.degreeNumber'].map((fieldKey) => (
//                             <Grid item xs={12} md={4} key={fieldKey}>
//                                 <Typography variant="subtitle2" gutterBottom>
//                                     {FIELD_MAP[fieldKey]}
//                                 </Typography>
//                                 {isEditing ? (
//                                     <TextField
//                                         fullWidth
//                                         size="small"
//                                         value={sectionData.professionalDetails?.[fieldKey] || ''}
//                                         onChange={(e) => handleFieldChange('professionalDetails', fieldKey, e.target.value)}
//                                     />
//                                 ) : (
//                                     <Typography variant="body2">
//                                         {formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)}
//                                     </Typography>
//                                 )}
//                             </Grid>
//                         ))}
//                     </Grid>

//                     {/* Service Type Selection */}
//                     {isEditing && (
//                         <Grid container spacing={2} sx={{ mb: 3 }}>
//                             <Grid item xs={12} md={4}>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={sectionData.professionalDetails?.['professionalDetails.inCaseOfServiceGovt'] || false}
//                                             onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.inCaseOfServiceGovt', e.target.checked)}
//                                         />
//                                     }
//                                     label="Government Service"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={sectionData.professionalDetails?.['professionalDetails.inCaseOfPrivate'] || false}
//                                             onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.inCaseOfPrivate', e.target.checked)}
//                                         />
//                                     }
//                                     label="Private Service"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={sectionData.professionalDetails?.['professionalDetails.inCaseOfBusiness'] || false}
//                                             onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.inCaseOfBusiness', e.target.checked)}
//                                         />
//                                     }
//                                     label="Business"
//                                 />
//                             </Grid>
//                         </Grid>
//                     )}

//                     {/* Service Details */}
//                     {(isService || (isEditing && (sectionData.professionalDetails?.['professionalDetails.inCaseOfServiceGovt'] || sectionData.professionalDetails?.['professionalDetails.inCaseOfPrivate']))) && (
//                         <>
//                             <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//                                 Service Details
//                             </Typography>
//                             {[
//                                 ['professionalDetails.serviceDetails.fullNameOfCompany', 'professionalDetails.serviceDetails.department', 'professionalDetails.serviceDetails.addressOfCompany'],
//                                 ['professionalDetails.serviceDetails.monthlyIncome', 'professionalDetails.serviceDetails.designation', 'professionalDetails.serviceDetails.dateOfJoining'],
//                                 ['professionalDetails.serviceDetails.employeeCode', 'professionalDetails.serviceDetails.dateOfRetirement', 'professionalDetails.serviceDetails.officeNo'],
//                                 ['professionalDetails.serviceDetails.bankStatement', 'professionalDetails.serviceDetails.monthlySlip', 'professionalDetails.serviceDetails.idCard']
//                             ].map((row, rowIndex) => (
//                                 <Grid container spacing={2} key={rowIndex} sx={{ mb: 2 }}>
//                                     {row.map((fieldKey) => (
//                                         <Grid item xs={12} md={4} key={fieldKey}>
//                                             <Typography variant="subtitle2" gutterBottom>
//                                                 {FIELD_MAP[fieldKey]}
//                                             </Typography>
//                                             {isEditing ? (
//                                                 imageFields.includes(fieldKey) ? (
//                                                     <input
//                                                         type="file"
//                                                         accept="image/*,application/pdf"
//                                                         onChange={(e) => handleFieldChange('professionalDetails', fieldKey, e.target.files[0])}
//                                                     />
//                                                 ) : (
//                                                     <TextField
//                                                         fullWidth
//                                                         size="small"
//                                                         value={sectionData.professionalDetails?.[fieldKey] || ''}
//                                                         onChange={(e) => handleFieldChange('professionalDetails', fieldKey, e.target.value)}
//                                                     />
//                                                 )
//                                             ) : (
//                                                 formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)
//                                             )}
//                                         </Grid>
//                                     ))}
//                                 </Grid>
//                             ))}
//                         </>
//                     )}

//                     {/* Business Details */}
//                     {(isBusiness || (isEditing && sectionData.professionalDetails?.['professionalDetails.inCaseOfBusiness'])) && (
//                         <>
//                             <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//                                 Business Details
//                             </Typography>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} md={4}>
//                                     <Typography variant="subtitle2" gutterBottom>
//                                         Business Name
//                                     </Typography>
//                                     {isEditing ? (
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             value={sectionData.professionalDetails?.['professionalDetails.businessDetails.fullNameOfCompany'] || ''}
//                                             onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.businessDetails.fullNameOfCompany', e.target.value)}
//                                         />
//                                     ) : (
//                                         <Typography variant="body2">
//                                             {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.fullNameOfCompany'), 'professionalDetails.businessDetails.fullNameOfCompany')}
//                                         </Typography>
//                                     )}
//                                 </Grid>
//                                 <Grid item xs={12} md={4}>
//                                     <Typography variant="subtitle2" gutterBottom>
//                                         Business Address
//                                     </Typography>
//                                     {isEditing ? (
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             value={sectionData.professionalDetails?.['professionalDetails.businessDetails.addressOfCompany'] || ''}
//                                             onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.businessDetails.addressOfCompany', e.target.value)}
//                                         />
//                                     ) : (
//                                         <Typography variant="body2">
//                                             {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.addressOfCompany'), 'professionalDetails.businessDetails.addressOfCompany')}
//                                         </Typography>
//                                     )}
//                                 </Grid>
//                                 <Grid item xs={12} md={4}>
//                                     <Typography variant="subtitle2" gutterBottom>
//                                         Business Structure
//                                     </Typography>
//                                     {isEditing ? (
//                                         <FormControl fullWidth size="small">
//                                             <Select
//                                                 value={sectionData.professionalDetails?.['professionalDetails.businessDetails.businessStructure'] || ''}
//                                                 onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.businessDetails.businessStructure', e.target.value)}
//                                             >
//                                                 <MenuItem value="">Select Business Structure</MenuItem>
//                                                 <MenuItem value="INDIVIDUAL">Individual</MenuItem>
//                                                 <MenuItem value="PROPRIETORSHIP">Proprietorship</MenuItem>
//                                                 <MenuItem value="PARTNERSHIP">Partnership</MenuItem>
//                                                 <MenuItem value="LLP">LLP</MenuItem>
//                                                 <MenuItem value="PVT_LTD">Private Limited</MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     ) : (
//                                         <Typography variant="body2">
//                                             {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.businessStructure'), 'professionalDetails.businessDetails.businessStructure')}
//                                         </Typography>
//                                     )}
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography variant="subtitle2" gutterBottom>
//                                         GST Certificate
//                                     </Typography>
//                                     {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.gstCertificate'), 'professionalDetails.businessDetails.gstCertificate')}
//                                 </Grid>
//                             </Grid>
//                         </>
//                     )}
//                 </CardContent>
//             </Card>
//         );
//     };

//     // Render Family Details Section
//     const renderFamilyDetails = () => {
//         const isEditing = editingSections.familyDetails;
//         const hasFamilyMembers = getValueByPath(selectedMember, 'familyDetails.familyMembersMemberOfSociety');

//         return (
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             Family Details
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit('familyDetails')}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection('familyDetails')}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={isEditing ? (sectionData.familyDetails?.['familyDetails.familyMembersMemberOfSociety'] || false) : hasFamilyMembers}
//                                 onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMembersMemberOfSociety', e.target.checked)}
//                                 disabled={!isEditing}
//                             />
//                         }
//                         label="Any family member a member of the society?"
//                     />

//                     {(hasFamilyMembers || (isEditing && sectionData.familyDetails?.['familyDetails.familyMembersMemberOfSociety'])) && (
//                         <Grid container spacing={2} sx={{ mt: 2 }}>
//                             <Grid item xs={12} md={4}>
//                                 <Typography variant="subtitle2" gutterBottom>
//                                     Membership No
//                                 </Typography>
//                                 {isEditing ? (
//                                     <TextField
//                                         fullWidth
//                                         size="small"
//                                         value={sectionData.familyDetails?.['familyDetails.familyMember.membershipNo'] || ''}
//                                         onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMember.membershipNo', e.target.value)}
//                                     />
//                                 ) : (
//                                     <Typography variant="body2">
//                                         {formatValue(getValueByPath(selectedMember, 'familyDetails.familyMember.membershipNo'), 'familyDetails.familyMember.membershipNo')}
//                                     </Typography>
//                                 )}
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <Typography variant="subtitle2" gutterBottom>
//                                     Name of Member
//                                 </Typography>
//                                 {isEditing ? (
//                                     <TextField
//                                         fullWidth
//                                         size="small"
//                                         value={sectionData.familyDetails?.['familyDetails.familyMember.name'] || ''}
//                                         onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMember.name', e.target.value)}
//                                     />
//                                 ) : (
//                                     <Typography variant="body2">
//                                         {formatValue(getValueByPath(selectedMember, 'familyDetails.familyMember.name'), 'familyDetails.familyMember.name')}
//                                     </Typography>
//                                 )}
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <Typography variant="subtitle2" gutterBottom>
//                                     Relation with Applicant
//                                 </Typography>
//                                 {isEditing ? (
//                                     <FormControl fullWidth size="small">
//                                         <Select
//                                             value={sectionData.familyDetails?.['familyDetails.familyMember.relation'] || ''}
//                                             onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMember.relation', e.target.value)}
//                                         >
//                                             <MenuItem value="">Select Relation</MenuItem>
//                                             <MenuItem value="FATHER">Father</MenuItem>
//                                             <MenuItem value="MOTHER">Mother</MenuItem>
//                                             <MenuItem value="SPOUSE">Spouse</MenuItem>
//                                             <MenuItem value="SON">Son</MenuItem>
//                                             <MenuItem value="DAUGHTER">Daughter</MenuItem>
//                                             <MenuItem value="BROTHER">Brother</MenuItem>
//                                             <MenuItem value="SISTER">Sister</MenuItem>
//                                             <MenuItem value="GRANDFATHER">Grandfather</MenuItem>
//                                             <MenuItem value="GRANDMOTHER">Grandmother</MenuItem>
//                                             <MenuItem value="UNCLE">Uncle</MenuItem>
//                                             <MenuItem value="AUNT">Aunt</MenuItem>
//                                             <MenuItem value="OTHER">Other</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 ) : (
//                                     <Typography variant="body2">
//                                         {formatValue(getValueByPath(selectedMember, 'familyDetails.familyMember.relation'), 'familyDetails.familyMember.relation')}
//                                     </Typography>
//                                 )}
//                             </Grid>
//                         </Grid>
//                     )}
//                 </CardContent>
//             </Card>
//         );
//     };

//     // Render Nominee Details Section
//     const renderNomineeDetails = () => {
//         const isEditing = editingSections.nomineeDetails;

//         return (
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                         <Typography variant="h5" color="primary.main">
//                             Nominee Details
//                         </Typography>
//                         <Box>
//                             {!isEditing ? (
//                                 <Button
//                                     startIcon={<EditIcon />}
//                                     onClick={() => toggleSectionEdit('nomineeDetails')}
//                                     variant="outlined"
//                                     size="small"
//                                 >
//                                     Edit
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     startIcon={<SaveIcon />}
//                                     onClick={() => saveSection('nomineeDetails')}
//                                     variant="contained"
//                                     size="small"
//                                     color="success"
//                                     disabled={operationLoading.update}
//                                 >
//                                     {operationLoading.update ? "Saving..." : "Save"}
//                                 </Button>
//                             )}
//                         </Box>
//                     </Box>

//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={3}>
//                             <Typography variant="subtitle2" gutterBottom>
//                                 Nominee Name
//                             </Typography>
//                             {isEditing ? (
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     value={sectionData.nomineeDetails?.['nomineeDetails.nomineeName'] || ''}
//                                     onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.nomineeName', e.target.value)}
//                                 />
//                             ) : (
//                                 <Typography variant="body2">
//                                     {formatValue(getValueByPath(selectedMember, 'nomineeDetails.nomineeName'), 'nomineeDetails.nomineeName')}
//                                 </Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <Typography variant="subtitle2" gutterBottom>
//                                 Relation with Applicant
//                             </Typography>
//                             {isEditing ? (
//                                 <FormControl fullWidth size="small">
//                                     <Select
//                                         value={sectionData.nomineeDetails?.['nomineeDetails.relationWithApplicant'] || ''}
//                                         onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.relationWithApplicant', e.target.value)}
//                                     >
//                                         <MenuItem value="">Select Relation</MenuItem>
//                                         <MenuItem value="FATHER">Father</MenuItem>
//                                         <MenuItem value="MOTHER">Mother</MenuItem>
//                                         <MenuItem value="SPOUSE">Spouse</MenuItem>
//                                         <MenuItem value="SON">Son</MenuItem>
//                                         <MenuItem value="DAUGHTER">Daughter</MenuItem>
//                                         <MenuItem value="BROTHER">Brother</MenuItem>
//                                         <MenuItem value="SISTER">Sister</MenuItem>
//                                         <MenuItem value="GRANDFATHER">Grandfather</MenuItem>
//                                         <MenuItem value="GRANDMOTHER">Grandmother</MenuItem>
//                                         <MenuItem value="UNCLE">Uncle</MenuItem>
//                                         <MenuItem value="AUNT">Aunt</MenuItem>
//                                         <MenuItem value="OTHER">Other</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             ) : (
//                                 <Typography variant="body2">
//                                     {formatValue(getValueByPath(selectedMember, 'nomineeDetails.relationWithApplicant'), 'nomineeDetails.relationWithApplicant')}
//                                 </Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <Typography variant="subtitle2" gutterBottom>
//                                 Introduced By
//                             </Typography>
//                             {isEditing ? (
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     value={sectionData.nomineeDetails?.['nomineeDetails.introduceBy'] || ''}
//                                     onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.introduceBy', e.target.value)}
//                                 />
//                             ) : (
//                                 <Typography variant="body2">
//                                     {formatValue(getValueByPath(selectedMember, 'nomineeDetails.introduceBy'), 'nomineeDetails.introduceBy')}
//                                 </Typography>
//                             )}
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <Typography variant="subtitle2" gutterBottom>
//                                 Membership No
//                             </Typography>
//                             {isEditing ? (
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     value={sectionData.nomineeDetails?.['nomineeDetails.memberShipNo'] || ''}
//                                     onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.memberShipNo', e.target.value)}
//                                 />
//                             ) : (
//                                 <Typography variant="body2">
//                                     {formatValue(getValueByPath(selectedMember, 'nomineeDetails.memberShipNo'), 'nomineeDetails.memberShipNo')}
//                                 </Typography>
//                             )}
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
//         );
//     };

//     if (loading) {
//         return (
//             <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
//                 <CircularProgress />
//                 <Typography sx={{ ml: 2 }}>Loading member details...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                     Error loading member: {error.message || error.toString()}
//                 </Alert>
//                 <Button variant="contained" onClick={() => navigate(-1)}>
//                     Go Back
//                 </Button>
//             </Box>
//         );
//     }

//     if (!selectedMember) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="info">
//                     Member not found.
//                 </Alert>
//                 <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
//                     Go Back
//                 </Button>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ p: 3 }}>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <IconButton onClick={() => navigate(-1)}>
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
//                         Member Details
//                     </Typography>
//                 </Box>
//             </Box>

//             {/* Member Info Summary */}
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Member Name: {getValueByPath(selectedMember, "personalDetails.nameOfMember") || "Unknown Member"}
//                     </Typography>
//                     <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                         <Chip
//                             label={`Membership: ${getValueByPath(selectedMember, "personalDetails.membershipNumber") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Phone: ${getValueByPath(selectedMember, "personalDetails.phoneNo") || "N/A"}`}
//                             variant="outlined"
//                         />
//                         <Chip
//                             label={`Email: ${getValueByPath(selectedMember, "personalDetails.emailId") || "N/A"}`}
//                             variant="outlined"
//                         />
//                     </Box>
//                 </CardContent>
//             </Card>

//             {/* Sections */}
//             {renderPersonalDetails()}
//             {renderAddressDetails()}
//             {renderDocuments()}
//             {renderProfessionalDetails()}
//             {renderFamilyDetails()}
//             {renderNomineeDetails()}

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={4000}
//                 onClose={() => setSnackbarOpen(false)}
//             >
//                 <Alert
//                     onClose={() => setSnackbarOpen(false)}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default MemberDetails;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Alert,
    Chip,
    IconButton,
    Snackbar,
    Divider,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
import { fetchMemberById, clearSelectedMember, updateMember } from "../../features/member/memberSlice";

// Import components
import ImageDisplay from "./ImageDisplay";

// Helper functions
const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const isMissing = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
};

// Image field names array
const imageFields = [
    'addressDetails.permanentAddress.proofDocument',
    'addressDetails.currentResidentalAddress.proofDocument',
    'documents.passportSize',
    'documents.signedPhoto',
    'documents.aadhaarFrontPhoto',
    'documents.aadhaarBackPhoto',
    'documents.panCardPhoto',
    'documents.voterFrontPhoto',
    'documents.voterBackPhoto',
    'documents.passportPhoto',
    'documents.drivingFrontPhoto',
    'documents.drivingBackPhoto',
    'documents.rationFrontPhoto',
    'documents.rationBackPhoto',
    'professionalDetails.serviceDetails.bankStatement',
    'professionalDetails.serviceDetails.monthlySlip',
    'professionalDetails.serviceDetails.idCard',
    'professionalDetails.businessDetails.gstCertificate'
];

// Field mapping
const FIELD_MAP = {
    // Personal Details
    "personalDetails.title": "Title",
    "personalDetails.nameOfMember": "Member Name",
    "personalDetails.membershipNumber": "Membership No",
    "personalDetails.membershipDate": "Membership Date",
    "personalDetails.fatherTitle": "Father's Title",
    "personalDetails.nameOfFather": "Father's Name",
    "personalDetails.motherTitle": "Mother's Title",
    "personalDetails.nameOfMother": "Mother's Name",
    "personalDetails.dateOfBirth": "Date of Birth",
    "personalDetails.ageInYears": "Age (Years)",
    "personalDetails.minor": "Is Minor",
    "personalDetails.gender": "Gender",
    "personalDetails.religion": "Religion",
    "personalDetails.maritalStatus": "Marital Status",
    "personalDetails.spouseTitle": "Spouse Title",
    "personalDetails.nameOfSpouse": "Spouse Name",
    "personalDetails.caste": "Caste",
    "personalDetails.phoneNo": "Phone No",
    "personalDetails.alternatePhoneNo": "Alternate Phone",
    "personalDetails.emailId": "Email",
    "personalDetails.amountInCredit": "Amount In Credit",

    // Address
    "addressDetails.residentType": "Resident Type",
    "addressDetails.permanentAddress.flatHouseNo": "House No",
    "addressDetails.permanentAddress.areaStreetSector": "Area/Street/Sector",
    "addressDetails.permanentAddress.locality": "Locality",
    "addressDetails.permanentAddress.landmark": "Landmark",
    "addressDetails.permanentAddress.city": "City",
    "addressDetails.permanentAddress.state": "State",
    "addressDetails.permanentAddress.pincode": "Pincode",
    "addressDetails.permanentAddress.country": "Country",
    "addressDetails.currentResidentalAddress.flatHouseNo": "House No",
    "addressDetails.currentResidentalAddress.areaStreetSector": "Area/Street/Sector",
    "addressDetails.currentResidentalAddress.locality": "Locality",
    "addressDetails.currentResidentalAddress.landmark": "Landmark",
    "addressDetails.currentResidentalAddress.city": "City",
    "addressDetails.currentResidentalAddress.state": "State",
    "addressDetails.currentResidentalAddress.pincode": "Pincode",
    "addressDetails.currentResidentalAddress.country": "Country",

    // Documents
    "documents.panNo": "PAN No",
    "documents.panCardPhoto": "PAN Card Photo",
    "documents.rationCard": "Ration Card No",
    "documents.rationFrontPhoto": "Ration Card Front",
    "documents.rationBackPhoto": "Ration Card Back",
    "documents.drivingLicense": "Driving License",
    "documents.drivingFrontPhoto": "Driving License Front",
    "documents.drivingBackPhoto": "Driving License Back",
    "documents.aadhaarNo": "Aadhaar No",
    "documents.aadhaarFrontPhoto": "Aadhaar Front",
    "documents.aadhaarBackPhoto": "Aadhaar Back",
    "documents.voterId": "Voter ID",
    "documents.voterFrontPhoto": "Voter ID Front",
    "documents.voterBackPhoto": "Voter ID Back",
    "documents.passportNo": "Passport No",
    "documents.passportPhoto": "Passport Photo",
    "documents.passportSize": "Passport Size Photo",
    "documents.signedPhoto": "Signed Photo",

    // Professional
    "professionalDetails.qualification": "Qualification",
    "professionalDetails.occupation": "Occupation",
    "professionalDetails.degreeNumber": "Degree Number",
    "professionalDetails.inCaseOfServiceGovt": "Government Service",
    "professionalDetails.inCaseOfPrivate": "Private Service",
    "professionalDetails.inCaseOfService": "Service",
    "professionalDetails.serviceType": "Service Type",
    "professionalDetails.inCaseOfBusiness": "Business",

    // Service Details
    "professionalDetails.serviceDetails.fullNameOfCompany": "Company Name",
    "professionalDetails.serviceDetails.department": "Department",
    "professionalDetails.serviceDetails.addressOfCompany": "Company Address",
    "professionalDetails.serviceDetails.monthlyIncome": "Monthly Income",
    "professionalDetails.serviceDetails.designation": "Designation",
    "professionalDetails.serviceDetails.dateOfJoining": "Date of Joining",
    "professionalDetails.serviceDetails.employeeCode": "Employee Code",
    "professionalDetails.serviceDetails.dateOfRetirement": "Date of Retirement",
    "professionalDetails.serviceDetails.officeNo": "Office Phone",
    "professionalDetails.serviceDetails.bankStatement": "Bank Statement",
    "professionalDetails.serviceDetails.monthlySlip": "Monthly Slip",
    "professionalDetails.serviceDetails.idCard": "ID Card",

    // Business Details
    "professionalDetails.businessDetails.fullNameOfCompany": "Business Name",
    "professionalDetails.businessDetails.addressOfCompany": "Business Address",
    "professionalDetails.businessDetails.businessStructure": "Business Structure",
    "professionalDetails.businessDetails.gstCertificate": "GST Certificate",

    // Family
    "familyDetails.familyMembersMemberOfSociety": "Family Members in Society",
    "familyDetails.familyMember.membershipNo": "Membership No",
    "familyDetails.familyMember.name": "Name of Member",
    "familyDetails.familyMember.relation": "Relation with Applicant",

    // Nominee
    "nomineeDetails.nomineeName": "Nominee Name",
    "nomineeDetails.relationWithApplicant": "Relation with Applicant",
    "nomineeDetails.introduceBy": "Introduced By",
    "nomineeDetails.memberShipNo": "Membership No"
};

const MemberDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedMember, loading, error, operationLoading } = useSelector((state) => state.members);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [editingSections, setEditingSections] = useState({});
    const [sectionData, setSectionData] = useState({});

    useEffect(() => {
        if (id) {
            dispatch(fetchMemberById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearSelectedMember());
        };
    }, [dispatch]);

    // Initialize section data when member loads - FIXED VERSION
    useEffect(() => {
        if (selectedMember) {
            const initialData = {};
            Object.keys(FIELD_MAP).forEach(field => {
                const section = field.split('.')[0];
                if (!initialData[section]) initialData[section] = {};
                // Get the actual value from selectedMember
                const value = getValueByPath(selectedMember, field);
                initialData[section][field] = value !== null && value !== undefined ? value : '';
            });
            setSectionData(initialData);
        }
    }, [selectedMember]);

    const toggleSectionEdit = (section) => {
        setEditingSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleFieldChange = (section, fieldKey, value) => {
        setSectionData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [fieldKey]: value
            }
        }));
    };

    // FIXED saveSection function
    const saveSection = async (section) => {
        try {
            const formData = new FormData();
            const sectionFields = sectionData[section];

            // Append all fields with their exact paths
            Object.keys(sectionFields).forEach(fieldKey => {
                const value = sectionFields[fieldKey];
                
                if (imageFields.includes(fieldKey) && value instanceof File) {
                    // Handle file uploads
                    formData.append(fieldKey, value);
                } else {
                    // Handle regular fields - convert to string and append
                    const stringValue = value !== null && value !== undefined ? value.toString() : '';
                    formData.append(fieldKey, stringValue);
                }
            });

            // Debug: log what's being sent
            console.log('Saving section:', section);
            console.log('Section data:', sectionFields);

            await dispatch(updateMember({
                id: selectedMember._id,
                formData: formData
            })).unwrap();

            setSnackbarMessage(`${section.replace('Details', '')} updated successfully!`);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setEditingSections(prev => ({ ...prev, [section]: false }));

            // Refresh the data after a short delay
            setTimeout(() => {
                dispatch(fetchMemberById(id));
            }, 1000);

        } catch (error) {
            console.error('Error updating section:', error);
            setSnackbarMessage(`Error updating section: ${error.message || 'Something went wrong'}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Enhanced formatValue function
    const formatValue = (value, fieldKey) => {
        if (isMissing(value)) {
            return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;
        }

        // Handle image fields
        if (imageFields.includes(fieldKey)) {
            const hasImage = value && (typeof value === 'string' && (value.includes('cloudinary') || value.includes('http')));
            if (hasImage) {
                return (
                    <Box sx={{ mt: 1 }}>
                        <ImageDisplay
                            imageUrl={value}
                            alt={FIELD_MAP[fieldKey]}
                            height={120}
                        />
                    </Box>
                );
            }
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, minHeight: 120, justifyContent: 'center', border: '1px dashed #ccc', borderRadius: 1 }}>
                    <ImageIcon color="disabled" fontSize="small" />
                    <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        No Image
                    </Typography>
                </Box>
            );
        }

        if (typeof value === "boolean") return value ? "Yes" : "No";
        if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "No data";
        return value || "No data";
    };

    // Render Personal Details Section
    const renderPersonalDetails = () => {
        const isEditing = editingSections.personalDetails;
        const fields = [
            ["personalDetails.title", "personalDetails.nameOfMember", "personalDetails.membershipNumber"],
            ["personalDetails.membershipDate", "personalDetails.fatherTitle", "personalDetails.nameOfFather"],
            ["personalDetails.motherTitle", "personalDetails.nameOfMother", "personalDetails.dateOfBirth"],
            ["personalDetails.ageInYears", "personalDetails.minor", "personalDetails.gender"],
            ["personalDetails.religion", "personalDetails.maritalStatus", "personalDetails.spouseTitle"],
            ["personalDetails.nameOfSpouse", "personalDetails.caste", "personalDetails.phoneNo"],
            ["personalDetails.alternatePhoneNo", "personalDetails.emailId", "personalDetails.amountInCredit"]
        ];

        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" color="primary.main">
                            Personal Details
                        </Typography>
                        <Box>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => toggleSectionEdit('personalDetails')}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveSection('personalDetails')}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={operationLoading.update}
                                >
                                    {operationLoading.update ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {fields.map((row, rowIndex) => (
                        <Grid container spacing={2} key={rowIndex} sx={{ mb: 2 }}>
                            {row.map((fieldKey) => {
                                const fieldName = FIELD_MAP[fieldKey];
                                const value = getValueByPath(selectedMember, fieldKey);
                                const missing = isMissing(value);

                                return (
                                    <Grid item xs={12} md={4} key={fieldKey}>
                                        <Paper variant="outlined" sx={{ p: 2 }}>
                                            <Typography variant="subtitle2" color={missing ? "error" : "text.primary"} gutterBottom>
                                                {fieldName}
                                            </Typography>
                                            {isEditing ? (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={sectionData.personalDetails?.[fieldKey] || ''}
                                                    onChange={(e) => handleFieldChange('personalDetails', fieldKey, e.target.value)}
                                                />
                                            ) : (
                                                <Typography variant="body2">
                                                    {formatValue(value, fieldKey)}
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ))}
                </CardContent>
            </Card>
        );
    };

    // Render Address Details Section
    const renderAddressDetails = () => {
        const isEditing = editingSections.addressDetails;
        const residentType = getValueByPath(selectedMember, 'addressDetails.residentType') || 'owned';

        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" color="primary.main">
                            Address Details
                        </Typography>
                        <Box>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => toggleSectionEdit('addressDetails')}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveSection('addressDetails')}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={operationLoading.update}
                                >
                                    {operationLoading.update ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {/* Resident Type Dropdown */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Resident Type</InputLabel>
                                <Select
                                    value={isEditing ? (sectionData.addressDetails?.['addressDetails.residentType'] || residentType) : residentType}
                                    label="Resident Type"
                                    onChange={(e) => handleFieldChange('addressDetails', 'addressDetails.residentType', e.target.value)}
                                    disabled={!isEditing}
                                >
                                    <MenuItem value="owned">Owned</MenuItem>
                                    <MenuItem value="rented">Rented</MenuItem>
                                    <MenuItem value="company">Company Provided</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Current Address */}
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Current Residential Address
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Address Fields - 8 columns */}
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {[
                                    ['addressDetails.currentResidentalAddress.flatHouseNo', 'addressDetails.currentResidentalAddress.areaStreetSector'],
                                    ['addressDetails.currentResidentalAddress.locality', 'addressDetails.currentResidentalAddress.landmark'],
                                    ['addressDetails.currentResidentalAddress.city', 'addressDetails.currentResidentalAddress.state'],
                                    ['addressDetails.currentResidentalAddress.pincode', 'addressDetails.currentResidentalAddress.country']
                                ].map((row, rowIndex) => (
                                    <Grid container spacing={2} key={rowIndex}>
                                        {row.map((fieldKey) => (
                                            <Grid item xs={12} md={6} key={fieldKey}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    {FIELD_MAP[fieldKey]}
                                                </Typography>
                                                {isEditing ? (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        value={sectionData.addressDetails?.[fieldKey] || ''}
                                                        onChange={(e) => handleFieldChange('addressDetails', fieldKey, e.target.value)}
                                                    />
                                                ) : (
                                                    <Typography variant="body2">
                                                        {formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        
                        {/* Proof Document - 4 columns */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" gutterBottom>
                                Proof Document
                            </Typography>
                            {formatValue(getValueByPath(selectedMember, 'addressDetails.currentResidentalAddress.proofDocument'), 'addressDetails.currentResidentalAddress.proofDocument')}
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Permanent Address */}
                    <Typography variant="h6" gutterBottom>
                        Permanent Address
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {[
                                    ['addressDetails.permanentAddress.flatHouseNo', 'addressDetails.permanentAddress.areaStreetSector'],
                                    ['addressDetails.permanentAddress.locality', 'addressDetails.permanentAddress.landmark'],
                                    ['addressDetails.permanentAddress.city', 'addressDetails.permanentAddress.state'],
                                    ['addressDetails.permanentAddress.pincode', 'addressDetails.permanentAddress.country']
                                ].map((row, rowIndex) => (
                                    <Grid container spacing={2} key={rowIndex}>
                                        {row.map((fieldKey) => (
                                            <Grid item xs={12} md={6} key={fieldKey}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    {FIELD_MAP[fieldKey]}
                                                </Typography>
                                                {isEditing ? (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        value={sectionData.addressDetails?.[fieldKey] || ''}
                                                        onChange={(e) => handleFieldChange('addressDetails', fieldKey, e.target.value)}
                                                    />
                                                ) : (
                                                    <Typography variant="body2">
                                                        {formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" gutterBottom>
                                Proof Document
                            </Typography>
                            {formatValue(getValueByPath(selectedMember, 'addressDetails.permanentAddress.proofDocument'), 'addressDetails.permanentAddress.proofDocument')}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    // Render Documents Section
    const renderDocuments = () => {
        const isEditing = editingSections.documents;
        const documentRows = [
            [{}, 'documents.passportSize', 'documents.signedPhoto'],
            ['documents.aadhaarNo', 'documents.aadhaarFrontPhoto', 'documents.aadhaarBackPhoto'],
            ['documents.panNo', 'documents.panCardPhoto', {}],
            ['documents.voterId', 'documents.voterFrontPhoto', 'documents.voterBackPhoto'],
            ['documents.passportNo', 'documents.passportPhoto', {}],
            ['documents.drivingLicense', 'documents.drivingFrontPhoto', 'documents.drivingBackPhoto'],
            ['documents.rationCard', 'documents.rationFrontPhoto', 'documents.rationBackPhoto']
        ];

        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" color="primary.main">
                            Identity Documents
                        </Typography>
                        <Box>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => toggleSectionEdit('documents')}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveSection('documents')}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={operationLoading.update}
                                >
                                    {operationLoading.update ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {documentRows.map((row, rowIndex) => (
                        <Grid container spacing={2} key={rowIndex} sx={{ mb: 3 }}>
                            {row.map((fieldKey, colIndex) => (
                                <Grid item xs={12} md={4} key={`${rowIndex}-${colIndex}`}>
                                    {fieldKey && FIELD_MAP[fieldKey] ? (
                                        <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {FIELD_MAP[fieldKey]}
                                            </Typography>
                                            {isEditing && !imageFields.includes(fieldKey) ? (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={sectionData.documents?.[fieldKey] || ''}
                                                    onChange={(e) => handleFieldChange('documents', fieldKey, e.target.value)}
                                                />
                                            ) : (
                                                formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)
                                            )}
                                        </Paper>
                                    ) : (
                                        <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }}>
                                            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                                -
                                            </Typography>
                                        </Paper>
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </CardContent>
            </Card>
        );
    };

    // Render Professional Details Section
    const renderProfessionalDetails = () => {
        const isEditing = editingSections.professionalDetails;
        const isService = getValueByPath(selectedMember, 'professionalDetails.inCaseOfServiceGovt') || 
                         getValueByPath(selectedMember, 'professionalDetails.inCaseOfPrivate');
        const isBusiness = getValueByPath(selectedMember, 'professionalDetails.inCaseOfBusiness');

        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" color="primary.main">
                            Professional Details
                        </Typography>
                        <Box>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => toggleSectionEdit('professionalDetails')}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveSection('professionalDetails')}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={operationLoading.update}
                                >
                                    {operationLoading.update ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {/* Basic Professional Fields */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {['professionalDetails.qualification', 'professionalDetails.occupation', 'professionalDetails.degreeNumber'].map((fieldKey) => (
                            <Grid item xs={12} md={4} key={fieldKey}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {FIELD_MAP[fieldKey]}
                                </Typography>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={sectionData.professionalDetails?.[fieldKey] || ''}
                                        onChange={(e) => handleFieldChange('professionalDetails', fieldKey, e.target.value)}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)}
                                    </Typography>
                                )}
                            </Grid>
                        ))}
                    </Grid>

                    {/* Service Type Selection */}
                    {isEditing && (
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={sectionData.professionalDetails?.['professionalDetails.inCaseOfServiceGovt'] || false}
                                            onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.inCaseOfServiceGovt', e.target.checked)}
                                        />
                                    }
                                    label="Government Service"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={sectionData.professionalDetails?.['professionalDetails.inCaseOfPrivate'] || false}
                                            onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.inCaseOfPrivate', e.target.checked)}
                                        />
                                    }
                                    label="Private Service"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={sectionData.professionalDetails?.['professionalDetails.inCaseOfBusiness'] || false}
                                            onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.inCaseOfBusiness', e.target.checked)}
                                        />
                                    }
                                    label="Business"
                                />
                            </Grid>
                        </Grid>
                    )}

                    {/* Service Details */}
                    {(isService || (isEditing && (sectionData.professionalDetails?.['professionalDetails.inCaseOfServiceGovt'] || sectionData.professionalDetails?.['professionalDetails.inCaseOfPrivate']))) && (
                        <>
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                Service Details
                            </Typography>
                            {[
                                ['professionalDetails.serviceDetails.fullNameOfCompany', 'professionalDetails.serviceDetails.department', 'professionalDetails.serviceDetails.addressOfCompany'],
                                ['professionalDetails.serviceDetails.monthlyIncome', 'professionalDetails.serviceDetails.designation', 'professionalDetails.serviceDetails.dateOfJoining'],
                                ['professionalDetails.serviceDetails.employeeCode', 'professionalDetails.serviceDetails.dateOfRetirement', 'professionalDetails.serviceDetails.officeNo'],
                                ['professionalDetails.serviceDetails.bankStatement', 'professionalDetails.serviceDetails.monthlySlip', 'professionalDetails.serviceDetails.idCard']
                            ].map((row, rowIndex) => (
                                <Grid container spacing={2} key={rowIndex} sx={{ mb: 2 }}>
                                    {row.map((fieldKey) => (
                                        <Grid item xs={12} md={4} key={fieldKey}>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {FIELD_MAP[fieldKey]}
                                            </Typography>
                                            {isEditing ? (
                                                imageFields.includes(fieldKey) ? (
                                                    <input
                                                        type="file"
                                                        accept="image/*,application/pdf"
                                                        onChange={(e) => handleFieldChange('professionalDetails', fieldKey, e.target.files[0])}
                                                    />
                                                ) : (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        value={sectionData.professionalDetails?.[fieldKey] || ''}
                                                        onChange={(e) => handleFieldChange('professionalDetails', fieldKey, e.target.value)}
                                                    />
                                                )
                                            ) : (
                                                formatValue(getValueByPath(selectedMember, fieldKey), fieldKey)
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            ))}
                        </>
                    )}

                    {/* Business Details */}
                    {(isBusiness || (isEditing && sectionData.professionalDetails?.['professionalDetails.inCaseOfBusiness'])) && (
                        <>
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                Business Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Business Name
                                    </Typography>
                                    {isEditing ? (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={sectionData.professionalDetails?.['professionalDetails.businessDetails.fullNameOfCompany'] || ''}
                                            onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.businessDetails.fullNameOfCompany', e.target.value)}
                                        />
                                    ) : (
                                        <Typography variant="body2">
                                            {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.fullNameOfCompany'), 'professionalDetails.businessDetails.fullNameOfCompany')}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Business Address
                                    </Typography>
                                    {isEditing ? (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={sectionData.professionalDetails?.['professionalDetails.businessDetails.addressOfCompany'] || ''}
                                            onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.businessDetails.addressOfCompany', e.target.value)}
                                        />
                                    ) : (
                                        <Typography variant="body2">
                                            {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.addressOfCompany'), 'professionalDetails.businessDetails.addressOfCompany')}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Business Structure
                                    </Typography>
                                    {isEditing ? (
                                        <FormControl fullWidth size="small">
                                            <Select
                                                value={sectionData.professionalDetails?.['professionalDetails.businessDetails.businessStructure'] || ''}
                                                onChange={(e) => handleFieldChange('professionalDetails', 'professionalDetails.businessDetails.businessStructure', e.target.value)}
                                            >
                                                <MenuItem value="">Select Business Structure</MenuItem>
                                                <MenuItem value="INDIVIDUAL">Individual</MenuItem>
                                                <MenuItem value="PROPRIETORSHIP">Proprietorship</MenuItem>
                                                <MenuItem value="PARTNERSHIP">Partnership</MenuItem>
                                                <MenuItem value="LLP">LLP</MenuItem>
                                                <MenuItem value="PVT_LTD">Private Limited</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <Typography variant="body2">
                                            {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.businessStructure'), 'professionalDetails.businessDetails.businessStructure')}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        GST Certificate
                                    </Typography>
                                    {formatValue(getValueByPath(selectedMember, 'professionalDetails.businessDetails.gstCertificate'), 'professionalDetails.businessDetails.gstCertificate')}
                                </Grid>
                            </Grid>
                        </>
                    )}
                </CardContent>
            </Card>
        );
    };

    // FIXED Render Family Details Section
    const renderFamilyDetails = () => {
        const isEditing = editingSections.familyDetails;
        const hasFamilyMembers = getValueByPath(selectedMember, 'familyDetails.familyMembersMemberOfSociety');

        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" color="primary.main">
                            Family Details
                        </Typography>
                        <Box>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => toggleSectionEdit('familyDetails')}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveSection('familyDetails')}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={operationLoading.update}
                                >
                                    {operationLoading.update ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isEditing ? (sectionData.familyDetails?.['familyDetails.familyMembersMemberOfSociety'] || false) : hasFamilyMembers}
                                onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMembersMemberOfSociety', e.target.checked)}
                                disabled={!isEditing}
                            />
                        }
                        label="Any family member a member of the society?"
                    />

                    {(hasFamilyMembers || (isEditing && sectionData.familyDetails?.['familyDetails.familyMembersMemberOfSociety'])) && (
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Membership No
                                </Typography>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={sectionData.familyDetails?.['familyDetails.familyMember.membershipNo'] || ''}
                                        onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMember.membershipNo', e.target.value)}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {formatValue(getValueByPath(selectedMember, 'familyDetails.familyMember.membershipNo'), 'familyDetails.familyMember.membershipNo')}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Name of Member
                                </Typography>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={sectionData.familyDetails?.['familyDetails.familyMember.name'] || ''}
                                        onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMember.name', e.target.value)}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {formatValue(getValueByPath(selectedMember, 'familyDetails.familyMember.name'), 'familyDetails.familyMember.name')}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Relation with Applicant
                                </Typography>
                                {isEditing ? (
                                    <FormControl fullWidth size="small">
                                        <Select
                                            value={sectionData.familyDetails?.['familyDetails.familyMember.relation'] || ''}
                                            onChange={(e) => handleFieldChange('familyDetails', 'familyDetails.familyMember.relation', e.target.value)}
                                        >
                                            <MenuItem value="">Select Relation</MenuItem>
                                            <MenuItem value="FATHER">Father</MenuItem>
                                            <MenuItem value="MOTHER">Mother</MenuItem>
                                            <MenuItem value="SPOUSE">Spouse</MenuItem>
                                            <MenuItem value="SON">Son</MenuItem>
                                            <MenuItem value="DAUGHTER">Daughter</MenuItem>
                                            <MenuItem value="BROTHER">Brother</MenuItem>
                                            <MenuItem value="SISTER">Sister</MenuItem>
                                            <MenuItem value="GRANDFATHER">Grandfather</MenuItem>
                                            <MenuItem value="GRANDMOTHER">Grandmother</MenuItem>
                                            <MenuItem value="UNCLE">Uncle</MenuItem>
                                            <MenuItem value="AUNT">Aunt</MenuItem>
                                            <MenuItem value="OTHER">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Typography variant="body2">
                                        {formatValue(getValueByPath(selectedMember, 'familyDetails.familyMember.relation'), 'familyDetails.familyMember.relation')}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Render Nominee Details Section
    const renderNomineeDetails = () => {
        const isEditing = editingSections.nomineeDetails;

        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" color="primary.main">
                            Nominee Details
                        </Typography>
                        <Box>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => toggleSectionEdit('nomineeDetails')}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveSection('nomineeDetails')}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={operationLoading.update}
                                >
                                    {operationLoading.update ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Nominee Name
                            </Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={sectionData.nomineeDetails?.['nomineeDetails.nomineeName'] || ''}
                                    onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.nomineeName', e.target.value)}
                                />
                            ) : (
                                <Typography variant="body2">
                                    {formatValue(getValueByPath(selectedMember, 'nomineeDetails.nomineeName'), 'nomineeDetails.nomineeName')}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Relation with Applicant
                            </Typography>
                            {isEditing ? (
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={sectionData.nomineeDetails?.['nomineeDetails.relationWithApplicant'] || ''}
                                        onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.relationWithApplicant', e.target.value)}
                                    >
                                        <MenuItem value="">Select Relation</MenuItem>
                                        <MenuItem value="FATHER">Father</MenuItem>
                                        <MenuItem value="MOTHER">Mother</MenuItem>
                                        <MenuItem value="SPOUSE">Spouse</MenuItem>
                                        <MenuItem value="SON">Son</MenuItem>
                                        <MenuItem value="DAUGHTER">Daughter</MenuItem>
                                        <MenuItem value="BROTHER">Brother</MenuItem>
                                        <MenuItem value="SISTER">Sister</MenuItem>
                                        <MenuItem value="GRANDFATHER">Grandfather</MenuItem>
                                        <MenuItem value="GRANDMOTHER">Grandmother</MenuItem>
                                        <MenuItem value="UNCLE">Uncle</MenuItem>
                                        <MenuItem value="AUNT">Aunt</MenuItem>
                                        <MenuItem value="OTHER">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Typography variant="body2">
                                    {formatValue(getValueByPath(selectedMember, 'nomineeDetails.relationWithApplicant'), 'nomineeDetails.relationWithApplicant')}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Introduced By
                            </Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={sectionData.nomineeDetails?.['nomineeDetails.introduceBy'] || ''}
                                    onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.introduceBy', e.target.value)}
                                />
                            ) : (
                                <Typography variant="body2">
                                    {formatValue(getValueByPath(selectedMember, 'nomineeDetails.introduceBy'), 'nomineeDetails.introduceBy')}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Membership No
                            </Typography>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={sectionData.nomineeDetails?.['nomineeDetails.memberShipNo'] || ''}
                                    onChange={(e) => handleFieldChange('nomineeDetails', 'nomineeDetails.memberShipNo', e.target.value)}
                                />
                            ) : (
                                <Typography variant="body2">
                                    {formatValue(getValueByPath(selectedMember, 'nomineeDetails.memberShipNo'), 'nomineeDetails.memberShipNo')}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    if (loading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading member details...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading member: {error.message || error.toString()}
                </Alert>
                <Button variant="contained" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }

    if (!selectedMember) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="info">
                    Member not found.
                </Alert>
                <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
                        Member Details
                    </Typography>
                </Box>
            </Box>

            {/* Member Info Summary */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Member Name: {getValueByPath(selectedMember, "personalDetails.nameOfMember") || "Unknown Member"}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip
                            label={`Membership: ${getValueByPath(selectedMember, "personalDetails.membershipNumber") || "N/A"}`}
                            variant="outlined"
                        />
                        <Chip
                            label={`Phone: ${getValueByPath(selectedMember, "personalDetails.phoneNo") || "N/A"}`}
                            variant="outlined"
                        />
                        <Chip
                            label={`Email: ${getValueByPath(selectedMember, "personalDetails.emailId") || "N/A"}`}
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Sections */}
            {renderPersonalDetails()}
            {renderAddressDetails()}
            {renderDocuments()}
            {renderProfessionalDetails()}
            {renderFamilyDetails()}
            {renderNomineeDetails()}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MemberDetails;