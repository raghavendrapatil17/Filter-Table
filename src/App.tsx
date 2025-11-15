import { useMemo, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  ThemeProvider,
  createTheme,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Popover,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  IosShare as IosShareIcon,
  FilterAlt as FilterAltIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@mui/icons-material";

type AccountStatus = "NEW" | "ASSIGNED" | "ONBOARDING" | "IN_REVIEW";

interface AccountRecord {
  id: string;
  accountName: string;
  accountId: string;
  status: AccountStatus;
  contacts: number;
  services: number;
  servicesNames: string;
  workflows: number;
  spoc: string;
}

const INDIAN_FIRST_NAMES = [
  "Rajesh",
  "Priya",
  "Amit",
  "Kavita",
  "Vikram",
  "Anjali",
  "Rahul",
  "Sneha",
  "Arjun",
  "Divya",
  "Karan",
  "Meera",
  "Siddharth",
  "Pooja",
  "Rohan",
  "Neha",
  "Aditya",
  "Shreya",
  "Varun",
  "Ananya",
  "Kunal",
  "Isha",
  "Nikhil",
  "Riya",
  "Sahil",
  "Tanvi",
  "Manish",
  "Kritika",
  "Abhishek",
  "Swati",
  "Gaurav",
  "Nisha",
  "Harsh",
  "Aishwarya",
  "Yash",
  "Deepika",
  "Ravi",
  "Sakshi",
  "Akash",
  "Pallavi",
  "Vivek",
  "Jyoti",
  "Suresh",
  "Monika",
  "Pankaj",
  "Richa",
  "Dinesh",
  "Kiran",
  "Manoj",
  "Sunita",
  "Ashok",
  "Lakshmi",
  "Sandeep",
  "Geeta",
  "Naveen",
  "Madhu",
  "Vinod",
  "Sarita",
  "Ajay",
  "Rekha",
  "Sanjay",
  "Uma",
  "Mahesh",
  "Kamala",
  "Jitendra",
  "Radha",
  "Bharat",
  "Sita",
  "Chandan",
  "Ganga",
  "Devendra",
  "Parvati",
];

const INDIAN_LAST_NAMES = [
  "Sharma",
  "Patel",
  "Kumar",
  "Singh",
  "Reddy",
  "Gupta",
  "Mehta",
  "Verma",
  "Agarwal",
  "Jain",
  "Malhotra",
  "Chopra",
  "Kapoor",
  "Bansal",
  "Shah",
  "Joshi",
  "Desai",
  "Nair",
  "Iyer",
  "Rao",
  "Pillai",
  "Menon",
  "Narayan",
  "Krishnan",
  "Srinivasan",
  "Venkatesh",
  "Raman",
  "Subramanian",
  "Murthy",
  "Swamy",
  "Prasad",
  "Ravi",
];

const INDIAN_SPOC_NAMES = [
  "Rajesh Kumar (CPA)",
  "Priya Sharma",
  "Amit Patel",
  "Kavita Reddy",
  "Vikram Singh",
  "Anjali Gupta",
  "Rahul Mehta",
  "Sneha Verma",
  "Arjun Agarwal",
  "Divya Jain",
  "Karan Malhotra",
  "Meera Chopra",
  "Siddharth Kapoor",
  "Pooja Bansal",
  "Rohan Shah",
  "Neha Joshi",
  "Aditya Desai",
  "Shreya Nair",
  "Varun Iyer",
  "Ananya Rao",
  "Kunal Pillai",
  "Isha Menon",
  "Nikhil Narayan",
  "Riya Krishnan",
  "Sahil Srinivasan",
  "Tanvi Venkatesh",
  "Manish Raman",
  "Kritika Subramanian",
  "Abhishek Murthy",
  "Swati Swamy",
  "Gaurav Prasad",
  "Nisha Ravi",
  "Harsh Kumar",
  "Aishwarya Sharma",
  "Yash Patel",
  "Deepika Reddy",
  "Ravi Singh",
  "Sakshi Gupta",
  "Akash Mehta",
  "Pallavi Verma",
  "Vivek Agarwal",
  "Jyoti Jain",
  "Suresh Malhotra",
  "Monika Chopra",
  "Pankaj Kapoor",
  "Richa Bansal",
  "Dinesh Shah",
  "Kiran Joshi",
  "Manoj Desai",
  "Sunita Nair",
  "Ashok Iyer",
  "Lakshmi Rao",
  "Sandeep Pillai",
  "Geeta Menon",
  "Naveen Narayan",
  "Madhu Krishnan",
  "Vinod Srinivasan",
  "Sarita Venkatesh",
  "Ajay Raman",
  "Rekha Subramanian",
  "Sanjay Murthy",
  "Uma Swamy",
  "Mahesh Prasad",
  "Kamala Ravi",
  "Jitendra Kumar",
  "Radha Sharma",
  "Bharat Patel",
  "Sita Reddy",
  "Chandan Singh",
  "Ganga Gupta",
  "Devendra Mehta",
  "Parvati Verma",
  "N/A",
];

const statuses: AccountStatus[] = [
  "NEW",
  "ASSIGNED",
  "ONBOARDING",
  "IN_REVIEW",
];

const SERVICE_NAMES = [
  "Cloud Infrastructure",
  "Data Analytics",
  "Security Services",
  "Database Management",
  "Web Development",
  "Mobile App Development",
  "DevOps Services",
  "API Integration",
  "Business Intelligence",
  "Customer Support",
  "Project Management",
  "Quality Assurance",
  "Network Services",
  "Backup & Recovery",
  "Monitoring & Logging",
  "Content Management",
  "E-commerce Solutions",
  "Machine Learning",
  "AI Services",
  "Consulting Services",
];

// Generate random services for an account
const generateRandomServices = (index: number): string => {
  const numServices = (index % 4) + 1; // 1-4 services
  const selectedServices: string[] = [];
  const availableServices = [...SERVICE_NAMES];
  
  for (let i = 0; i < numServices; i++) {
    const serviceIndex = (index * 7 + i * 11) % availableServices.length;
    const service = availableServices[serviceIndex];
    if (!selectedServices.includes(service)) {
      selectedServices.push(service);
    }
  }
  
  return selectedServices.join(", ");
};

// Generate 80 unique accounts with Indian names
const generateInitialAccounts = (): AccountRecord[] => {
  return Array.from({ length: 80 }, (_, index) => {
    const firstNameIndex = index % INDIAN_FIRST_NAMES.length;
    const lastNameIndex =
      Math.floor(index / INDIAN_FIRST_NAMES.length) % INDIAN_LAST_NAMES.length;
    const accountName = `${INDIAN_FIRST_NAMES[firstNameIndex]} ${INDIAN_LAST_NAMES[lastNameIndex]}`;

    // Generate unique account ID
    const accountIdNum = 1000 + index;
    const accountId = `ACC${accountIdNum.toString().padStart(4, "0")}`;

    // Random SPOC (some will be N/A)
    const spocIndex = (index * 7) % INDIAN_SPOC_NAMES.length;
    const spoc = INDIAN_SPOC_NAMES[spocIndex];

    // Distribute statuses evenly
    const status = statuses[index % statuses.length];

    // Generate random but varied numbers for contacts, services, workflows
    const contacts = (index % 7) + Math.floor(index / 10);
    const services = (index % 6) + 1;
    const workflows = index % 5;
    const servicesNames = generateRandomServices(index);

    return {
      id: `account-${index + 1}`,
      accountName,
      accountId,
      status,
      contacts: Math.min(contacts, 10),
      services: Math.min(services, 8),
      servicesNames,
      workflows: Math.min(workflows, 6),
      spoc,
    };
  });
};

type SortKey = keyof Pick<
  AccountRecord,
  | "accountName"
  | "accountId"
  | "status"
  | "contacts"
  | "services"
  | "servicesNames"
  | "workflows"
  | "spoc"
>;

type FilterKey = 
  | "accountName"
  | "accountId"
  | "status"
  | "contacts"
  | "services"
  | "servicesNames"
  | "workflows"
  | "spoc";


interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}

