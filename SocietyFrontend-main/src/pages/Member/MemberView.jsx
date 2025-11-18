// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Box,
//     Button,
//     Typography,
//     Stack,
//     Grid,
//     Card,
//     CardContent,
//     CircularProgress,
//     Alert,
//     IconButton,
//     Snackbar,
//     Tabs,
//     Tab,
//     Chip,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PrintIcon from "@mui/icons-material/Print";

// import {
//     fetchMemberById,
//     clearError
// } from "../../features/member/memberSlice";
// import  {FIELD_MAP} from "./MemberDetail";
// import {getValueByPath} from "./MemberDetail"


// const isMissing = (value) => {
//     if (value === undefined || value === null) return true;
//     if (typeof value === "string") return value.trim() === "";
//     if (Array.isArray(value)) return value.length === 0;
//     if (typeof value === "object") return Object.keys(value).length === 0;
//     return false;
// };

// const formatValue = (value) => {
//     if (isMissing(value)) return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;

//     if (typeof value === "string" && (value.startsWith('http') || value.startsWith('https'))) {
//         return (
//             <Box>
//                 <img
//                     src={value}
//                     alt="Document"
//                     style={{
//                         maxWidth: '100px',
//                         maxHeight: '100px',
//                         borderRadius: '4px',
//                         border: '1px solid #ddd'
//                     }}
//                 />
//                 <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
//                     <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
//                         View Full Image
//                     </a>
//                 </Typography>
//             </Box>
//         );
//     }

//     if (Array.isArray(value)) {
//         if (value.length > 0 && typeof value[0] === 'object') {
//             return (
//                 <Box>
//                     {value.map((item, index) => (
//                         <Card key={index} variant="outlined" sx={{ mb: 1, p: 1 }}>
//                             {Object.entries(item).map(([key, val]) => (
//                                 <Typography key={key} variant="body2">
//                                     <strong>{key}:</strong> {formatSingleValue(val)}
//                                 </Typography>
//                             ))}
//                         </Card>
//                     ))}
//                 </Box>
//             );
//         }
//         return value.join(", ");
//     }

//     if (typeof value === "object" && value !== null && !(value instanceof Date)) {
//         return Object.entries(value).map(([k, v]) => (
//             <div key={k}><strong>{k}:</strong> {formatValue(v)}</div>
//         ));
//     }

//     if (typeof value === "boolean") return value ? "Yes" : "No";
//     return value?.toString() || "";
// };

// const formatSingleValue = (value) => {
//     if (isMissing(value)) return 'Missing';
//     if (typeof value === "string" && (value.startsWith('http') || value.startsWith('https'))) {
//         return "Image Available";
//     }
//     if (Array.isArray(value)) return value.join(", ");
//     if (typeof value === "object") return JSON.stringify(value);
//     if (typeof value === "boolean") return value ? "Yes" : "No";
//     return value?.toString() || "";
// };

// export default function MemberViewPage() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const { selectedMember, loading, error } = useSelector(state => state.members);
//     const [viewType, setViewType] = useState('all');
//     const [snackbarOpen, setSnackbarOpen] = useState(false);

//     useEffect(() => {
//         if (id) {
//             dispatch(fetchMemberById(id));
//         }
//     }, [dispatch, id]);

//     useEffect(() => {
//         if (error) {
//             setSnackbarOpen(true);
//         }
//     }, [error]);

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//         dispatch(clearError());
//     };

//     const handleEdit = () => {
//         navigate(`/member/edit/${id}`);
//     };

