export const VelocityLimitsConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Velocity Limits',
      total: 'Velocity Limits',
      subTotal: [
        'of',
        'Velocity Limits found'
      ],
      empty: 'No Velocity Limits Found',
      emptyTotal: 'No Velocity Limits',
      searchPlaceholder: 'Search Velocity Limit by Name',
      createBtn: 'Create Velocity Limit'
    },
    fr_FR: {
      title: 'Velocity Limits',
      total: 'Velocity Limits',
      subTotal: [
        'of',
        'Velocity Limits found'
      ],
      empty: 'No Velocity Limits Found',
      emptyTotal: 'No Velocity Limits',
      searchPlaceholder: 'Search Velocity Limit by Name',
      createBtn: 'Create Velocity Limit'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Apply Limit to',
        fr_FR: 'Apply Limit to'
      },
      orderName: 'limit_to'
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      },
      orderName: 'Status'
    },
    {
      title: {
        en_EN: 'Amount',
        fr_FR: 'Amount'
      }
    },
    {
      title: {
        en_EN: 'Count',
        fr_FR: 'Count'
      }
    }
  ],
  filter: {
    limit_to: {
      title: {
        'en_EN': 'Apply Limit to',
        'fr_FR': 'Apply Limit to'
      },
      options: [
        {
          text: {
            en_EN: 'Any Object',
            fr_FR: 'Any Object'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: true
    },
    transaction_type: {
      title: {
        'en_EN': 'Transaction Type',
        'fr_FR': 'Transaction Type'
      },
      options: [
        {
          text: {
            en_EN: 'Any Transaction Type',
            fr_FR: 'Any Transaction Type'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: true
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
            en_EN: 'Disabled',
            fr_FR: 'Disabled'
          },
          value: '0'
        },
        {
          text: {
            en_EN: 'Enabled',
            fr_FR: 'Enabled'
          },
          value: '1'
        }
      ],
      className: '',
      type: 0,
      completed: true
    }
  }
};
export const VelocityLimitsCreateConfig = {
  texts: {
    en_EN: {
      btns: {
        back: 'All Velocity Limits',
        addType: 'Add Transaction Type',
        delete: 'Delete',
        edit: 'Save',
        create: 'Create',
        cancel: 'Cancel'
      },
      titles: {
        create: 'Create',
        edit: 'Edit'
      },
      labels: {
        limit_to: 'Apply limit to',
        institution: 'Institution',
        merchant: 'Merchant',
        location: 'Location',
        device: 'Device',
        transactionType: 'Transaction type',
        status: 'Status',
        amount: 'Amount',
        count: 'Count',
        limitType: 'Limit type',
        single: 'Single transaction',
        perMinutes: [ 'Per', 'minutes' ],
        perDay: 'Per day',
        perMonth: 'Per month'
      },
    },
    fr_FR: {
      btns: {
        back: 'All Velocity Limits',
        addType: 'Add Transaction Type',
        delete: 'Delete',
        edit: 'Save',
        create: 'Create',
        cancel: 'Cancel'
      },
      titles: {
        create: 'Create',
        edit: 'Edit'
      },
      labels: {
        limit_to: 'Apply limit to',
        institution: 'Institution',
        merchant: 'Merchant',
        location: 'Location',
        device: 'Device',
        transactionType: 'Transaction type',
        status: 'Status',
        amount: 'Amount',
        count: 'Count',
        limitType: 'Limit type',
        single: 'Single transaction',
        perMinutes: [ 'Per', 'minutes' ],
        perDay: 'Per day',
        perMonth: 'Per month'
      },
    }
  }
};
export const VelocityLimitsSingleConfig = {
  texts: {
    en_EN: {
      btns: {
        back: 'All Velocity Limits',
        delete: 'Delete',
        edit: 'Edit'
      },
      titles: {
        create: 'Apply Limit to',
        ransactionType: 'Transaction Type',
        amount: 'Limit Amount',
        count: 'Limit Count'
      },
      labels: {
        institution: 'Institution',
        merchant: 'Merchant',
        location: 'Location',
        device: 'Device',
        single: 'Single transaction',
        perMinutes: [ 'Per', 'minutes' ],
        perDay: 'Per day',
        perMonth: 'Per month'
      },
    },
    fr_FR: {
      btns: {
        back: 'All Router Schedules',
        delete: 'Delete',
        edit: 'Save',
        create: 'Create',
        cancel: 'Cancel'
      },
      titles: {
        create: 'Create',
        edit: 'Edit'
      },
      labels: {
        date: 'Deploy on',
        version: 'Router version',
        description: 'Description',
        status: 'Status'
      }
    }
  }
};
export const VelocityLimitsRowConfig = {
  texts: {
    en_EN: {
      single: 'Single transaction',
      perMinutes: [ 'Per', 'minutes' ],
      perDay: 'Per day',
      perMonth: 'Per month'
    },
    fr_FR: {
      single: 'Single transaction',
      perMinutes: [ 'Per', 'minutes' ],
      perDay: 'Per day',
      perMonth: 'Per month'
    }
  }
};

