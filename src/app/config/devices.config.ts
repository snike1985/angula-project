export const DevicesConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Devices',
      total: 'Devices',
      subTotal: [ 'of', 'Devices found' ],
      empty: 'No Devices Found',
      emptyTotal: 'No Devices',
      searchPlaceholder: 'Search Device by Name, Code ect.',
      createBtn: 'Create Device',
      importBtn: 'Import'
    },
    fr_FR: {
      title: 'Devices',
      total: 'Devices',
      subTotal: [ 'of', 'Devices found' ],
      empty: 'No Devices Found',
      emptyTotal: 'No Devices',
      searchPlaceholder: 'Search Device by Name, Code ect.',
      createBtn: 'Create Device',
      importBtn: 'Import'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Device',
        fr_FR: 'Device'
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
      value: '-1',
      className: '',
      type: 1,
      completed: false
    },
    merchants: {
      title: {'en_EN': 'Merchant', 'fr_FR': 'Merchant'},
      options: [
        {
          text: {
            en_EN: 'Any Merchant',
            fr_FR: 'Any Merchant'
          },
          value: '-1'
        }
      ],
      value: '-1',
      className: '',
      type: 1,
      completed: false
    },
    locations: {
      title: {'en_EN': 'Location', 'fr_FR': 'Location'},
      options: [
        {
          text: {
            en_EN: 'Any Location',
            fr_FR: 'Any Location'
          },
          value: '-1'
        }
      ],
      value: '-1',
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
    }
  }
};
export const DevicesCreateConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Devices',
      titleCreate: 'New Device',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      filledError: 'This filled is required',
      datePlaceholder: 'Select Date',
      labels: {
        deviceType: 'Device type',
        location: 'Location',
        institution: 'Institution',
        merchant: 'Merchant',
        activeSince: 'Active since',
        activeTo: 'Active to'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel',
      selects: {
        location: [
          {
            text: 'Select location',
            value: '-1'
          },
          {
            text: 'Ukraine',
            value: 'Ukraine'
          },
          {
            text: 'France',
            value: 'France'
          },
          {
            text: 'Germany',
            value: 'Germany'
          }
        ],
        institution: [
          {
            text: 'Select institution',
            value: '-1'
          },
          {
            text: 'test_1',
            value: 'test_1'
          },
          {
            text: 'test_2',
            value: 'test_2'
          },
          {
            text: 'test_3',
            value: 'test_3'
          }
        ],
        merchant: [
          {
            text: 'Select merchant',
            value: '-1'
          },
          {
            text: 'test_1',
            value: 'test_1'
          },
          {
            text: 'test_2',
            value: 'test_2'
          },
          {
            text: 'test_3',
            value: 'test_3'
          }
        ],
        types: [
          {
            text: 'Select device type',
            value: '-1'
          },
          {
            text: 'test_1',
            value: 'test_1'
          },
          {
            text: 'test_2',
            value: 'test_2'
          },
          {
            text: 'test_3',
            value: 'test_3'
          }
        ]
      }
    },
    fr_FR: {
      backBtn: 'All Devices',
      titleCreate: 'New Device',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      filledError: 'This filled is required',
      datePlaceholder: 'Select Date',
      labels: {
        deviceType: 'Device type',
        institution: 'Institution',
        merchant: 'Merchant',
        activeSince: 'Active since',
        activeTo: 'Active to'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel',
      selects: {
        location: [
          {
            text: 'Select location',
            value: '-1'
          },
          {
            text: 'Ukraine',
            value: 'Ukraine'
          },
          {
            text: 'France',
            value: 'France'
          },
          {
            text: 'Germany',
            value: 'Germany'
          }
        ],
        institution: [
          {
            text: 'Select institution',
            value: '-1'
          },
          {
            text: 'test_1',
            value: 'test_1'
          },
          {
            text: 'test_2',
            value: 'test_2'
          },
          {
            text: 'test_3',
            value: 'test_3'
          }
        ],
        merchant: [
          {
            text: 'Select merchant',
            value: '-1'
          },
          {
            text: 'test_1',
            value: 'test_1'
          },
          {
            text: 'test_2',
            value: 'test_2'
          },
          {
            text: 'test_3',
            value: 'test_3'
          }
        ],
        types: [
          {
            text: 'Select device type',
            value: '-1'
          },
          {
            text: 'test_1',
            value: 'test_1'
          },
          {
            text: 'test_2',
            value: 'test_2'
          },
          {
            text: 'test_3',
            value: 'test_3'
          }
        ]
      }
    }
  }
};
export const DevicesSingleConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Devices',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      disableBtn: 'Disable',
      enableBtn: 'Enable',
      infoTitles: {
        generalInfo: 'General Info',
      },
      labels: {
        merchant: 'Merchant:',
        institution: 'Institution:',
        activeSince: 'Active since:',
        activeTo: 'Active to:',
        code: 'Code:',
        location: 'Location:'
      },
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      backBtn: 'All Devices',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      disableBtn: 'Disable',
      infoTitles: {
        generalInfo: 'General Info',
      },
      labels: {
        merchant: 'Merchant::',
        institution: 'Institution:',
        activeSince: 'Active since:',
        activeTo: 'Active to:',
        code: 'Code:',
        location: 'Location:'
      },
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};
export const DevicesRowConfig = {
  texts: {
    en_EN: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      btnDelete: 'Delete',
      btnEnable: 'Enable',
      btnMore: 'More...',
      location: 'Location',
      code: 'Code',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    },
    fr_FR: {
      btnEdit: 'Edit',
      btnDisable: 'Disable',
      btnDelete: 'Delete',
      btnEnable: 'Enable',
      btnMore: 'More...',
      location: 'Location',
      code: 'Code',
      status: [ 'Disabled', 'Active', 'Inactive' ]
    }
  }
};