//     const handleBack = () => {
//         navigate('/memberdetail');
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (!selectedMember) {
//         return (
//             <Box p={3}>
//                 <Alert severity="error">Member not found</Alert>
//             </Box>
//         );
//     }

//     const filteredFields = Object.keys(FIELD_MAP).filter(fieldKey => {
//         const value = getValueByPath(selectedMember, fieldKey);
//         const missing = isMissing(value);

//         if (viewType === 'all') return true;
//         if (viewType === 'missing') return missing;
//         if (viewType === 'filled') return !missing;
//         return true;
//     });

//     const missingCount = Object.keys(FIELD_MAP).filter(f => isMissing(getValueByPath(selectedMember, f))).length;
//     const filledCount = Object.keys(FIELD_MAP).length - missingCount;

//     // Group fields by category for better organization
//     const fieldCategories = {
//         personal: Object.keys(FIELD_MAP).filter(f => f.startsWith('personalDetails')),
//         address: Object.keys(FIELD_MAP).filter(f => f.startsWith('addressDetails')),
//         reference: Object.keys(FIELD_MAP).filter(f => f.startsWith('referenceDetails')),
//         documents: Object.keys(FIELD_MAP).filter(f => f.startsWith('documents')),
//         professional: Object.keys(FIELD_MAP).filter(f => f.startsWith('professionalDetails')),
//         family: Object.keys(FIELD_MAP).filter(f => f.startsWith('familyDetails')),
//         bank: Object.keys(FIELD_MAP).filter(f => f.startsWith('bankDetails')),
//         guarantee: Object.keys(FIELD_MAP).filter(f => f.startsWith('guaranteeDetails')),
//         loan: Object.keys(FIELD_MAP).filter(f => f.startsWith('loanDetails')),
//     };

//     return (
//         <Box p={3}>
//             {/* Header */}
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//                 <Box display="flex" alignItems="center" gap={2}>
//                     <IconButton onClick={handleBack} color="primary">
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Box>
//                         <Typography variant="h4" fontWeight="bold" color="primary">
//                             {getValueByPath(selectedMember, "personalDetails.nameOfMember") || "Unknown Member"}
//                         </Typography>
//                         <Typography variant="subtitle1" color="text.secondary">
//                             Membership No: {getValueByPath(selectedMember, "personalDetails.membershipNumber") || "N/A"}
//                         </Typography>
//                     </Box>
//                 </Box>
//                 <Stack direction="row" spacing={2}>
//                     <Button
//                         startIcon={<PrintIcon />}
//                         variant="outlined"
//                         onClick={handlePrint}
//                     >
//                         Print
//                     </Button>
//                     <Button
//                         startIcon={<EditIcon />}
//                         variant="contained"
//                         onClick={handleEdit}
//                     >
//                         Edit Member
//                     </Button>
//                 </Stack>
//             </Box>

//             {/* Tabs */}
//             <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//                 <Tabs value={viewType} onChange={(e, newValue) => setViewType(newValue)}>
//                     <Tab value="all" label={
//                         <Box display="flex" alignItems="center" gap={1}>
//                             <Typography>All Fields</Typography>
//                             <Chip label={Object.keys(FIELD_MAP).length} size="small" variant="outlined" />
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

//             {/* Content with Accordions */}
//             {viewType === 'all' ? (
//                 // All Fields View with Categories
//                 <Box>
//                     {/* Personal Details */}
//                     <Accordion defaultExpanded>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography variant="h6" color="primary">
//                                 Personal Details
//                             </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Grid container spacing={2}>
//                                 {fieldCategories.personal.map((fieldKey) => {
//                                     const fieldName = FIELD_MAP[fieldKey];
//                                     const value = getValueByPath(selectedMember, fieldKey);
//                                     const missing = isMissing(value);

//                                     return (
//                                         <Grid item xs={12} sm={6} md={4} key={fieldKey}>
//                                             <Card variant="outlined" sx={{
//                                                 borderColor: missing ? 'error.main' : 'success.main',
//                                                 backgroundColor: missing ? '#fff5f5' : '#f5fff5',
//                                                 height: '100%'
//                                             }}>
//                                                 <CardContent sx={{ p: 2 }}>
//                                                     <Box display="flex" alignItems="center" gap={1} mb={1}>
//                                                         {missing ? (
//                                                             <ErrorOutlineIcon color="error" fontSize="small" />
//                                                         ) : (
//                                                             <CheckCircleOutlineIcon color="success" fontSize="small" />
//                                                         )}
//                                                         <Typography variant="subtitle2" color={missing ? "error" : "success"}>
//                                                             {fieldName}
//                                                         </Typography>
//                                                     </Box>
//                                                     <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
//                                                         {formatValue(value)}
//                                                     </Typography>
//                                                 </CardContent>
//                                             </Card>
//                                         </Grid>
//                                     );
//                                 })}
//                             </Grid>
//                         </AccordionDetails>
//                     </Accordion>

//                     {/* Address Details */}
//                     <Accordion>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography variant="h6" color="primary">
//                                 Address Details
//                             </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Grid container spacing={2}>
//                                 {fieldCategories.address.map((fieldKey) => {
//                                     const fieldName = FIELD_MAP[fieldKey];
//                                     const value = getValueByPath(selectedMember, fieldKey);
//                                     const missing = isMissing(value);

//                                     return (
//                                         <Grid item xs={12} sm={6} md={4} key={fieldKey}>
//                                             <Card variant="outlined" sx={{
//                                                 borderColor: missing ? 'error.main' : 'success.main',
//                                                 backgroundColor: missing ? '#fff5f5' : '#f5fff5',
//                                                 height: '100%'
//                                             }}>
//                                                 <CardContent sx={{ p: 2 }}>
//                                                     <Box display="flex" alignItems="center" gap={1} mb={1}>
//                                                         {missing ? (
//                                                             <ErrorOutlineIcon color="error" fontSize="small" />
//                                                         ) : (
//                                                             <CheckCircleOutlineIcon color="success" fontSize="small" />
//                                                         )}
//                                                         <Typography variant="subtitle2" color={missing ? "error" : "success"}>
//                                                             {fieldName}
//                                                         </Typography>
//                                                     </Box>
//                                                     <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
//                                                         {formatValue(value)}
//                                                     </Typography>
//                                                 </CardContent>
//                                             </Card>
//                                         </Grid>
//                                     );
//                                 })}
//                             </Grid>
//                         </AccordionDetails>
//                     </Accordion>

//                     {/* Add more accordions for other categories similarly */}
//                     {/* Reference Details */}
//                     <Accordion>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography variant="h6" color="primary">
//                                 Reference & Guarantor Details
//                             </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Grid container spacing={2}>
//                                 {fieldCategories.reference.map((fieldKey) => (
//                                     <Grid item xs={12} sm={6} key={fieldKey}>
//                                         <Card variant="outlined" sx={{ height: '100%' }}>
//                                             <CardContent sx={{ p: 2 }}>
//                                                 <Typography variant="subtitle2" color="primary" gutterBottom>
//                                                     {FIELD_MAP[fieldKey]}
//                                                 </Typography>
//                                                 <Typography variant="body2">
//                                                     {formatValue(getValueByPath(selectedMember, fieldKey))}
//                                                 </Typography>
//                                             </CardContent>
//                                         </Card>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </AccordionDetails>
//                     </Accordion>

//                     {/* Continue with other categories... */}

//                 </Box>
//             ) : (
//                 // Tabbed View (Missing/Filled)
//                 <Grid container spacing={2}>
//                     {filteredFields.map((fieldKey) => {
//                         const fieldName = FIELD_MAP[fieldKey];
//                         const value = getValueByPath(selectedMember, fieldKey);
//                         const missing = isMissing(value);

//                         return (
//                             <Grid item xs={12} sm={6} md={4} key={fieldKey}>
//                                 <Card variant="outlined" sx={{
//                                     borderColor: missing ? 'error.main' : 'success.main',
//                                     backgroundColor: missing ? '#fff5f5' : '#f5fff5',
//                                     height: '100%'
//                                 }}>
//                                     <CardContent sx={{ p: 2 }}>
//                                         <Box display="flex" alignItems="center" gap={1} mb={1}>
//                                             {missing ? (
//                                                 <ErrorOutlineIcon color="error" fontSize="small" />
//                                             ) : (
//                                                 <CheckCircleOutlineIcon color="success" fontSize="small" />
//                                             )}
//                                             <Typography variant="subtitle2" color={missing ? "error" : "success"}>
//                                                 {fieldName}
//                                             </Typography>
//                                         </Box>
//                                         <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
//                                             {formatValue(value)}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         );
//                     })}

//                     {filteredFields.length === 0 && (
//                         <Grid item xs={12}>
//                             <Box sx={{ textAlign: 'center', py: 4 }}>
//                                 <Typography variant="h6" color="text.secondary">
//                                     {viewType === 'missing'
//                                         ? "🎉 No missing fields found! All data is complete."
//                                         : "No filled fields found!"}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                     )}
//                 </Grid>
//             )}

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
//                     {error}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// }

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box
} from "@mui/material";
import  {FIELD_MAP} from "./MemberDetail";
import {getValueByPath} from "./MemberDetail"

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


