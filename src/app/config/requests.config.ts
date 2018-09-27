
const domain = 'http://rippsfake.websters.com.ua/api/v1';

export const AuthRequests: Object = {
  domain: domain,
  auth: {
    url: '/login',
    method: 'post'
  },
  refreshUser: {
    url: '/login/session-details?type=current',
    method: 'get'
  },
  reset: {
    url: '/password/forgot-password',
    method: 'post'
  },
  newPassword: {
    url: '/password/reset-password',
    method: 'post'
  }
};

export const CountriesRequests: Object = {
  domain: domain,
  getData: {
    url: '/countries',
    method: 'get'
  },
  getOptions: {
    url: '/country-list',
    method: 'get'
  },
  update: {
    url: '/countries/{country-id}',
    method: 'put'
  },
  insert: {
    url: '/countries',
    method: 'post'
  },
  delete: {
    url: '/countries',
    method: 'delete'
  }
};

export const CountryStatesRequests: Object = {
  domain: domain,
  getData: {
    url: '/states',
    method: 'get'
  },
  getOptions: {
    url: '/country-states-list',
    method: 'get'
  },
  update: {
    url: '/states/{state-id}',
    method: 'put'
  },
  insert: {
    url: '/states',
    method: 'post'
  },
  delete: {
    url: '/states/{state-id}',
    method: 'delete'
  }
};

export const CurrenciesRequests: Object = {
  domain: domain,
  getData: {
    url: '/currencies',
    method: 'get'
  },
  update: {
    url: '/currencies/{currency-id}',
    method: 'put'
  },
  getOptions: {
    url: '/currencies-list',
    method: 'get'
  },
  insert: {
    url: '/currencies',
    method: 'post'
  },
  delete: {
    url: '/currencies',
    method: 'delete'
  }
};

export const DevicesRequests: Object = {
  domain: domain,
  getData: {
    url: '/device',
    method: 'get'
  },
  getItem: {
    url: '/device/{device-id}',
    method: 'get'
  },
  update: {
    url: ' /device/{device-id}',
    method: 'put'
  },
  insert: {
    url: '/device',
    method: 'post'
  },
  delete: {
    url: '/device/{device-id}',
    method: 'delete'
  }
};

export const DeviceTypesRequests: Object = {
  domain: domain,
  getData: {
    url: '/device-types',
    method: 'get'
  },
  update: {
    url: '/device-types/{device-type.ts-id}',
    method: 'put'
  },
  insert: {
    url: '/device-types',
    method: 'post'
  },
  delete: {
    url: '/device-types',
    method: 'delete'
  },
  getOptions: {
    url: '/device-types-list',
    method: 'get'
  },
};

export const FunctionsRequests: Object = {
  domain: domain,
  getData: {
    url: '/functions',
    method: 'get'
  }
};

export const InstitutionsRequests: Object = {
  domain: domain,
  getData: {
    url: '/institution',
    method: 'get'
  },
  getOptions: {
    url: '/institution-list',
    method: 'get'
  },
  getItem: {
    url: '/institution/{user-id}',
    method: 'get'
  },
  update: {
    url: '/institution/{institution-id}',
    method: 'put'
  },
  insert: {
    url: '/institution',
    method: 'post'
  },
  delete: {
    url: '/institution/{institution-id}',
    method: 'delete'
  },
  importAll: {
    url: '/institution/import',
    method: 'post'
  },
  getAddresses: {
    url: '/institution/address',
    method: 'get'
  }
};

export const LocationsRequests: Object = {
  domain: domain,
  getData: {
    url: '/location',
    method: 'get'
  },
  getOptions: {
    url: '/location-list',
    method: 'get'
  },
  getAddresses: {
    url: '/location/address',
    method: 'get'
  },
  getItem: {
    url: '/location/{location-id}',
    method: 'get'
  },
  update: {
    url: ' /location/{location-id}',
    method: 'put'
  },
  insert: {
    url: '/location',
    method: 'post'
  },
  delete: {
    url: '/location/{location-id}',
    method: 'delete'
  }
};

export const LogsAccessRequests: Object = {
  domain: domain,
  getData: {
    url: '/logs-access',
    method: 'get'
  }
};

export const LogsAuditRequests: Object = {
  domain: domain,
  getData: {
    url: '/logs-audit',
    method: 'get'
  }
};

export const LogsTransactionsRequests: Object = {
  domain: domain,
  getData: {
    url: '/logs-transactions',
    method: 'get'
  },
  getRowData: {
    url: '/logs-transactions/{:id}/row-data',
    method: 'get'
  },
  getJson: {
    url: '/logs-transactions/{:id}/json',
    method: 'get'
  },
  setReview: {
    url: '/logs-transactions/{:id}/review',
    method: 'put'
  },
  getStatusesList: {
    url: '/transactions-status-list',
    method: 'get'
  },
  getOptions: {
    url: '/transactions-list',
    method: 'get'
  },
  getCardTypes: {
    url: '/card-types-list',
    method: 'get'
  }
};

