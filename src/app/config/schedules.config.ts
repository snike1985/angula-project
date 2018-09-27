export const SchedulesConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Router Schedule',
      total: 'Router Schedule',
      subTotal: [
        'of',
        'Router Schedule found'
      ],
      empty: 'No Router Schedule Found',
      emptyTotal: 'No Router Schedule',
      searchPlaceholder: 'Search Router Schedules',
      createBtn: 'Schedule Router Version Deployment'
    },
    fr_FR: {
      title: 'Router Schedule',
      total: 'Router Schedule',
      subTotal: [
        'of',
        'Router Schedule found'
      ],
      empty: 'No Router Schedule Found',
      emptyTotal: 'No Router Schedule',
      searchPlaceholder: 'Search Router Schedules',
      createBtn: 'Schedule Router Version Deployment'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Deploy on',
        fr_FR: 'Deploy on'
      },
      orderName: 'date'
    },
    {
      title: {
        en_EN: 'Router Version',
        fr_FR: 'Router Version'
      }
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      },
      orderName: 'Status'
    }
  ],
  filter: {
    version: {
      title: {
        'en_EN': 'Router Version',
        'fr_FR': 'Router Version'
      },
      options: [
        {
          text: {
            en_EN: 'Any Version',
            fr_FR: 'Any Version'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: true
    },
    date: {
      title: {
        'en_EN': 'Activation Date and Time',
        'fr_FR': 'Activation Date and Time'
      },
      options: [
        {
          text: {
            en_EN: 'Any Date and Time',
            fr_FR: 'Any Date and Time'
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
export const SchedulesCreateConfig = {
  texts: {
    en_EN: {
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
export const SchedulesRowConfig = {
  texts: {
    en_EN: {
      btns: {
        edit: 'Edit',
        delete: 'Delete'
      }
    },
    fr_FR: {
      btns: {
        edit: 'Edit',
        delete: 'Delete'
      }
    }
  }
};

