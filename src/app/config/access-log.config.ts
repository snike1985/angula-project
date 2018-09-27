export const AccessLogsConfig = {
  search: true,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Access Log',
      total: 'Access Logs',
      subTotal: [
        'of',
        'Access Logs found'
      ],
      emptyTotal: 'No Access Logs',
      searchPlaceholder: 'Search Access Log by User, Session Id etc',
      empty: 'No Access Logs Found'
    },
    fr_FR: {
      title: 'Access Log',
      total: 'Access Logs',
      subTotal: [
        'of',
        'Access Logs found'
      ],
      emptyTotal: 'No Access Logs',
      searchPlaceholder: 'Search Access Log by User, Session Id etc',
      empty: 'No Access Logs Found'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Log in date',
        fr_FR: 'Log in date'
      },
      orderName: 'log_in'
    },
    {
      title: {
        en_EN: 'Log out date',
        fr_FR: 'Log out date'
      },
      orderName: 'log_out'
    },
    {
      title: {
        en_EN: 'User',
        fr_FR: 'User'
      },
      orderName: 'user'
    },
    {
      title: {
        en_EN: 'Login Result',
        fr_FR: 'Login Result'
      }
    },
    {
      title: {
        en_EN: 'Discription',
        fr_FR: 'Discription'
      }
    }
  ],
  filter: {
    user: {
      title: {
        'en_EN': 'User',
        'fr_FR': 'User'
      },
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
    },
    loginResult: {
      title: {
        'en_EN': 'Login Result',
        'fr_FR': 'Login Result'
      },
      options: [
        {
          text: {
            en_EN: 'Any Login Result',
            fr_FR: 'Any Login Result'
          },
          value: '-1'
        },
        {
          text: {
            en_EN: 'Succeeded',
            fr_FR: 'Succeeded'
          },
          value: '1'
        },
        {
          text: {
            en_EN: 'Failed',
            fr_FR: 'Failed'
          },
          value: '2'
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
    }
  }
};
export const AccessLogsSingleConfig = {
  texts: {
    en_EN: {
      title: 'Access Log',
      labels: {
        logIn: 'Log in date',
        logOut: 'Log out date:',
        user: 'User',
        accessPoint: 'Access point',
        result: 'Login Result'
      },
      succeeded: 'Succeeded',
      failed: 'Failed'
    },
    fr_FR: {
      title: 'Access Log',
      labels: {
        logIn: 'Log in date',
        logOut: 'Log out date:',
        user: 'User',
        accessPoint: 'Access point',
        result: 'Login Result'
      },
      succeeded: 'Succeeded',
      failed: 'Failed'
    }
  }
};
export const AccessLogsRowConfig = {
  texts: {
    en_EN: {
      points: 'access point',
      succeeded: 'Succeeded',
      failed: 'Failed'
    },
    fr_FR: {
      points: 'access point',
      succeeded: 'Succeeded',
      failed: 'Failed'
    }
  }
};