const isMissing = (value) => {
  if (value === null || value === undefined) return true;
  if (value === "" || value === "N/A") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
};

/* -----------------------------------------------------
   FORMAT SIMPLE VALUE
----------------------------------------------------- */
const formatSingleValue = (value) => {
  if (isMissing(value)) return "Missing";

  if (typeof value === "string" && value.startsWith("http"))
    return "Image Available";

  if (Array.isArray(value)) return value.join(", ");

  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (typeof value === "object") return JSON.stringify(value);

  return value?.toString() || "";
};

/* -----------------------------------------------------
   UNIVERSAL FORMATTER
----------------------------------------------------- */
const formatValue = (value) => {
  if (isMissing(value))
    return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;

  // IMAGE URL
  if (typeof value === "string" && value.startsWith("http")) {
    return (
      <Box>
        <img
          src={value}
          alt="Document"
          style={{
            maxWidth: "120px",
            maxHeight: "120px",
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}
        />
        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#1976d2" }}
          >
            View Full Image
          </a>
        </Typography>
      </Box>
    );
  }

  // ARRAY OF OBJECTS (e.g., Loan Details, Guarantees)
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === "object") {
      return (
        <Box>
          {value.map((item, i) => (
            <Card key={i} variant="outlined" sx={{ mb: 1, p: 1 }}>
              {Object.entries(item).map(([k, v]) => (
                <Typography key={k} variant="body2">
                  <strong>{k}:</strong> {formatSingleValue(v)}
                </Typography>
              ))}
            </Card>
          ))}
        </Box>
      );
    }
    return value.join(", ");
  }

  // OBJECT LITERAL
  if (typeof value === "object") {
    return Object.entries(value).map(([k, v]) => (
      <div key={k}>
        <strong>{k}:</strong> {formatValue(v)}
      </div>
    ));
  }

  // BOOLEAN
  if (typeof value === "boolean") return value ? "Yes" : "No";

  return value?.toString() || "";
};

