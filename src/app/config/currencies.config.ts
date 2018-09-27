// filter types:
//   0 - select
//   1 - combo select


// Description for control type:
// 0 - text
// 1 - switch
export const CurrenciesConfig = {
  search: true,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Currencies',
      total: 'currencies',
      subTotal: [ 'of', 'Currencies found' ],
      empty: 'No Currencies Found',
      emptyTotal: 'No Currencies',
      searchPlaceholder: 'Search Currency by Name, Code ect.'
    },
    fr_FR: {
      title: 'Currencies',
      total: 'currencies',
      subTotal: [ 'of', 'Currencies found' ],
      empty: 'No Currencies Found',
      emptyTotal: 'No Currencies',
      searchPlaceholder: 'Search Currency by Name, Code ect.'
    }
  },
  table: [
    {
      title: { en_EN: 'Currency', fr_FR: 'Currency' },
      orderName: 'currencyName'
    },
    {
      title: { en_EN: 'Status', fr_FR: 'Status' },
      orderName: 'active'
    },
    {
      title: { en_EN: 'Code', fr_FR: 'Code' },
      orderName: 'code'
    },
    {
      title: { en_EN: 'ISO Code', fr_FR: 'ISO Code' },
      orderName: 'isoCode'
    },
    {
      title: { en_EN: 'Currency Minor Unit', fr_FR: 'Currency Minor Unit' },
      orderName: 'currencyMinorUnit'
    }
  ],
  filter: {
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
