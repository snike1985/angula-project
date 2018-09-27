export const AuditLogsConfig = {
  search: true,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Audit Log',
      total: 'Audit Logs',
      subTotal: [ 'of', 'Audit Logs found' ],
      emptyTotal: 'No Audit Logs',
      searchPlaceholder: 'Search Audit Logs by Object, Action etc',
      empty: 'No Audit Logs Found'
    },
    fr_FR: {
      title: 'Audit Log',
      total: 'Audit Logs',
      subTotal: [ 'of', 'Audit Logs found' ],
      searchPlaceholder: 'Search Audit Logs by Object, Action etc',
      emptyTotal: 'No Audit Logs',
      empty: 'No Audit Logs Found'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Date',
        fr_FR: 'Date'
      },
      orderName: 'date'
    },
    {
      title: {
        en_EN: 'Object',
        fr_FR: 'Object'
      }
    },
    {
      title: {
        en_EN: 'Action',
        fr_FR: 'Action'
      },
      orderName: 'action'
    },
    {
      title: {
        en_EN: 'Discription',
        fr_FR: 'Discription'
      }
    },
    {
      title: {
        en_EN: 'By',
        fr_FR: 'By'
      }
    }
  ],
  filter: {
    object: {
      title: {'en_EN': 'Object type', 'fr_FR': 'Object type'},
      options: [
        {
          text: {
            en_EN: 'Any Object Type',
            fr_FR: 'Any Object Type'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: false
    },
    action: {
      title: {'en_EN': 'Action type', 'fr_FR': 'Action type'},
      options: [
        {
          text: {
            en_EN: 'Any Action Type',
            fr_FR: 'Any Action Type'
          },
          value: '-1'
        },
        {
          text: {
            en_EN: 'Created',
            fr_FR: 'Created'
          },
          value: '1'
        },
        {
          text: {
            en_EN: 'Updated',
            fr_FR: 'Updated'
          },
          value: '2'
        },
        {
          text: {
            en_EN: 'Deleted',
            fr_FR: 'Deleted'
          },
          value: '3'
        }
      ],
      className: '',
      type: 0,
      completed: true
    },
    period: {
      title: {'en_EN': 'Period', 'fr_FR': 'Period'},
      className: '',
      type: 3,
      completed: true
    },
    user: {
      title: {'en_EN': 'User', 'fr_FR': 'User'},
      options: [
        {
          text: {
            en_EN: 'Any User',
            fr_FR: 'Any User'
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
export const AuditLogsSingleConfig = {
  texts: {
    en_EN: {
      title: 'Object',
      labels: {
        date: 'Date',
        objectType: 'Object type',
        objectName: 'Object name',
        action: 'Action',
        user: 'By',
        description: 'Discription'
      },
      action: {
        c: 'Created',
        u: 'Updated',
        d: 'Deleted'
      }
    },
    fr_FR: {
      title: 'Object',
      labels: {
        date: 'Date',
        objectType: 'Object type',
        objectName: 'Object name',
        action: 'Action',
        user: 'By',
        description: 'Discription'
      },
      action: {
        c: 'Created',
        u: 'Updated',
        d: 'Deleted'
      }
    }
  }
};
export const AuditLogsRowConfig = {
  texts: {
    en_EN: {
      action: {
        c: 'Created',
        u: 'Updated',
        d: 'Deleted'
      }
    },
    fr_FR: {
      action: {
        c: 'Created',
        u: 'Updated',
        d: 'Deleted'
      }
    }
  }
};
