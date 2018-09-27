export const LocationsConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Locations',
      total: 'Locations',
      subTotal: [ 'of', 'Locations found' ],
      empty: 'No Locations Found',
      emptyTotal: 'No Locations',
      mapBtn: 'View on Map',
      listBtn: 'View as List',
      searchPlaceholder: 'Search Location by Name, Code ect.',
      createBtn: 'Create Location',
      importBtn: 'Import'
    },
    fr_FR: {
      title: 'Locations',
      total: 'Locations',
      subTotal: [ 'of', 'Locations found' ],
      empty: 'No Locations Found',
      emptyTotal: 'No Locations',
      mapBtn: 'View on Map',
      listBtn: 'View as List',
      searchPlaceholder: 'Search Location by Name, Code ect.',
      createBtn: 'Create Location',
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
    institutions: {
      title: {'en_EN': 'Institutions', 'fr_FR': 'Institutions'},
      options: [
        {
          text: {
            en_EN: 'Any Institution',
            fr_FR: 'Any Institution'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 1,
      completed: false
    },
    merchants: {
      title: {'en_EN': 'Merchants', 'fr_FR': 'Merchants'},
      options: [
        {
          text: {
            en_EN: 'Any Merchant',
            fr_FR: 'Any Merchant'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 1,
      completed: false
    },
    status: {
      title: {'en_EN': 'Status', 'fr_FR': 'Status'},
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
      title: {'en_EN': 'Location Address', 'fr_FR': 'Merchant Location'},
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

export const LocationsCreateConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Locations',
      titleCreate: 'New Location',
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
        name: 'Location name',
        description: 'Location description',
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
      backBtn: 'All Locations',
      titleCreate: 'New Locations',
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
        name: 'Locations name',
        description: 'Locations description',
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

export const LocationsSingleConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Merchants',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      disableBtn: 'Disable',
      enableBtn: 'Enable',
      locationTxt: 'locations',
      devicesTxt: 'devices',
      location: 'locations',
      device: 'devices',
      infoTitles: {
        generalInfo: 'General Info',
        merchantOptions: 'General Info',
        contactInfo: 'Contact Info'
      },
      labels: {
        description: 'Description:',
        institution: 'Institution:',
        merchant: 'Merchant:',
        activeSince: 'Active since:',
        activeTo: 'Active to:',
        code: 'Code:',
        categoryCode: 'Category code:',
        partialAuth: 'Partial auth:',
        email: 'Email:',
        phone: 'Phone number:',
        fax: 'Fax:',
        country: 'Country:',
        addressLineOne: 'Address line one:',
        addressLineTwo: 'Address line two:',
        address: 'Address:',
        city: 'City:',
        state: 'State:',
        zipCode: 'Zip Code:',
        status: 'Status:',
        services: 'Services:',
        additional: 'Additional services:'
      },
      options: [
        'Disabled', 'Enabled'
      ],
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      backBtn: 'All Merchants',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      disableBtn: 'Disable',
      enableBtn: 'Enable',
      locationTxt: 'locations',
      devicesTxt: 'devices',
      location: 'locations',
      device: 'devices',
      infoTitles: {
        generalInfo: 'General Info',
        merchantOptions: 'General Info',
        contactInfo: 'Contact Info'
      },
      labels: {
        description: 'Description:',
        institution: 'Institution:',
        merchant: 'Merchant:',
        activeSince: 'Active since:',
        activeTo: 'Active to:',
        code: 'Code:',
        categoryCode: 'Category code:',
        partialAuth: 'Partial auth:',
        email: 'Email:',
        phone: 'Phone number:',
        fax: 'Fax:',
        country: 'Country:',
        addressLineOne: 'Address line one:',
        addressLineTwo: 'Address line two:',
        address: 'Address:',
        city: 'City:',
        state: 'State:',
        zipCode: 'Zip Code:',
        status: 'Status:',
        services: 'Services:',
        additional: 'Additional services:'
      },
      options: [
        'Disabled', 'Enabled'
      ],
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};

export const LocationsRowConfig = {
  texts: {
    en_EN: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      btnEnable: 'Enable',
      btnDelete: 'Delete',
      code: 'Code',
      merchant: 'Merchant',
      device: 'Devices',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      btnEnable: 'Enable',
      btnDelete: 'Delete',
      code: 'Code',
      merchant: 'Merchant',
      device: 'Devices',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};