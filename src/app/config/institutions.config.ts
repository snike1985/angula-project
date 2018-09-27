export const InstitutionsConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Institutions',
      total: 'Institutions',
      subTotal: [ 'of', 'Institutions found' ],
      empty: 'No Institutions Found',
      emptyTotal: 'No Institutions',
      searchPlaceholder: 'Search Institution by Name, Code ect.',
      createBtn: 'Create Institution',
      importBtn: 'Import'
    },
    fr_FR: {
      title: 'Institutions',
      total: 'Institutions',
      subTotal: [ 'of', 'Institutions found' ],
      empty: 'No Institutions Found',
      emptyTotal: 'No Institutions',
      searchPlaceholder: 'Search Institution by Name, Code ect.',
      createBtn: 'Create Institution',
      importBtn: 'Import'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Name',
        fr_FR: 'Name'
      },
      orderName: 'name'
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      },
      orderName: 'status'
    },
    {
      title: {
        en_EN: 'Active since',
        fr_FR: 'Active since'
      },
      orderName: 'activateOn'
    },
    {
      title: {
        en_EN: 'Active to',
        fr_FR: 'Active to'
      },
      orderName: 'expiryOn'
    }
  ],
  filter: {
    status: {
      title: {
        'en_EN': 'Status',
        'fr_FR': 'Status'
      },
      options: [
        {
          text: {
            en_EN: 'Any Status',
            fr_FR: 'Any Status'
          },
          value: '-1'
        },
        {
          text: {
            en_EN: 'Inactive',
            fr_FR: 'Inactive'
          },
          value: '0'
        },
        {
          text: {
            en_EN: 'Active',
            fr_FR: 'Active'
          },
          value: '1'
        },
        {
          text: {
            en_EN: 'Disabled',
            fr_FR: 'Disabled'
          },
          value: '2'
        }
      ],
      value: '-1',
      className: '',
      type: 0,
      completed: true
    },
    addresses: {
      title: {
        'en_EN': 'Institution Address',
        'fr_FR': 'Institution Address'
      },
      options: [
        {
          text: {
            en_EN: 'Any Address',
            fr_FR: 'Any Address'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 1,
      completed: false
    }
  }
};
export const InstitutionsCreateConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Institutions',
      titleCreate: 'New Institution',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      tabsBtns: {
        generalInfo: 'General Info',
        contactInfo: 'Contact Info'
      },
      filledError: 'This filled is required',
      errorMessage: 'Please check all tabs for errors',
      emailValidationError: 'Email is not valid',
      datePlaceholder: 'Select Date',
      labels: {
        name: 'Institution name',
        description: 'Institution description',
        activeSince: 'Active since',
        activeTo: 'Active to',
        email: 'Email',
        phone: 'Phone number',
        fax: 'Fax',
        country: 'Country',
        addressLineOne: 'Address line one',
        addressLineTwo: 'Address line two',
        city: 'City',
        state: 'State',
        zipCode: 'Zip Code',
        status: 'Status'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    },
    fr_FR: {
      backBtn: 'All Institutions',
      titleCreate: 'Create',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      tabsBtns: {
        generalInfo: 'General Info',
        contactInfo: 'Contact Info'
      },
      filledError: 'This filled is required',
      errorMessage: 'Please check all tabs for errors',
      emailValidationError: 'Email is not valid',
      labels: {
        institutionName: 'Institution name',
        institutionDescription: 'Institution description',
        activeSince: 'Active since',
        activeTo: 'Active to',
        email: 'Email',
        phone: 'Phone number',
        fax: 'Fax',
        country: 'Country',
        addressLineOne: 'Address line one',
        addressLineTwo: 'Address line two',
        city: 'City',
        state: 'State',
        zipCode: 'Zip Code',
        status: 'Status'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    }
  }
};
export const InstitutionsSingleConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Institutions',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      disableBtn: 'Disable',
      enableBtn: 'Enable',
      merchant: 'merchants',
      location: 'locations',
      device: 'devices',
      infoTitles: {
        generalInfo: 'General Info',
        contactInfo: 'Contact Info'
      },
      labels: {
        address: 'Address:',
        activeSince: 'Active since:',
        activeTo: 'Active to:',
        city: 'City:',
        code: 'Code:',
        country: 'Country:',
        description: 'Description:',
        email: 'Email:',
        fax: 'Fax:',
        phone: 'Phone number:',
        status: 'Status:',
        state: 'State:',
        zipCode: 'Zip Code:'
      },
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      backBtn: 'All Institutions',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      disableBtn: 'Disable',
      enableBtn: 'Enable',
      merchant: 'merchants',
      location: 'locations',
      device: 'devices',
      infoTitles: {
        generalInfo: 'General Info',
        contactInfo: 'Contact Info'
      },
      labels: {
        address: 'Address:',
        activeSince: 'Active since:',
        activeTo: 'Active to:',
        city: 'City:',
        code: 'Code:',
        country: 'Country:',
        description: 'Description:',
        email: 'Email:',
        fax: 'Fax:',
        phone: 'Phone number:',
        status: 'Status:',
        state: 'State:',
        zipCode: 'Zip Code:'
      },
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};
export const InstitutionsRowConfig = {
  texts: {
    en_EN: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      codeLabel: 'Code',
      btnEnable: 'Enable',
      btnDelete: 'Delete',
      merchant: 'merchants',
      location: 'locations',
      device: 'devices',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      codeLabel: 'Code',
      btnDelete: 'Delete',
      btnEnable: 'Enable',
      merchant: 'merchants',
      location: 'locations',
      device: 'devices',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};
export const InstitutionsImportConfig = {
  templateSrc: '#',
  texts: {
    en_EN: {
      title: 'Import',
      description: 'You can import institutions, merchants, locations and devices from CSV file.',
      templateBtn: 'Download file template',
      dropHint: 'To replace drop new csv file or',
      selectBtn: 'select from your computer',
      btnNext: 'Next',
      btnImport: 'Import',
      btnCancel: 'Cancel',
      processing: 'Importing file…',
      validateProcessing: 'Validating file…',
      importProcessing: 'Importing file…',
      error: 'Invalid file',
      error2: 'errors',
      errorDescription: 'Errors occurred during verification',
      valid: 'Valid file',
      validInstitutions: 'Institutions',
      validMerchants: 'Merchants',
      validLocations: 'Locations',
      validDevices: 'Devices',
      uploadBtn: 'Upload Other File'
    },
    fr_FR: {
      title: 'Import',
      description: 'You can import institutions, merchants, locations and devices from CSV file.',
      templateBtn: 'Download file template',
      dropHint: 'To replace drop new csv file or',
      selectBtn: 'select from your computer',
      btnNext: 'Next',
      btnImport: 'Import',
      btnCancel: 'Cancel',
      processing: 'Importing file…',
      validateProcessing: 'Validating file…',
      importProcessing: 'Importing file…',
      error: 'Invalid file',
      error2: 'errors',
      errorDescription: 'Errors occurred during verification',
      valid: 'Valid file',
      validInstitutions: 'Institutions',
      validMerchants: 'Merchants',
      validLocations: 'Locations',
      validDevices: 'Devices',
      uploadBtn: 'Upload Other File'
    }
  }
};

