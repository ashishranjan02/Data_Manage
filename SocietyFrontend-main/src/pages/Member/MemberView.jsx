import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box
} from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { FIELD_MAP, getValueByPath, isMissing, formatValueForUI } from "./MemberDetail"; 

const MemberView = ({ member, open, onClose, onSave, onDelete, loading }) => {
  const [activeView, setActiveView] = useState("all");

  if (!member) return null;

  const filteredFields = Object.keys(FIELD_MAP).filter((key) => {
    const value = getValueByPath(member, key);
    const missing = isMissing(value);

    if (activeView === "all") return true;
    if (activeView === "missing") return missing;
    if (activeView === "filled") return !missing;
    return true;
  });

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Member Details – {member?.personalDetails?.nameOfMember}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "#f9f9f9" }}>
        {/* View type buttons */}
        <Box display="flex" gap={2} mb={2}>
          <Button
            variant={activeView === "all" ? "contained" : "outlined"}
            onClick={() => setActiveView("all")}
          >
            All Fields
          </Button>
          <Button
            variant={activeView === "filled" ? "contained" : "outlined"}
            onClick={() => setActiveView("filled")}
          >
            Filled
          </Button>
          <Button
            variant={activeView === "missing" ? "contained" : "outlined"}
            onClick={() => setActiveView("missing")}
            color="error"
          >
            Missing
          </Button>
        </Box>

        <Grid container spacing={2}>
          {filteredFields.map((key) => {
            const label = FIELD_MAP[key];
            const value = getValueByPath(member, key);
            const missing = isMissing(value);

            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: missing ? "error.main" : "success.main",
                    bgcolor: missing ? "#fff5f5" : "#f5fff5"
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      {missing ? (
                        <ErrorOutlineIcon color="error" />
                      ) : (
                        <CheckCircleOutlineIcon color="success" />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={missing ? "error" : "success"}
                      >
                        {label}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                      {formatValueForUI(value)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {filteredFields.length === 0 && (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="text.secondary">
              No fields match this filter
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => onDelete(member._id)}
          color="error"
          disabled={loading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberView;