/* -----------------------------------------------------
   MAIN MEMBER VIEW COMPONENT
----------------------------------------------------- */
const MemberView = ({ member, formData, viewType }) => {
  if (!member) return null;

  /* FILTER FIELDS BASED ON VIEW TYPE */
  const filteredFields = Object.keys(FIELD_MAP).filter((fieldKey) => {
    const value = getValueByPath(formData, fieldKey);
    const missing = isMissing(value);

    if (viewType === "all") return true;
    if (viewType === "missing") return missing;
    if (viewType === "filled") return !missing;

    return true;
  });

  return (
    <Grid container spacing={2}>
      {filteredFields.map((fieldKey) => {
        const fieldName = FIELD_MAP[fieldKey];
        const value = getValueByPath(formData, fieldKey);
        const missing = isMissing(value);

        return (
          <Grid item xs={12} sm={6} md={4} key={fieldKey}>
            <Card
              variant="outlined"
              sx={{
                borderColor: missing ? "error.main" : "success.main",
                backgroundColor: missing ? "#fff5f5" : "#f5fff5",
                height: "100%"
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  {missing ? (
                    <ErrorOutlineIcon color="error" fontSize="small" />
                  ) : (
                    <CheckCircleOutlineIcon color="success" fontSize="small" />
                  )}
                  <Typography
                    variant="subtitle2"
                    color={missing ? "error" : "success"}
                  >
                    {fieldName}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {formatValue(value)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}

      {/* EMPTY MESSAGE */}
      {filteredFields.length === 0 && (
        <Grid item xs={12}>
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              {viewType === "missing"
                ? "No missing fields found!"
                : "No filled fields found!"}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default MemberView;

