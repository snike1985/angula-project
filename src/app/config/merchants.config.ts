export const MerchantsConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Merchants',
      total: 'Merchants',
      subTotal: [ 'of', 'Merchants found' ],
      empty: 'No Merchants Found',
      emptyTotal: 'No Merchants',
      searchPlaceholder: 'Search Merchant by Name, Code ect.',
      createBtn: 'Create Merchant',
      importBtn: 'Import'
    },
    fr_FR: {
      title: 'Merchants',
      total: 'Merchants',
      subTotal: [ 'of', 'Merchants found' ],
      empty: 'No Merchants Found',
      emptyTotal: 'No Merchants',
      searchPlaceholder: 'Search Merchant by Name, Code ect.',
      createBtn: 'Create Merchant',
      importBtn: 'Import'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Merchant',
        fr_FR: 'Merchant'
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
      title: {'en_EN': 'Merchant Address', 'fr_FR': 'Merchant Address'},
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
    },
    options: {
      title: {'en_EN': 'Merchant Options', 'fr_FR': 'Merchant Options'},
      options: [
        {
          label: '',
          options: [
            {
              value: -1,
              text: {
                en_EN: 'Any Option',
                fr_FR: 'Any Option'
              }
            }

          ]
        },
        {
          label: 'General Options',
          options: [
            {
              value: '1',
              text: {
                      en_EN: 'Partial Auth',
                      fr_FR: 'Partial Auth'
                     }
            }

          ]
        },
        {
          label: 'Services',
          options: [
            {
              value: '123',
              text: {
                en_EN: 'Auth Service',
                fr_FR: 'Auth Service'
              }
            },
            {
              value: '1232',
              text: {
                en_EN: 'Prepaid Service',
                fr_FR: 'Prepaid Service'
              }
            }
          ]
        },
        {
          label: 'Additional Services',
          options: [
            {
              value: '986',
              text: {
                en_EN: 'Frad Service',
                fr_FR: 'Frad Service'
              }
            },
            {
              value: '987',
              text: {
                en_EN: 'Loyalty Service',
                fr_FR: 'Loyalty Service'
              }
            }
          ]
        },
      ],
      className: '',
      type: 3,
      completed: true
    }
  }
};
export const MerchantsCreateConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Merchants',
      titleCreate: 'New Merchant',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      errorMessage: 'Please check all tabs for errors',
      tabsBtns: {
          generalInfo: 'General Info',
          merchantOptions: 'Merchant Options',
          contactInfo: 'Contact Info'
      },
      filledError: 'This filled is required',
      emailValidationError: 'Email is not valid',
      datePlaceholder: 'Select Date',
      selectInstitutionPlaceholder: 'Select institution',
      selectCategoryPlaceholder: 'Select merchant category code',
      labels: {
        name: 'Merchant name',
        description: 'Merchant description',
        institution: 'Merchant institution',
        activeSince: 'Active since',
        activeTo: 'Active to',
        categoryCode: 'Merchant category code',
        partialAuth: 'Partial Auth',
        email: 'Email',
        phone: 'Phone number',
        fax: 'Fax',
        country: 'Country',
        addressLineOne: 'Address line one',
        addressLineTwo: 'Address line two',
        city: 'City',
        state: 'State',
        zipCode: 'Zip Code',
        status: 'Status',
        services: 'Services',
        additional: 'Additional services',
        fraudService: 'Fraud Service',
        loyaltyService: 'Loyalty Service',
        authService: 'Auth Service',
        prepaidService: 'Prepaid Service'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    },
    fr_FR: {
      backBtn: 'All Merchants',
      titleCreate: 'New Merchant',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      errorMessage: 'Please check all tabs for errors',
      tabsBtns: {
        generalInfo: 'General Info',
        merchantOptions: 'Merchant Options',
        contactInfo: 'Contact Info'
      },
      filledError: 'This filled is required',
      emailValidationError: 'Email is not valid',
      datePlaceholder: 'Select Date',
      selectInstitutionPlaceholder: 'Select institution',
      selectCategoryPlaceholder: 'Select merchant category code',
      labels: {
        name: 'Merchant name',
        description: 'Merchant description',
        institution: 'Merchant institution',
        activeSince: 'Active since',
        activeTo: 'Active to',
        categoryCode: 'Merchant category code',
        partialAuth: 'Partial Auth',
        email: 'Email',
        phone: 'Phone number',
        fax: 'Fax',
        country: 'Country',
        addressLineOne: 'Address line one',
        addressLineTwo: 'Address line two',
        city: 'City',
        state: 'State',
        zipCode: 'Zip Code',
        status: 'Status',
        services: 'Services',
        additional: 'Additional services',
        fraudService: 'Fraud Service',
        loyaltyService: 'Loyalty Service',
        authService: 'Auth Service',
        prepaidService: 'Prepaid Service'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    }
  }
};
export const MerchantsSingleConfig = {
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
      fraudService: 'Fraud Service',
      loyaltyService: 'Loyalty Service',
      authService: 'Auth Service',
      prepaidService: 'Prepaid Service',
      infoTitles: {
        generalInfo: 'General Info',
        merchantOptions: 'General Info',
        contactInfo: 'Contact Info'
      },
      labels: {
        description: 'Description:',
        institution: 'Institution:',
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
      fraudService: 'Fraud Service',
      loyaltyService: 'Loyalty Service',
      authService: 'Auth Service',
      prepaidService: 'Prepaid Service',
      infoTitles: {
        generalInfo: 'General Info',
        merchantOptions: 'General Info',
        contactInfo: 'Contact Info'
      },
      labels: {
        description: 'Description:',
        institution: 'Institution:',
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
export const MerchantsRowConfig = {
  texts: {
    en_EN: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      btnEnable: 'Enable',
      btnDelete: 'Delete',
      code: 'Code',
      institution: 'Institution',
      location: 'Locations',
      device: 'Devices',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      btnEnable: 'Enable',
      btnDelete: 'Delete',
      code: 'Code',
      institution: 'Institution',
      location: 'Locations',
      device: 'Devices',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};
