export const ProfileInfoConfig: Object = {
  texts: {
    en_EN: {
      title: 'My Profile',
      infoTitle: 'User Info',
      info: {
        name: 'Name:',
        role: 'Role:',
        email: 'Email:',
        phone: 'Phone number:',
      }
    },
    fr_FR: {
      title: 'My Profile',
      infoTitle: 'User Info',
      info: {
        name: 'Name:',
        role: 'Role:',
        email: 'Email:',
        phone: 'Phone number:',
      }
    }
  },
  menu: [
    {
      title: {
        en_EN: 'Edit',
        fr_FR: 'Edit'
      },
      path: 'edit'
    },
    {
      title: {
        en_EN: 'Change Password',
        fr_FR: 'Change Password'
      },
      path: 'change-password'
    },
    {
      title: {
        en_EN: 'Log Out',
        fr_FR: 'Log Out'
      },
      path: '/auth'
    }
  ]
};
