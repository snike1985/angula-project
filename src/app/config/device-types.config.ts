// filter types:
//   0 - select
//   1 - combo select


// Description for control type:
// 0 - text
// 1 - switch
export const DeviceTypesConfig = {
  search: true,
  createBtn: false,
  texts: {
    en_EN: {
      title: 'Device Types',
      total: 'Device types',
      subTotal: [ 'of', 'Device Types found' ],
      empty: 'No Device Types Found',
      emptyTotal: 'No Device Types',
      searchPlaceholder: 'Search Device Type by Name, Code ect.'
    },
    fr_FR: {
      title: 'Device Types',
      total: 'Device types',
      subTotal: [ 'of', 'Device Types found' ],
      empty: 'No Device Types Found',
      emptyTotal: 'No Device Types',
      searchPlaceholder: 'Search Device Type by Name, Code ect.'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Device type',
        fr_FR: 'Device type'
      },
      orderName: 'code'
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
        en_EN: 'Code',
        fr_FR: 'Code'
      },
      orderName: 'code'
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
