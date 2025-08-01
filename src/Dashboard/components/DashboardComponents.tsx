import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  alpha,
  useTheme,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  MoreVert,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

// Standardized Dashboard Card Component
export const DashboardCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({
  title,
  value,
  subtitle,
  icon,
  color = "#EEBA2B",
  trend,
  trendValue,
  onClick,
  children,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              borderColor: alpha(color, 0.3),
            }
          : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontWeight: 500,
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "0.75rem",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                mb: subtitle ? 0.5 : 2,
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: "#64748b", mb: 2 }}>
                {subtitle}
              </Typography>
            )}
            {trend && trendValue && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {trend === "up" ? (
                  <TrendingUp sx={{ fontSize: 16, color: "#10b981" }} />
                ) : trend === "down" ? (
                  <TrendingDown sx={{ fontSize: 16, color: "#ef4444" }} />
                ) : null}
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      trend === "up"
                        ? "#10b981"
                        : trend === "down"
                        ? "#ef4444"
                        : "#64748b",
                    fontWeight: 600,
                  }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
            {children}
          </Box>
          {icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                backgroundColor: alpha(color, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// Standardized Page Header Component
export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}> = ({ title, subtitle, action, breadcrumbs }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && <Box sx={{ mb: 2 }}>{breadcrumbs}</Box>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: subtitle ? 1 : 0,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: "#64748b" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && <Box>{action}</Box>}
      </Box>
      <Divider sx={{ mt: 3, borderColor: "#e2e8f0" }} />
    </Box>
  );
};

// Standardized Data Table Component
export const DataTable: React.FC<{
  headers: string[];
  rows: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  customActions?: (row: any) => React.ReactNode;
  emptyMessage?: string;
}> = ({
  headers,
  rows,
  onEdit,
  onDelete,
  onView,
  customActions,
  emptyMessage = "No data available",
}) => {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    borderBottom: "1px solid #e2e8f0",
                    py: 2,
                  }}
                >
                  {header}
                </TableCell>
              ))}
              {(onEdit || onDelete || onView || customActions) && (
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    borderBottom: "1px solid #e2e8f0",
                    py: 2,
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    headers.length +
                    (onEdit || onDelete || onView || customActions ? 1 : 0)
                  }
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha("#EEBA2B", 0.04),
                    },
                  }}
                >
                  {Object.values(row).map((cell: any, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{ borderBottom: "1px solid #e2e8f0" }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete || onView || customActions) && (
                    <TableCell sx={{ borderBottom: "1px solid #e2e8f0" }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {onView && (
                          <IconButton
                            size="small"
                            onClick={() => onView(row.id)}
                            sx={{
                              color: "#6366f1",
                              "&:hover": {
                                backgroundColor: alpha("#6366f1", 0.1),
                              },
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        )}
                        {onEdit && (
                          <IconButton
                            size="small"
                            onClick={() => onEdit(row.id)}
                            sx={{
                              color: "#EEBA2B",
                              "&:hover": {
                                backgroundColor: alpha("#EEBA2B", 0.1),
                              },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            onClick={() => onDelete(row.id)}
                            sx={{
                              color: "#ef4444",
                              "&:hover": {
                                backgroundColor: alpha("#ef4444", 0.1),
                              },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        )}
                        {customActions && customActions(row)}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Standardized Status Chip Component
export const StatusChip: React.FC<{
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
}> = ({ status, variant = "default" }) => {
  const getColor = () => {
    switch (variant) {
      case "success":
        return { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" };
      case "warning":
        return { bg: "#fef3c7", color: "#92400e", border: "#fde68a" };
      case "error":
        return { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" };
      case "info":
        return { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" };
      default:
        return { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
    }
  };

  const colors = getColor();

  return (
    <Chip
      label={status.toUpperCase()}
      size="small"
      sx={{
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        fontWeight: 600,
        fontSize: "0.75rem",
        letterSpacing: "0.025em",
      }}
    />
  );
};

// Standardized Action Button Component
export const ActionButton: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled,
  startIcon,
  endIcon,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: "linear-gradient(135deg, #EEBA2B 0%, #FFE533 100%)",
          color: "#000",
          "&:hover": {
            background: "linear-gradient(135deg, #FFE533 0%, #EEBA2B 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(238, 186, 43, 0.3)",
          },
        };
      case "secondary":
        return {
          backgroundColor: "#f1f5f9",
          color: "#475569",
          border: "1px solid #e2e8f0",
          "&:hover": {
            backgroundColor: "#e2e8f0",
            transform: "translateY(-1px)",
          },
        };
      case "danger":
        return {
          backgroundColor: "#ef4444",
          color: "white",
          "&:hover": {
            backgroundColor: "#dc2626",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
          },
        };
      case "success":
        return {
          backgroundColor: "#10b981",
          color: "white",
          "&:hover": {
            backgroundColor: "#059669",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
          },
        };
      default:
        return {};
    }
  };

  return (
    <Button
      variant="contained"
      size={size}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        ...getVariantStyles(),
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        transition: "all 0.3s ease",
        "&:disabled": {
          backgroundColor: "#f1f5f9",
          color: "#94a3b8",
        },
      }}
    >
      {children}
    </Button>
  );
};

// Standardized Progress Card Component
export const ProgressCard: React.FC<{
  title: string;
  current: number;
  total: number;
  color?: string;
  subtitle?: string;
}> = ({ title, current, total, color = "#EEBA2B", subtitle }) => {
  const percentage = (current / total) * 100;

  return (
    <DashboardCard
      title={title}
      value={`${current}/${total}`}
      subtitle={subtitle}
    >
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {percentage.toFixed(1)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: alpha(color, 0.1),
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
              borderRadius: 4,
            },
          }}
        />
      </Box>
    </DashboardCard>
  );
};
