export const TransactionLogsConfig = {
  search: true,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Transaction Log',
      total: 'Transaction Logs',
      subTotal: [
        'of',
        'Transaction Logs found'
      ],
      emptyTotal: 'No Transaction Logs',
      searchPlaceholder: 'Search Transaction Log by User, Session Id etc',
      empty: 'No Transaction Logs Found'
    },
    fr_FR: {
      title: 'Transaction Log',
      total: 'Transaction Logs',
      subTotal: [
        'of',
        'Transaction Logs found'
      ],
      emptyTotal: 'No Transaction Logs',
      searchPlaceholder: 'Search Transaction by Name,  Code etc',
      empty: 'No Transaction Logs Found'
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
        en_EN: 'Transaction',
        fr_FR: 'Transaction'
      }
    },
    {
      title: {
        en_EN: 'Amount',
        fr_FR: 'Amount'
      }
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      },
      orderName: 'status'
    }
  ],
  filter: {
    transaction: {
      title: {
        'en_EN': 'Transaction',
        'fr_FR': 'Transaction'
      },
      options: [
        {
          text: {
            en_EN: 'Any Transaction',
            fr_FR: 'Any Transaction'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: false
    },
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
        }
      ],
      className: '',
      type: 0,
      completed: false
    },
    period: {
      title: {'en_EN': 'Period', 'fr_FR': 'Period'},
      className: '',
      type: 3,
      completed: true
    },
    forReview: {
      title: {
        'en_EN': 'For Review',
        'fr_FR': 'For Review'
      },
      className: '',
      type: 6,
      completed: true
    },
    institution: {
      title: {
        'en_EN': 'Institution',
        'fr_FR': 'Institution'
      },
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
    merchant: {
      title: {
        'en_EN': 'Merchant',
        'fr_FR': 'Merchant'
      },
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
    location: {
      title: {
        'en_EN': 'Location',
        'fr_FR': 'Location'
      },
      options: [
        {
          text: {
            en_EN: 'Any Location',
            fr_FR: 'Any Location'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 1,
      completed: false
    },
    device: {
      title: {
        'en_EN': 'Device',
        'fr_FR': 'Device'
      },
      options: [
        {
          text: {
            en_EN: 'Any Device',
            fr_FR: 'Any Device'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 1,
      completed: false
    },
    cardType: {
      title: {
        'en_EN': 'Card Type',
        'fr_FR': 'Card Type'
      },
      options: [
        {
          text: {
            en_EN: 'Any Card',
            fr_FR: 'Any Card'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: false
    },
    amount: {
      title: {
        'en_EN': 'Amount',
        'fr_FR': 'Amount'
      },
      className: '',
      type: 4,
      completed: true
    },
    currency: {
      title: {
        'en_EN': 'Currency',
        'fr_FR': 'Currency'
      },
      options: [
        {
          text: {
            en_EN: 'Any Currency',
            fr_FR: 'Any Currency'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 0,
      completed: false
    }
  }
};

export const TransactionLogsRowConfig = {
  texts: {
    en_EN: {
      requested: 'Requested',
      approved: 'Approved',
      btns: {
        view: 'View JSON',
        mark: 'Mark for review',
        unMark: 'Unmark for review'
      },
      review: 'For Review'
    },
    fr_FR: {
      requested: 'Requested',
      approved: 'Approved',
      btns: {
        view: 'View JSON',
        mark: 'Mark for review',
        unMark: 'Unmark for review'
      },
      review: 'For Review'
    }
  }
};

export const TransactionLogsSingleConfig = {
  texts: {
    en_EN: {
      title: 'Credit Authorization',
      errTitle: 'Can’t parse transaction data',
      labels: {
        date: 'Date',
        requested: 'Request Amount',
        approved: 'Approved Amount',
        status: 'Status',
        review: 'For review'
      },
      btns: {
        viewJson: 'View JSON',
        viewRowData: 'View Raw Data',
        mark: 'Mark for review',
        unMark: 'Unmark for review'
      }
    },
    fr_FR: {
      title: 'Credit Authorization',
      errTitle: 'Can’t parse transaction data',
      labels: {
        date: 'Date',
        requested: 'Request Amount',
        approved: 'Approved Amount',
        status: 'Status',
        review: 'For review'
      },
      btns: {
        viewJson: 'View JSON',
        mark: 'Mark for review',
        unMark: 'Unmark for review'
      }
    }
  }
};

export const TransactionLogsItemConfig = {
  texts: {
    en_EN: {
      titles: {
        request: 'Request',
        response: 'Response'
      }
    },
    fr_FR: {
      titles: {
        request: 'Request',
        response: 'Response'
      }
    }
  }
};