export const MerchantsRequests: Object = {
  domain: domain,
  getData: {
    url: '/merchant',
    method: 'get'
  },
  getOptions: {
    url: '/merchant-list',
    method: 'get'
  },
  getCategories: {
    url: '/merchant/category-codes',
    method: 'get'
  },
  getAddresses: {
    url: '/merchant/address',
    method: 'get'
  },
  getItem: {
    url: '/merchant/{merchant-id}',
    method: 'get'
  },
  update: {
    url: '/merchant/{institution-id}',
    method: 'put'
  },
  insert: {
    url: '/merchant',
    method: 'post'
  },
  delete: {
    url: '/merchant/{institution-id}',
    method: 'delete'
  }
};

export const ProfileRequests: Object = {
  domain: domain,
  getUser: {
    url: '/users?type=current',
    method: 'get'
  },
  editProfile: {
    url: '/users?type=current ',
    method: 'put'
  },
  changePassword: {
    url: '/password/reset-password',
    method: 'post'
  }
};

export const ViewingSettingsRequests: Object = {
  domain: domain,
  get: {
    url: '/view-setting',
    method: 'get'
  },
  update: {
      url: '/view-setting/{view-setting-id}',
      method: 'put'
  }
};

export const UsersRequests: Object = {
  domain: domain,
  resetPassword: {
    url: '/users/reset-password/{user-id}',
    method: 'get'
  },
  getData: {
    url: '/users',
    method: 'get'
  },
  getOptions: {
    url: '/users-list',
    method: 'get'
  },
  getItem: {
    url: '/users/{user-id}',
    method: 'get'
  },
  update: {
    url: '/users/{user-id}',
    method: 'put'
  },
  insert: {
    url: '/users',
    method: 'post'
  },
  delete: {
    url: '/users/{user-id}',
    method: 'delete'
  }
};

export const UserRolesRequests: Object = {
  domain: domain,
  getData: {
    url: '/roles',
    method: 'get'
  },
  getOptions: {
    url: '/role-list',
    method: 'get'
  },
  getItem: {
    url: '/roles/{user-id}',
    method: 'get'
  },
  update: {
    url: '/roles/{role-id}',
    method: 'put'
  },
  insert: {
    url: '/roles',
    method: 'post'
  },
  delete: {
    url: '/roles/{role-id}',
    method: 'delete'
  }
};

export const WorkflowRequests: Object = {
  domain: domain,
  getData: {
    url: '/workflow-groups',
    method: 'get'
  },
  insert: {
    url: '/workflow-groups',
    method: 'post'
  },
  insertWorkflow: {
    url: '/workflow',
    method: 'post'
  },
  update: {
    url: '/workflow-groups/{workflow-group-id}',
    method: 'put'
  },
  updateWorkflow: {
    url: '/workflow/{workflow-id}',
    method: 'put'
  },
  getServices: {
    url: '/services-list',
    method: 'get'
  },
  delete: {
    url: '/workflow-groups/{workflow-group-id}',
    method: 'delete'
  },
  deleteWorkflow: {
    url: '/workflow/{workflow-id}',
    method: 'delete'
  }
};

export const PaymentMethodsRequests: Object = {
  domain: domain,
  getOptions: {
    url: '/payment-methods-list',
    method: 'get'
  },
};

export const ObjectTypesRequests: Object = {
  domain: domain,
  getAll: {
    url: '/object-types-list',
    method: 'get'
  },
};

export const ScheduleRequests: Object = {
  domain: domain,
  getData: {
    url: '/schedules',
    method: 'get'
  },
  getItem: {
    url: '/schedules/{schedule-id}',
    method: 'get'
  },
  update: {
    url: ' /schedules/{schedule-id}',
    method: 'put'
  },
  insert: {
    url: '/schedules',
    method: 'post'
  },
  delete: {
    url: '/schedules/{schedule-id}',
    method: 'delete'
  }
};

export const VelocityLimitsRequests: Object = {
  domain: domain,
  getData: {
    url: '/velocity-limits',
    method: 'get'
  },
  getItem: {
    url: '/velocity-limits/{velocity-limits-id}',
    method: 'get'
  },
  update: {
    url: ' /velocity-limits/{velocity-limits-id}',
    method: 'put'
  },
  insert: {
    url: '/velocity-limits',
    method: 'post'
  },
  delete: {
    url: '/velocity-limits/{velocity-limits-id}',
    method: 'delete'
  }
};
