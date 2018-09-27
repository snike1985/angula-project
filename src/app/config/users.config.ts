export const UsersConfig = {
  search: true,
  createBtn: true,
  texts: {
    en_EN: {
      title: 'Users',
      total: 'users',
      subTotal: [ 'of', 'Users found' ],
      empty: 'No Users Found',
      emptyTotal: 'No Users',
      searchPlaceholder: 'Search User by Name, Role ect.',
      createBtn: 'Create User'
    },
    fr_FR: {
      title: 'Users',
      total: 'users',
      subTotal: [ 'of', 'Users found' ],
      emptyTotal: 'No Users',
      searchPlaceholder: 'Search User by Name, Role ect.',
      createBtn: 'Create User'
    }
  },
  table: [
    {
      title: {
        en_EN: 'Username',
        fr_FR: 'Username'
      },
      orderName: 'firstName'
    },
    {
      title: {
        en_EN: 'Status',
        fr_FR: 'Status'
      }
    },
    {
      title: {
        en_EN: 'Contacts',
        fr_FR: 'Contacts'
      }
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
    userRoles: {
      title: {'en_EN': 'Role', 'fr_FR': 'Role'},
      options: [
        {
          text: {
            en_EN: 'Any Role',
            fr_FR: 'Any Role'
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
export const UsersCreateConfig = {
  texts: {
    en_EN: {
      backBtn: 'All Users',
      titleCreate: 'Create',
      titleEdit: 'Edit',
      deleteBtn: 'Delete',
      filledError: 'This filled is required',
      emailValidationError: 'Email is not valid',
      labels: {
        firstName: 'FirstName',
        lastName: 'FirstName',
        role: 'Role',
        email: 'Email',
        phone: 'Phone number',
        status: 'Status'
      },
      status: {
        enabled: 'Enabled',
        disabled: 'Disabled'
      },
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
      emailValidationError: 'Email is not valid',
      labels: {
        firstName: 'FirstName',
        lastName: 'FirstName',
        role: 'Role',
        email: 'Email',
        phone: 'Phone number',
        status: 'Status'
      },
      status: {
        enabled: 'Enabled',
        disabled: 'Disabled'
      },
      saveBtn: 'Save',
      createBtn: 'Create',
      cancelBtn: 'Cancel'
    }
  }
};
export const UserRowConfig = {
  texts: {
    en_EN: {
      btnEdit: 'Edit',
      btnMore: 'More…',
      btnReset: 'Reset Password',
      btnDelete: 'Delete'
    },
    fr_FR: {
      btnEdit: 'Edit',
      btnMore: 'More…',
      btnReset: 'Reset Password',
      btnDelete: 'Delete'
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
export const UserResetPasswordConfig = {
  texts: {
    en_EN: {
      title: 'Password Reset',
      titleInProcess: 'Resetting Password',
      inAction: 'Generating new password',
      newMessage: 'New password was sent to',
      description: [ 'Do you want to reset password for',
        'The new randomly generated password will be emailed to the user.' ],
      btnReset: 'Reset Password',
      btnCancel: 'Cancel',
      btnOk: 'Ok'
    },
    fr_FR: {
      title: 'Password Reset',
      titleInProcess: 'Resetting Password',
      inAction: 'Generating new password',
      newMessage: 'New password was sent to',
      description: [ 'Do you want to reset password for',
        'The new randomly generated password will be emailed to the user.' ],
      btnReset: 'Reset Password',
      btnCancel: 'Cancel',
      btnOk: 'Ok'
    }
  }
};

