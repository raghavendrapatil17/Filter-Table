import { useMemo, useState, useEffect, useRef } from "react";
import { utils, writeFile } from "xlsx";

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
  const [activeFilterField, setActiveFilterField] = useState<FilterKey | null>(null);
  const [filterSelectValue, setFilterSelectValue] = useState<string>("");
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveFilterField(null);
      }
    };

    if (activeFilterField) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeFilterField]);

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
      return <span className="sort-indicator" aria-hidden="true" />;
    }

    return (
      <span
        className={`sort-indicator ${
          sortConfig.direction === "asc" ? "asc" : "desc"
        }`}
        aria-hidden="true"
      />
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
    setActiveFilterField(null);
  };

  const clearAllFilters = () => {
    setPageIndex(0);
    setFilters(new Map());
    setActiveFilterField(null);
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
    <div className="page-wrapper">
      <header className="page-header">
        <div className="primary-actions">
          <button
            type="button"
            className="action-button primary"
            onClick={handleAddAccount}
          >
            Add Account
          </button>
        </div>
        <div className="search-controls">
          <div className="search-controls-row">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                className="search-field search-input"
                type="search"
                placeholder="Search across all fields..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setPageIndex(0);
                }}
              />
            </div>
            <div className="filter-dropdown-wrapper" ref={filterDropdownRef}>
              <select
                className="search-field filter-field-select"
                value={filterSelectValue}
                onChange={(event) => {
                  const field = event.target.value as FilterKey | "";
                  if (field) {
                    setActiveFilterField(field);
                    setFilterSelectValue(""); // Reset select after selection
                  }
                }}
                aria-label="Select field to filter"
              >
                <option value="">Add Filter...</option>
                <option value="accountName">Account Name</option>
                <option value="accountId">Account ID</option>
                <option value="status">Status</option>
                <option value="contacts">Contacts</option>
                <option value="services">Services (Count)</option>
                <option value="servicesNames">Services</option>
                <option value="workflows">Workflows</option>
                <option value="spoc">SPOC</option>
              </select>
              {activeFilterField && (
                <div className="filter-dropdown-menu">
                  <div className="filter-menu-header">
                    <span className="filter-menu-title">
                      Filter by {getFilterLabel(activeFilterField)}
                    </span>
                    <button
                      type="button"
                      className="filter-close-btn"
                      onClick={() => setActiveFilterField(null)}
                      aria-label="Close filter"
                    >
                      ×
                    </button>
                  </div>
                  <div className="filter-menu-content">
                    {getAvailableValues(activeFilterField).length > 0 ? (
                      getAvailableValues(activeFilterField).map((value) => {
                        const isChecked = filters.get(activeFilterField)?.has(value) || false;
                        return (
                          <label key={value} className="filter-checkbox-label">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                handleFilterChange(activeFilterField, value, e.target.checked)
                              }
                            />
                            <span>{value}</span>
                          </label>
                        );
                      })
                    ) : (
                      <div className="filter-empty-state">No values available</div>
                    )}
                  </div>
                  {filters.get(activeFilterField) && filters.get(activeFilterField)!.size > 0 && (
                    <div className="filter-menu-footer">
                      <button
                        type="button"
                        className="filter-clear-btn"
                        onClick={() => {
                          clearFilter(activeFilterField);
                          setActiveFilterField(null);
                        }}
                      >
                        Clear Filter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              className="action-button subtle"
              onClick={handleExport}
            >
              Export All
            </button>
          </div>
          {filters.size > 0 && (
            <div className="active-filters">
              {Array.from(filters.entries()).map(([field, values]) => (
                <div key={field} className="active-filter-tag">
                  <span className="filter-tag-label">{getFilterLabel(field)}:</span>
                  <span className="filter-tag-values">
                    {Array.from(values).slice(0, 2).join(", ")}
                    {values.size > 2 && ` +${values.size - 2}`}
                  </span>
                  <button
                    type="button"
                    className="filter-tag-remove"
                    onClick={() => clearFilter(field)}
                    aria-label={`Remove ${getFilterLabel(field)} filter`}
                  >
                    ×
                  </button>
                </div>
              ))}
              {filters.size > 1 && (
                <button
                  type="button"
                  className="clear-all-filters-btn"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <section className="table-card">
        <table className="account-table">
          <thead>
            <tr>
              <th className="checkbox-column" aria-label="Select all">
                <input
                  type="checkbox"
                  checked={isAllPageSelected}
                  ref={(input) => {
                    if (input)
                      input.indeterminate =
                        isSomePageSelected && !isAllPageSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th onClick={() => toggleSort("accountName")}>
                <div className="table-header-cell">
                  <span>Account Name</span>
                  {renderSortIndicator("accountName")}
                </div>
              </th>
              <th onClick={() => toggleSort("accountId")}>
                <div className="table-header-cell">
                  <span>Account ID</span>
                  {renderSortIndicator("accountId")}
                </div>
              </th>
              <th onClick={() => toggleSort("status")}>
                <div className="table-header-cell">
                  <span>Status</span>
                  {renderSortIndicator("status")}
                </div>
              </th>
              <th onClick={() => toggleSort("contacts")}>
                <div className="table-header-cell">
                  <span>Contacts</span>
                  {renderSortIndicator("contacts")}
                </div>
              </th>
              <th onClick={() => toggleSort("services")}>
                <div className="table-header-cell">
                  <span>Services (Count)</span>
                  {renderSortIndicator("services")}
                </div>
              </th>
              <th onClick={() => toggleSort("servicesNames")}>
                <div className="table-header-cell">
                  <span>Services</span>
                  {renderSortIndicator("servicesNames")}
                </div>
              </th>
              <th onClick={() => toggleSort("workflows")}>
                <div className="table-header-cell">
                  <span>Workflows and Teams</span>
                  {renderSortIndicator("workflows")}
                </div>
              </th>
              <th onClick={() => toggleSort("spoc")}>
                <div className="table-header-cell">
                  <span>SPOC</span>
                  {renderSortIndicator("spoc")}
                </div>
              </th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((row) => (
              <tr key={row.id}>
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedAccountIds.has(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                    aria-label={`Select ${row.accountName}`}
                  />
                </td>
                <td>{row.accountName}</td>
                <td>{row.accountId}</td>
                <td>
                  <span
                    className={`status-pill status-${row.status.toLowerCase()}`}
                  >
                    {statusLabels[row.status]}
                  </span>
                </td>
                <td className="numeric">{row.contacts}</td>
                <td className="numeric">{row.services}</td>
                <td>{row.servicesNames}</td>
                <td className="numeric">{row.workflows}</td>
                <td>{row.spoc}</td>
                <td className="actions-column">
                  <button
                    type="button"
                    className="icon-button"
                    aria-label="More actions"
                  >
                    ...
                  </button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={10} >
                  <p className="empty-state">
                  No accounts match your filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <footer className="table-footer">
        <div className="pagination-left">
          <label className="items-per-page">
            Items per page:
            <select value={pageSize} onChange={handlePageSizeChange}>
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <span className="page-summary">
            {sortedData.length === 0
              ? "0 results"
              : `${currentPage * pageSize + 1} - ${Math.min(
                  (currentPage + 1) * pageSize,
                  sortedData.length
                )} of ${sortedData.length}`}
          </span>
        </div>
        <div className="pagination-controls">
          <button
            type="button"
            className="pagination-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="page-indicator">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            type="button"
            className="pagination-button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage + 1 >= pageCount}
          >
            Next
          </button>
        </div>
      </footer>

      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Account</h2>
              <button
                type="button"
                className="modal-close"
                onClick={handleCloseForm}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="account-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Enter first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Enter last name"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="action-button subtle"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button type="submit" className="action-button primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && <div className="toast">Account added</div>}
    </div>
  );
}

export default App;
