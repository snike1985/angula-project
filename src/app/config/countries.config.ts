// filter types:
//   0 - select
//   1 - combo select


// Description for control type:
// 0 - text
// 1 - switch
export const CountriesConfig = {
  search: false,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Countries',
      total: 'countries',
      subTotal: [ 'of', 'Countries found' ],
      emptyTotal: 'No Countries',
      empty: 'No Countries Found'
    },
    fr_FR: {
      title: 'Countries',
      total: 'countries',
      emptyTotal: 'No Countries',
      subTotal: [ 'of', 'Countries found' ],
      empty: 'No Countries Found'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Country',
        fr_FR: 'Country'
      },
      orderName: 'countryName'
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      },
      orderName: 'active'
    },
    {
      title: {
        en_EN: 'Currency',
        fr_FR: 'Currency'
      },
      orderName: 'currencyName'
    },
    {
      title: {
        en_EN: 'Code',
        fr_FR: 'Code'
      }
    },
    {
      title: {
        en_EN: 'ISO Code',
        fr_FR: 'ISO Code'
      },
      orderName: 'isoCode'
    },
    {
      title: {
        en_EN: 'ISD Code',
        fr_FR: 'ISD Code'
      },
      orderName: 'isdCode'
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
