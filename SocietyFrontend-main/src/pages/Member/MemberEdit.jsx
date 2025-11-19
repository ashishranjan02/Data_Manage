import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tabs,
  Tab,
  Stack,
  Grid,
  Card,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { fetchAllMembers, updateMember } from "../../features/member/memberSlice";
import { getValueByPath, setValueByPath, FIELD_MAP, isMissing } from "./MemberDetail";


export default function MemberEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { members, loading } = useSelector(state => state.members);
  const [form, setForm] = useState(null);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  useEffect(() => {
    const m = members.find(mem => mem._id === id);
    if (m) {
      setForm(m);
      setOpenView(true); // Opens MemberView dialog automatically
    }
  }, [members, id]);

  if (!form)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  const handleSave = (updatedData) => {
    dispatch(updateMember({ id, formData: updatedData }));
    navigate("/");
  };

  const handleDelete = (id) => {
    console.log("DELETE called", id);
  };

  return (
    <>
      <MemberView
        member={form}
        open={openView}
        onClose={() => navigate("/")}
        onSave={handleSave}
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}

const EditableField = ({ label, value, path, onUpdate, type = "text", options = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onUpdate(path, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        {label}
      </Typography>

      {isEditing ? (
        type === "select" ? (
          <FormControl fullWidth size="small">
            <Select
              value={editValue || ''}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              autoFocus
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            size="small"
            autoFocus
            type={type}
            value={editValue || ''}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
          />
        )
      ) : (
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              border: "1px solid #1976d2",
              backgroundColor: "#f0f8ff"
            }
          }}
          onClick={() => setIsEditing(true)}
        >
          <Typography variant="body2">
            {isMissing(value)
              ? <span style={{ color: "red" }}>Not set</span>
              : value?.toString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


const EditableObjectField = ({ label, value, path, onUpdate, fields }) => {
  const handleFieldUpdate = (fieldKey, fieldValue) => {
    const updated = { ...(value || {}), [fieldKey]: fieldValue };
    onUpdate(path, updated);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" color="primary">{label}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          {fields.map(field => (
            <Grid item xs={12} sm={6} key={field.key}>
              <EditableField
                label={field.label}
                value={value?.[field.key] || ""}
                path={field.key}
                onUpdate={handleFieldUpdate}
                type={field.type || "text"}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};


const MemberView = ({ member, open, onClose, onSave, onDelete, loading }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(member);

  useEffect(() => {
    setFormData(member);
  }, [member]);

  const handleFieldUpdate = (path, value) => {
    setFormData(prev => setValueByPath(prev, path, value));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Edit Member - {member?.personalDetails?.nameOfMember}</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {/* PERSONAL DETAILS */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="primary">Personal Details</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={2}>
              {Object.keys(FIELD_MAP)
                .filter(f => f.startsWith("personalDetails"))
                .map(key => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <EditableField
                      label={FIELD_MAP[key]}
                      value={getValueByPath(formData, key)}
                      path={key}
                      onUpdate={handleFieldUpdate}
                    />
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* ADDRESS SECTION */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="primary">Address Details</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <EditableObjectField
              label="Permanent Address"
              value={getValueByPath(formData, "addressDetails.permanentAddress")}
              path="addressDetails.permanentAddress"
              onUpdate={handleFieldUpdate}
              fields={[
                { key: "flatHouseNo", label: "Flat/House No" },
                { key: "areaStreetSector", label: "Street/Sector" },
                { key: "locality", label: "Locality" },
                { key: "city", label: "City" },
                { key: "state", label: "State" },
                { key: "country", label: "Country" },
                { key: "pincode", label: "Pincode" }
              ]}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}
          disabled={loading}
          onClick={() => onSave(formData)}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
