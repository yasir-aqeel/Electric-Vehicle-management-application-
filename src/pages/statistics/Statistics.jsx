/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import EvStationIcon from "@mui/icons-material/EvStation";
import EuroIcon from "@mui/icons-material/Euro";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./Statistics.scss";

const kpis = [
  {
    label: "Energy delivered",
    value: "18.6 MWh",
    trend: "+12.4%",
    icon: BoltIcon,
    tone: "green",
  },
  {
    label: "Active sessions",
    value: "1,284",
    trend: "+8.1%",
    icon: EvStationIcon,
    tone: "blue",
  },
  {
    label: "Fleet SOC average",
    value: "74%",
    trend: "+4.6%",
    icon: BatteryChargingFullIcon,
    tone: "teal",
  },
  {
    label: "Gross revenue",
    value: "EUR 42.8k",
    trend: "+15.8%",
    icon: EuroIcon,
    tone: "amber",
  },
];

const weeklyEnergy = [
  { day: "Mon", energy: 72, revenue: 48 },
  { day: "Tue", energy: 84, revenue: 58 },
  { day: "Wed", energy: 68, revenue: 51 },
  { day: "Thu", energy: 91, revenue: 67 },
  { day: "Fri", energy: 78, revenue: 61 },
  { day: "Sat", energy: 96, revenue: 74 },
  { day: "Sun", energy: 88, revenue: 69 },
];

const stations = [
  { name: "Autohof Lutterberg", city: "Staufenberg", sessions: 328, utilization: 86, status: "Online" },
  { name: "Solarpark Schauenburg", city: "Kassel", sessions: 284, utilization: 72, status: "Online" },
  { name: "Depot Nord", city: "Hannover", sessions: 219, utilization: 64, status: "Service" },
  { name: "Logistics Hub East", city: "Leipzig", sessions: 187, utilization: 58, status: "Online" },
];

const fleetHealth = [
  { label: "Available", value: 64, color: "#2E7D5B" },
  { label: "Charging", value: 22, color: "#0F766E" },
  { label: "In transport", value: 9, color: "#2563EB" },
  { label: "Maintenance", value: 5, color: "#D97706" },
];

const alerts = [
  { title: "Connector B-14 temperature high", time: "10 min ago", level: "Critical" },
  { title: "Depot Nord charger needs inspection", time: "42 min ago", level: "Service" },
  { title: "E-Pack EP-091 returned below target SOC", time: "1h ago", level: "Review" },
];

const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <Paper className={`stat-card stat-card--${item.tone}`} elevation={0}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography className="stat-card__label">{item.label}</Typography>
          <Typography className="stat-card__value">{item.value}</Typography>
        </Box>
        <Box className="stat-card__icon">
          <Icon fontSize="small" />
        </Box>
      </Stack>
      <Chip
        size="small"
        icon={<TrendingUpIcon />}
        label={`${item.trend} vs last week`}
        className="stat-card__chip"
      />
    </Paper>
  );
};

const Statistics = () => {
  return (
    <Box className="statistics-page">
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        gap={2}
        className="statistics-page__header"
      >
        <Box>
          <Typography className="statistics-page__eyebrow">Fleet analytics</Typography>
          <Typography variant="h2" className="statistics-page__title">
            Charging network overview
          </Typography>
          <Typography className="statistics-page__subtitle">
            Demo operating data for stations, E-Packs, revenue, utilization, and alerts.
          </Typography>
        </Box>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Button variant="outlined">Last 7 days</Button>
          <Button variant="contained" color="secondary">Export report</Button>
        </Stack>
      </Stack>

      <Grid container spacing={2.5}>
        {kpis.map((item) => (
          <Grid item xs={12} sm={6} lg={3} key={item.label}>
            <StatCard item={item} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} className="statistics-page__content">
        <Grid item xs={12} lg={8}>
          <Paper className="analytics-panel" elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
              <Box>
                <Typography variant="h4">Energy and revenue trend</Typography>
                <Typography className="panel-muted">MWh delivered and revenue index by day</Typography>
              </Box>
              <Chip label="Peak 96%" color="success" variant="outlined" />
            </Stack>

            <Box className="bar-chart" aria-label="Weekly energy and revenue bars">
              {weeklyEnergy.map((item) => (
                <Box className="bar-chart__group" key={item.day}>
                  <Box className="bar-chart__bars">
                    <Box className="bar-chart__bar bar-chart__bar--energy" sx={{ height: `${item.energy}%` }} />
                    <Box className="bar-chart__bar bar-chart__bar--revenue" sx={{ height: `${item.revenue}%` }} />
                  </Box>
                  <Typography className="bar-chart__label">{item.day}</Typography>
                </Box>
              ))}
            </Box>

            <Stack direction="row" gap={2} className="chart-legend">
              <span><i className="legend-dot legend-dot--energy" /> Energy delivered</span>
              <span><i className="legend-dot legend-dot--revenue" /> Revenue</span>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper className="analytics-panel fleet-panel" elevation={0}>
            <Typography variant="h4">Fleet health</Typography>
            <Typography className="panel-muted">Current E-Pack distribution</Typography>
            <Box className="fleet-ring">
              <Box className="fleet-ring__center">
                <Typography>128</Typography>
                <span>E-Packs</span>
              </Box>
            </Box>
            <Stack gap={1.5}>
              {fleetHealth.map((item) => (
                <Stack key={item.label} direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <span className="fleet-dot" style={{ backgroundColor: item.color }} />
                    <Typography>{item.label}</Typography>
                  </Stack>
                  <Typography fontWeight={800}>{item.value}%</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Paper className="analytics-panel" elevation={0}>
            <Typography variant="h4">Top station utilization</Typography>
            <Typography className="panel-muted">Sessions and charger load by location</Typography>
            <Stack gap={2} mt={2}>
              {stations.map((station) => (
                <Box key={station.name} className="station-row">
                  <Stack direction="row" justifyContent="space-between" gap={2}>
                    <Box>
                      <Typography fontWeight={800}>{station.name}</Typography>
                      <Typography className="panel-muted">{station.city} - {station.sessions} sessions</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={station.status}
                      color={station.status === "Online" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={station.utilization}
                    className="station-row__progress"
                  />
                  <Typography className="station-row__value">{station.utilization}% utilization</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper className="analytics-panel alerts-panel" elevation={0}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h4">Operational alerts</Typography>
                <Typography className="panel-muted">Dummy events for visual review</Typography>
              </Box>
              <WarningAmberIcon color="warning" />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack gap={1.5}>
              {alerts.map((alert) => (
                <Box className="alert-item" key={alert.title}>
                  <Stack direction="row" justifyContent="space-between" gap={2}>
                    <Typography fontWeight={800}>{alert.title}</Typography>
                    <Chip size="small" label={alert.level} />
                  </Stack>
                  <Typography className="panel-muted">{alert.time}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
