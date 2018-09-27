// filter types:
//   0 - select
//   1 - combo select


// Description for control type:
// 0 - text
// 1 - switch
export const CountryStatesConfig = {
  search: true,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Country States',
      total: 'Country states',
      subTotal: [ 'of', 'Country States found' ],
      empty: 'No Country States Found',
      emptyTotal: 'No Country States',
      searchPlaceholder: 'Search Country State by Name, Code ect.'
    },
    fr_FR: {
      title: 'Country States',
      total: 'Country states',
      subTotal: [ 'of', 'Country States found' ],
      empty: 'No Country States Found',
      emptyTotal: 'No Country States',
      searchPlaceholder: 'Search Country State by Name, Code ect.'
    }
  },
  table: [
    {
      title: { en_EN: 'Country States', fr_FR: 'Country States' },
      orderName: 'stateName'
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
      title: { en_EN: 'Country', fr_FR: 'Country' },
      orderName: 'countryName'
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
    },
    country: {
      title: {'en_EN': 'Country', 'fr_FR': 'Country'},
      options: [
        {
          text: {
            en_EN: 'Any Country',
            fr_FR: 'Any Country'
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