const pageSizeOptions = [10, 25, 50, 100];

const statusLabels: Record<AccountStatus, string> = {
  NEW: "New",
  ASSIGNED: "Assigned",
  ONBOARDING: "Onboarding",
  IN_REVIEW: "In review",
};

const normalize = (value: string) => value.toLowerCase().trim();

// Material UI Theme with Azure Blue
const theme = createTheme({
  palette: {
    primary: {
      main: "#0078d4",
      dark: "#005a9e",
      light: "#40a9ff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [accounts, setAccounts] = useState<AccountRecord[]>(
    generateInitialAccounts()
  );
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Map<FilterKey, Set<string>>>(new Map());
  const [showForm, setShowForm] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedAccountIds, setSelectedAccountIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedFilterField, setSelectedFilterField] = useState<FilterKey | null>(null);
  const [showMainFilterDropdown, setShowMainFilterDropdown] = useState<boolean>(false);
  const [showSubFilterDropdown, setShowSubFilterDropdown] = useState<boolean>(false);
  const [mainFilterAnchorEl, setMainFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [subFilterAnchorEl, setSubFilterAnchorEl] = useState<null | HTMLElement>(null);


  // Get unique values for a field from all accounts
  const getAvailableValues = (field: FilterKey): string[] => {
    const values = new Set<string>();
    accounts.forEach((row) => {
      const value = String(row[field]);
      if (field === "servicesNames") {
        // Split services by comma and add each service
        value.split(",").forEach((service) => {
          const trimmed = service.trim();
          if (trimmed) values.add(trimmed);
        });
      } else {
        values.add(value);
      }
    });
    return Array.from(values).sort();
  };

  const filteredData = useMemo(() => {
    const normalizedTerm = normalize(searchTerm);

    return accounts.filter((row) => {
      // Search across all fields
      const matchesSearch = !normalizedTerm || 
        normalize(row.accountName).includes(normalizedTerm) ||
        normalize(row.accountId).includes(normalizedTerm) ||
        normalize(row.status).includes(normalizedTerm) ||
        normalize(String(row.contacts)).includes(normalizedTerm) ||
        normalize(String(row.services)).includes(normalizedTerm) ||
        normalize(row.servicesNames).includes(normalizedTerm) ||
        normalize(String(row.workflows)).includes(normalizedTerm) ||
        normalize(row.spoc).includes(normalizedTerm);

      // Apply all active filters
      let matchesFilters = true;
      filters.forEach((filterValues, field) => {
        if (filterValues.size > 0) {
          if (field === "servicesNames") {
            // Check if any of the row's services match the filter
            const rowServices = row.servicesNames.split(",").map(s => s.trim());
            const matches = rowServices.some(service => filterValues.has(service));
            if (!matches) matchesFilters = false;
          } else {
            const rowValue = String(row[field]);
            if (!filterValues.has(rowValue)) matchesFilters = false;
          }
        }
      });

      return matchesSearch && matchesFilters;
    });
  }, [accounts, searchTerm, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return filteredData;
    }

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return sorted;
  }, [filteredData, sortConfig]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(pageIndex, pageCount - 1);
  const pageItems = sortedData.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const toggleSort = (key: SortKey) => {
    setPageIndex(0);
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) {
        return { key, direction: "asc" };
      }

      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }

      return null;
    });
  };

  const handleExport = () => {
    // If no accounts are selected, export all filtered/sorted data
    // Otherwise, export only selected accounts
    const accountsToExport =
      selectedAccountIds.size > 0
        ? sortedData.filter((account) => selectedAccountIds.has(account.id))
        : sortedData;

    if (accountsToExport.length === 0) {
      return;
    }

    const worksheet = utils.json_to_sheet(
      accountsToExport.map(
        ({
          accountName,
          accountId,
          status,
          contacts,
          services,
          servicesNames,
          workflows,
          spoc,
        }) => ({
          "Account Name": accountName,
          "Account ID": accountId,
          Status: statusLabels[status],
          Contacts: contacts,
          "Services Count": services,
          Services: servicesNames,
          "Workflows and Teams": workflows,
          SPOC: spoc,
        })
      )
    );
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Accounts");
    writeFile(workbook, "accounts.xlsx");
  };

  const handleCheckboxChange = (accountId: string) => {
    setSelectedAccountIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(accountId)) {
        newSet.delete(accountId);
      } else {
        newSet.add(accountId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all accounts on current page
      const allPageIds = new Set(pageItems.map((item) => item.id));
      setSelectedAccountIds((prev) => new Set([...prev, ...allPageIds]));
    } else {
      // Deselect all accounts on current page
      const pageIds = new Set(pageItems.map((item) => item.id));
      setSelectedAccountIds((prev) => {
        const newSet = new Set(prev);
        pageIds.forEach((id) => newSet.delete(id));
        return newSet;
      });
    }
  };

  const isAllPageSelected =
    pageItems.length > 0 &&
    pageItems.every((item) => selectedAccountIds.has(item.id));
  const isSomePageSelected = pageItems.some((item) =>
    selectedAccountIds.has(item.id)
  );

  const handleAddAccount = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      return;
    }

    const newAccountId = `ACC${(1000 + accounts.length)
      .toString()
      .padStart(4, "0")}`;
    const spocIndex = (accounts.length * 7) % INDIAN_SPOC_NAMES.length;
    const statusIndex = accounts.length % statuses.length;

    const newAccount: AccountRecord = {
      id: `account-${accounts.length + 1}`,
      accountName: `${firstName.trim()} ${lastName.trim()}`,
      accountId: newAccountId,
      status: statuses[statusIndex],
      contacts: 0,
      services: 0,
      servicesNames: generateRandomServices(accounts.length),
      workflows: 0,
      spoc: INDIAN_SPOC_NAMES[spocIndex],
    };

    setAccounts([...accounts, newAccount]);
    setFirstName("");
    setLastName("");
    setShowForm(false);
    setShowToast(true);
    setPageIndex(0);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFirstName("");
    setLastName("");
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = Number.parseInt(event.target.value, 10);
    setPageSize(newSize);
    setPageIndex(0);
  };

  const goToPage = (nextIndex: number) => {
    setPageIndex(Math.min(Math.max(nextIndex, 0), pageCount - 1));
  };

  const renderSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5, opacity: 0.7, color: "white" }} />;
    }

    return sortConfig.direction === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: 16, ml: 0.5, color: "white" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: 16, ml: 0.5, color: "white" }} />
    );
  };

  const handleFilterChange = (field: FilterKey, value: string, checked: boolean) => {
    setPageIndex(0);
    setFilters((prev) => {
      const newFilters = new Map(prev);
      if (!newFilters.has(field)) {
        newFilters.set(field, new Set());
      }
      const fieldFilters = new Set(newFilters.get(field)!);
      if (checked) {
        fieldFilters.add(value);
      } else {
        fieldFilters.delete(value);
      }
      if (fieldFilters.size === 0) {
        newFilters.delete(field);
      } else {
        newFilters.set(field, fieldFilters);
      }
      return newFilters;
    });
  };

  const clearFilter = (field: FilterKey) => {
    setPageIndex(0);
    setFilters((prev) => {
      const newFilters = new Map(prev);
      newFilters.delete(field);
      return newFilters;
    });
    // Only remove the selected field if we're clearing it and it has no filters
    if (selectedFilterField === field) {
      setSelectedFilterField(null);
      setShowSubFilterDropdown(false);
      setSubFilterAnchorEl(null);
    }
  };

  const clearAllFilters = () => {
    setPageIndex(0);
    setFilters(new Map());
    setSelectedFilterField(null);
    setShowSubFilterDropdown(false);
  };

  const selectAllFilterValues = (field: FilterKey) => {
    setPageIndex(0);
    const allValues = new Set(getAvailableValues(field));
    setFilters((prev) => {
      const newFilters = new Map(prev);
      newFilters.set(field, allValues);
      return newFilters;
    });
  };

  const handleMainFilterSelect = (field: FilterKey) => {
    setSelectedFilterField(field);
    setShowMainFilterDropdown(false);
    setMainFilterAnchorEl(null);
    // Auto-open sub filter - we'll set the anchor when the button renders
    setShowSubFilterDropdown(true);
  };

  const getFilterLabel = (field: FilterKey): string => {
    const labels: Record<FilterKey, string> = {
      accountName: "Account Name",
      accountId: "Account ID",
      status: "Status",
      contacts: "Contacts",
      services: "Services (Count)",
      servicesNames: "Services",
      workflows: "Workflows",
      spoc: "SPOC",
    };
    return labels[field];
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 2,
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            flexWrap: "wrap",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddAccount}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add Account
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "stretch", sm: "flex-end" },
              flex: 1,
              width: { xs: "100%", sm: "auto" },
              minWidth: { xs: "100%", sm: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 2 },
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: { xs: "stretch", sm: "flex-end" },
              }}
            >
              <TextField
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setPageIndex(0);
                }}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
                }}
                size="small"
                sx={{ minWidth: { xs: "100%", sm: 140 }, flex: { xs: "1 1 100%", sm: "0 0 auto" } }}
              />
              {/* Main Filter Dropdown */}
              <Box sx={{ position: "relative", width: { xs: "100%", sm: "auto" } }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={(e) => {
                    setMainFilterAnchorEl(e.currentTarget);
                    setShowMainFilterDropdown(true);
                    setShowSubFilterDropdown(false);
                  }}
                  sx={{
                    minWidth: { xs: "100%", sm: 140 },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {selectedFilterField ? getFilterLabel(selectedFilterField) : "Filter"}
                </Button>
                <Menu
                  open={showMainFilterDropdown}
                  onClose={() => {
                    setShowMainFilterDropdown(false);
                    setMainFilterAnchorEl(null);
                  }}
                  anchorEl={mainFilterAnchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("accountName");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Account Name
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("accountId");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Account ID
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("status");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Status
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("contacts");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Contacts
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("services");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Services (Count)
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("servicesNames");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Services
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("workflows");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    Workflows
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMainFilterSelect("spoc");
                      setMainFilterAnchorEl(null);
                    }}
                  >
                    SPOC
                  </MenuItem>
                </Menu>
              </Box>
              {/* Sub Filter Dropdown */}
              {selectedFilterField && (
                <Box sx={{ position: "relative", width: { xs: "100%", sm: "auto" } }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterAltIcon />}
                    ref={(node) => {
                      // Set anchor when button is rendered and sub filter should auto-open
                      if (node && showSubFilterDropdown && !subFilterAnchorEl) {
                        setSubFilterAnchorEl(node);
                      }
                    }}
                    onClick={(e) => {
                      setSubFilterAnchorEl(e.currentTarget);
                      setShowSubFilterDropdown(true);
                    }}
                    sx={{
                      minWidth: { xs: "100%", sm: 140 },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {(() => {
                      const selectedCount = filters.get(selectedFilterField)?.size || 0;
                      const totalCount = getAvailableValues(selectedFilterField).length;
                      if (selectedCount === 0) {
                        return ` Select ${getFilterLabel(selectedFilterField)}`;
                      } else if (selectedCount === totalCount) {
                        return `All (${totalCount})`;
                      } else {
                        return `${selectedCount} selected`;
                      }
                    })()}
                  </Button>
                  <Popover
                    open={showSubFilterDropdown}
                    onClose={() => {
                      setShowSubFilterDropdown(false);
                      setSubFilterAnchorEl(null);
                    }}
                    anchorEl={subFilterAnchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    PaperProps={{
                      sx: { maxHeight: 400, minWidth: 280, maxWidth: 400, mt: 0.5 },
                    }}
                  >
                    <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: 1,
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={500}>
                          Filter by {getFilterLabel(selectedFilterField)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setShowSubFilterDropdown(false);
                            setSubFilterAnchorEl(null);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ maxHeight: 300, overflow: "auto", p: 1 }}>
                      {getAvailableValues(selectedFilterField).length > 0 ? (
                        getAvailableValues(selectedFilterField).map((value) => {
                          const isChecked =
                            filters.get(selectedFilterField)?.has(value) || false;
                        return (
                            <FormControlLabel
                              key={value}
                              control={
                                <Checkbox
                              checked={isChecked}
                              onChange={(e) =>
                                    handleFilterChange(
                                      selectedFilterField,
                                      value,
                                      e.target.checked
                                    )
                                  }
                                  size="small"
                                />
                              }
                              label={value}
                              sx={{ display: "flex", width: "100%", m: 0 }}
                            />
                        );
                      })
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
                          No values available
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        p: 1,
                        borderTop: 1,
                        borderColor: "divider",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => selectAllFilterValues(selectedFilterField)}
                      >
                        Select All
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          clearFilter(selectedFilterField);
                          setShowSubFilterDropdown(false);
                          setSubFilterAnchorEl(null);
                        }}
                      >
                        Clear All
                      </Button>
                    </Box>
                  </Popover>
                </Box>
              )}
              <Button
                variant="outlined"
                startIcon={<IosShareIcon />}
                onClick={handleExport}
                sx={{
                  minWidth: { xs: "100%", sm: 140 },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Export
              </Button>
            </Box>
            {filters.size > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 1,
                  mb: 1,
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
              {Array.from(filters.entries()).map(([field, values]) => (
                  <Chip
                    key={field}
                    label={`${getFilterLabel(field)}: ${Array.from(values).slice(0, 2).join(", ")}${
                      values.size > 2 ? ` +${values.size - 2}` : ""
                    }`}
                    onDelete={() => clearFilter(field)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
              ))}
              {filters.size > 1 && (
                  <Button size="small" variant="outlined" onClick={clearAllFilters}>
                  Clear All
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }} />

        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            boxShadow: 2,
            overflow: "auto",
            maxHeight: "100%",
          }}
        >
          <Table stickyHeader sx={{ width: "100%" }}>
            <TableHead sx={{ bgcolor: "#1b4e83" }}>
              <TableRow>
                <TableCell padding="checkbox" sx={{ bgcolor: "#1b4e83" }}>
                  <Checkbox
                    checked={isAllPageSelected}
                    indeterminate={isSomePageSelected && !isAllPageSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    size="small"
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                      "&.MuiCheckbox-indeterminate": {
                        color: "white",
                      },
                    }}
                  />
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("accountName")}
                  sx={{ cursor: "pointer", userSelect: "none", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "white" }}>
                    Account Name
                    {renderSortIndicator("accountName")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("accountId")}
                  sx={{ cursor: "pointer", userSelect: "none", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "white" }}>
                    Account ID
                    {renderSortIndicator("accountId")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("status")}
                  sx={{ cursor: "pointer", userSelect: "none", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "white" }}>
                    Status
                    {renderSortIndicator("status")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("contacts")}
                  sx={{ cursor: "pointer", userSelect: "none", textAlign: "center", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center", color: "white" }}>
                    Contacts
                    {renderSortIndicator("contacts")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("services")}
                  sx={{ cursor: "pointer", userSelect: "none", textAlign: "center", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center", color: "white" }}>
                    Services (Count)
                    {renderSortIndicator("services")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("servicesNames")}
                  sx={{ cursor: "pointer", userSelect: "none", minWidth: 200, maxWidth: 300, width: 250, bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "white" }}>
                    Services
                    {renderSortIndicator("servicesNames")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("workflows")}
                  sx={{ cursor: "pointer", userSelect: "none", textAlign: "center", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center", color: "white" }}>
                    Workflows and Teams
                    {renderSortIndicator("workflows")}
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => toggleSort("spoc")}
                  sx={{ cursor: "pointer", userSelect: "none", bgcolor: "#1b4e83", color: "white" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "white" }}>
                    SPOC
                    {renderSortIndicator("spoc")}
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: "center", bgcolor: "#1b4e83", color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {pageItems.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                    checked={selectedAccountIds.has(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.accountName}</TableCell>
                  <TableCell>{row.accountId}</TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabels[row.status]}
                      size="small"
                      sx={{
                        bgcolor:
                          row.status === "NEW"
                            ? "rgba(0, 120, 212, 0.12)"
                            : row.status === "ASSIGNED"
                            ? "rgba(76, 175, 80, 0.12)"
                            : row.status === "ONBOARDING"
                            ? "rgba(255, 152, 0, 0.12)"
                            : "rgba(156, 39, 176, 0.12)",
                        color:
                          row.status === "NEW"
                            ? "#0078d4"
                            : row.status === "ASSIGNED"
                            ? "#4caf50"
                            : row.status === "ONBOARDING"
                            ? "#ff9800"
                            : "#9c27b0",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "primary.main" }}>
                    {row.contacts}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "primary.main" }}>
                    {row.services}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 200,
                      maxWidth: 300,
                      width: 250,
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.servicesNames}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "primary.main" }}>
                    {row.workflows}
                  </TableCell>
                  <TableCell>{row.spoc}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" aria-label="More actions">
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
            {pageItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">
                  No accounts match your filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            flexShrink: 0,
            mt: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Items per page:</Typography>
              <TextField
                select
                value={pageSize}
                onChange={(e) => {
                  const target = e.target as unknown as HTMLSelectElement;
                  handlePageSizeChange({
                    target: { value: target.value },
                  } as React.ChangeEvent<HTMLSelectElement>);
                }}
                size="small"
                SelectProps={{
                  native: true,
                }}
                sx={{ minWidth: 80 }}
              >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              </TextField>
            </Box>
            <Typography variant="body2" fontWeight={500}>
            {sortedData.length === 0
              ? "0 results"
              : `${currentPage * pageSize + 1} - ${Math.min(
                  (currentPage + 1) * pageSize,
                  sortedData.length
                )} of ${sortedData.length}`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
            </Button>
            <Typography variant="body2" fontWeight={500}>
            Page {currentPage + 1} of {pageCount}
            </Typography>
            <Button
              variant="outlined"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage + 1 >= pageCount}
          >
            Next
            </Button>
          </Box>
        </Paper>

        <Dialog open={showForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Add New Account</Typography>
              <IconButton onClick={handleCloseForm} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <form onSubmit={handleFormSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                  id="firstName"
                label="First Name"
                  type="text"
                fullWidth
                variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Enter first name"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                  id="lastName"
                label="Last Name"
                  type="text"
                fullWidth
                variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Enter last name"
                />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseForm} variant="outlined">
                  Cancel
              </Button>
              <Button type="submit" variant="contained">
                  Submit
              </Button>
            </DialogActions>
            </form>
        </Dialog>

        <Snackbar
          open={showToast}
          autoHideDuration={3000}
          onClose={() => setShowToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setShowToast(false)} severity="success" sx={{ width: "100%" }}>
            Account added
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
