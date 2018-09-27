// filter types:
//   0 - select
//   1 - combo select


// Description for control type:
// 0 - text
// 1 - switch
export const UserRolesConfig: Object = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'User Roles',
      total: 'User roles',
      subTotal: [ 'of', 'User Roles found' ],
      empty: 'No Users Found',
      emptyTotal: 'No User Roles',
      searchPlaceholder: 'Search User Role',
      createBtn: 'Create User Role'
    },
    fr_FR: {
      title: 'User Roles',
      total: 'User roles',
      subTotal: [ 'of', 'User Roles found' ],
      empty: 'No Users Found',
      emptyTotal: 'No User Roles',
      searchPlaceholder: 'Search User Role',
      createBtn: 'Create User Role'
    }
  },
  table: [
    {
      title: {
        en_EN: 'User Role',
        fr_FR: 'User Role'
      },
      orderName: 'name'
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      }
    },
    {
      title: {
        en_EN: 'Role Functions',
        fr_FR: 'Role Functions'
      }
    }
  ],
  filter: {
    status: {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      },
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
    functions: {
      title: {
        en_EN: 'Function',
        fr_FR: 'Function'
      },
      options: [
        {
          text: {
            en_EN: 'Any Function',
            fr_FR: 'Any Function'
          },
          value: '-1'
        }
      ],
      className: '',
      type: 2,
      completed: false
    }
  }
};
export const UserRolesCreateConfig: Object = {
  texts: {
    en_EN: {
      backBtn: 'All Users',
      titleCreate: 'Create',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      filledError: 'This filled is required',
      labels: {
        roleName: 'Role name',
        description: 'Description',
        functions: 'User role functions',
        status: 'Status'
      },
      functionsTable: {
        title: 'Role Functions',
        titleItems: [ 'Create', 'Read', 'Update', 'Delete' ]
      },
      addBtn: 'Add Function',
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    },
    fr_FR: {
      backBtn: 'All Users',
      titleCreate: 'Create',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      filledError: 'This filled is required',
      labels: {
        roleName: 'Role name',
        description: 'Description',
        functions: 'User role functions',
        status: 'Status'
      },
      functionsTable: {
        title: 'Role Functions',
        titleItems: [ 'Create', 'Read', 'Update', 'Delete' ]
      },
      addBtn: 'Add Function',
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    }
  }
};
export const UserRolesRowConfig = {
  texts: {
    en_EN: {
      btnEdit: 'Edit',
      btnMore: 'Actions',
      btnDelete: 'Delete'
    },
    fr_FR: {
      btnEdit: 'Edit',
      btnMore: 'Actions',
      btnDelete: 'Delete'
    }
  }
};
export const FunctionsConfig: Object = {
  texts: {
    en_EN: {
      title: 'Function',
      hideBtn: 'Hide'
    },
    fr_FR: {
      title: 'Function',
      hideBtn: 'Hide'
    }
  }
};
