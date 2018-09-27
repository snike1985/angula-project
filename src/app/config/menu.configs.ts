export const MenuConfig = {
    items: {
        menuItems: [
            {
                title: {
                    en_EN: 'Dashboard',
                    fr_FR: 'Dashboard'
                },
                mobileDisplaying: true,
                path: '/',
                icon: '<svg width="24px" height="24px" viewBox="0 0 24 24"><defs></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="dashboard" fill="#CBCFDA"><path d="M4,15.0059191 C4,13.8980806 4.88655484,13 6.00591905,13 L8.99408095,13 C10.1019194,13 11,13.8865548 11,15.0059191 L11,17.9940809 C11,19.1019194 10.1134452,20 8.99408095,20 L6.00591905,20 C4.89808055,20 4,19.1134452 4,17.9940809 L4,15.0059191 Z M13,15.0059191 C13,13.8980806 13.8865548,13 15.0059191,13 L17.9940809,13 C19.1019194,13 20,13.8865548 20,15.0059191 L20,17.9940809 C20,19.1019194 19.1134452,20 17.9940809,20 L15.0059191,20 C13.8980806,20 13,19.1134452 13,17.9940809 L13,15.0059191 Z M4,6.99791312 C4,5.89449617 4.89451376,5 5.99406028,5 L18.0059397,5 C19.1072288,5 20,5.89826062 20,6.99791312 L20,9.00208688 C20,10.1055038 19.1054862,11 18.0059397,11 L5.99406028,11 C4.8927712,11 4,10.1017394 4,9.00208688 L4,6.99791312 Z"id="Combined-Shape"></path></g> </g> </svg>'
            },
            {
                title: {
                    en_EN: 'Institutions',
                    fr_FR: 'Institutions'
                },
                path: '/institutions',
                icon: '<svg width="24px" height="24px" viewBox="0 0 24 24"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="institutions" fill="#CBCFDA"> <path d="M13,11 L19.007983,11 C20.1081436,11 21,11.8874333 21,12.999615 L21,19.000385 C21,20.1047419 20.0998238,21 19.007983,21 L10.5001925,21 L4.99961498,21 C3.89525812,21 3,20.1073772 3,19.0049107 L3,4.99508929 C3,3.8932319 3.88743329,3 4.99961498,3 L11.000385,3 C12.1047419,3 13,3.8926228 13,4.99508929 L13,11 Z M5,5 L5,7 L7,7 L7,5 L5,5 Z M9,5 L9,7 L11,7 L11,5 L9,5 Z M5,9 L5,11 L7,11 L7,9 L5,9 Z M9,9 L9,11 L11,11 L11,9 L9,9 Z M5,13 L5,15 L7,15 L7,13 L5,13 Z M9,13 L9,15 L11,15 L11,13 L9,13 Z M13,13 L13,15 L15,15 L15,13 L13,13 Z M13,17 L13,19 L15,19 L15,17 L13,17 Z M9,17 L9,21 L11,21 L11,17 L9,17 Z M5,17 L5,19 L7,19 L7,17 L5,17 Z M17,17 L17,19 L19,19 L19,17 L17,17 Z M17,13 L17,15 L19,15 L19,13 L17,13 Z" id="Institutions"></path> </g> </g> </svg>',
                submenu: [{
                    items: [
                        {
                            title: {
                                en_EN: 'Institutions',
                                fr_FR: 'Institutions'
                            },
                            path: '/institutions'
                        },
                        {
                            title: {
                                en_EN: 'Merchants',
                                fr_FR: 'Merchants'
                            },
                            path: '/institutions/merchants'
                        },
                        {
                            title: {
                                en_EN: 'Locations',
                                fr_FR: 'Locations'
                            },
                            path: '/institutions/locations'
                        },
                        {
                            title: {
                                en_EN: 'Devices',
                                fr_FR: 'Devices'
                            },
                            path: '/institutions/devices'
                        }
                    ]
                }]
            },
            {
                title: {
                    en_EN: 'Logs',
                    fr_FR: 'Logs'
                },
                path: '/logs',
                icon: '<svg width="24px" height="24px" viewBox="0 0 24 24"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="logs" fill="#CBCFDA"> <path d="M19,13.9132644 L19,7.00012207 C19,5.3360431 17.652611,4 15.9905224,4 L11.0844131,4 L6.99850233,4 C6.44704472,4 6,3.55613518 6,3 C6,2.44771525 6.44748943,2 6.99850233,2 L18.0014977,2 C18.0021869,2 18.0028759,2.00000069 18.0035648,2.00000208 C19.6587804,2.00193307 21,3.34857407 21,4.99686968 L21,7.50280181 L21,16.9975267 C21,17.5511774 20.5561352,18 20,18 C19.4477153,18 19,17.544239 19,16.9975267 L19,13.9132644 Z M3,7.99406028 C3,6.8927712 3.89706013,6 5.00585866,6 L14.9941413,6 C16.1019465,6 17,6.89451376 17,7.99406028 L17,20.0059397 C17,21.1072288 16.1029399,22 14.9941413,22 L5.00585866,22 C3.89805351,22 3,21.1054862 3,20.0059397 L3,7.99406028 Z M5,14 C5,14.5561352 5.44565467,15 5.99539757,15 L14.0046024,15 C14.5443356,15 15,14.5522847 15,14 C15,13.4438648 14.5543453,13 14.0046024,13' +
                ' L5.99539757,13 C5.4556644,13 5,13.4477153 5,14 Z M5,10 C5,10.5561352 5.44565467,11 5.99539757,11 L14.0046024,11 C14.5443356,11 15,10.5522847 15,10 C15,9.44386482 14.5543453,9 14.0046024,9 L5.99539757,9 C5.4556644,9 5,9.44771525 5,10 Z M5,18 C5,18.5561352 5.44565467,19 5.99539757,19 L14.0046024,19 C14.5443356,19 15,18.5522847 15,18 C15,17.4438648 14.5543453,17 14.0046024,17 L5.99539757,17 C5.4556644,17 5,17.4477153 5,18 Z" id="Combined-Shape"></path> </g> </g> </svg>',
                submenu: [{
                    items: [
                        {
                            title: {
                                en_EN: 'Audit Log',
                                fr_FR: 'Audit Log'
                            },
                            path: '/logs/audit-log'
                        },
                        {
                            title: {
                                en_EN: 'Access Log',
                                fr_FR: 'Access Log'
                            },
                            path: '/logs/access-log'
                        },
                        {
                            title: {
                                en_EN: 'Transaction Log',
                                fr_FR: 'Transaction Log'
                            },
                            path: '/logs/transaction-log'
                        }
                    ]
                }]
            },
            {
                title: {
                    en_EN: 'Routing',
                    fr_FR: 'Routing'
                },
                path: '/routing',
                icon: '<svg width="24px" height="24px" viewBox="0 0 24 24"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="routing" fill="#CBCFDA" fill-rule="nonzero"> <path d="M5,7 C5.55228475,7 6,6.55228475 6,6 C6,5.44771525 5.55228475,5 5,5 C4.44771525,5 4,5.44771525 4,6 C4,6.55228475 4.44771525,7 5,7 Z M11.2495177,10.9784493 C11.3329971,10.9926231 11.4188247,11 11.5063976,11 L17.4936024,11 C18.3235372,11 19,10.3284271 19,9.5 C19,8.66579723 18.3255628,8 17.4936024,8 L11.5063976,8 C11.4185774,8 11.3324756,8.0075196 11.2487118,8.02194894 C11.2512615,8.014624 11.2538296,8.00730767 11.2564161,8 L10.498576,8 C9.67093534,8 9,7.33420277 9,6.5 C9,5.67157288 9.66502976,5 10.498576,5 L13.501424,5 C13.7635939,5 14.0100397,5.0668073 14.2244165,5.18461229 C14.6305929,5.0644848 15.0606932,5 15.5058597,5 L17.4941403,5 C19.9826579,5 22,7.01977567 22,9.5 C22,11.9852814 19.9824305,14 17.4941403,14 L15.5058597,14 C15.2883819,14 15.0745028,13.9845741' +
                ' 14.8652542,13.954763 C14.7470422,13.9843082 14.6231157,14 14.4952612,14 L13.1228999,14 L6.49710104,14 C5.67165598,14 5,14.6715729 5,15.5 C5,16.3342028 5.67027497,17 6.49710104,17 L12.7435839,17 C12.7413321,17.0063623 12.7390663,17.012718 12.7367866,17.0190671 C13.453009,17.1333827 14,17.7483248 14,18.5 C14,19.3284271 13.3316845,20 12.4952612,20 L7.99943956,20 L6.50585969,20 C4.0173421,20 2,17.9802243 2,15.5 C2,13.0147186 4.01756954,11 6.50585969,11 L8.49414031,11 C8.71161806,11 8.92549723,11.0154259 9.13474583,11.045237 C9.25295781,11.0156918 9.37688433,11 9.50473881,11 L11.2570992,11 C11.2545543,10.9928247 11.2520271,10.9856411 11.2495177,10.9784493 Z M5,9 C3.34314575,9 2,7.65685425 2,6 C2,4.34314575 3.34314575,3 5,3 C6.65685425,3 8,4.34314575 8,6 C8,7.65685425 6.65685425,9 5,9 Z M18,21 C16.3431458,21 15,19.6568542 15,18 C15,16.3431458 16.3431458,15 18,15 C19.6568542,15 21,16.3431458 21,18 C21,19.6568542 19.6568542,21 18,21 Z M18,19 C18.5522847,19 19,18.5522847 19,18 C19,17.4477153 18.5522847,17 18,17 C17.4477153,17 17,17.4477153 17,18 C17,18.5522847 17.4477153,19 18,19 Z"></path> </g> </g> </svg>',
                submenu: [{
                    items: [
                        {
                            title: {
                                en_EN: 'Workflows',
                                fr_FR: 'Workflows'
                            },
                            path: '/routing/workflows'
                        },
                        {
                            title: {
                                en_EN: 'Router',
                                fr_FR: 'Router'
                            },
                            path: '/routing/router'
                        },
                        {
                            title: {
                                en_EN: 'Velocity Limits',
                                fr_FR: 'Velocity Limits'
                            },
                            path: '/routing/velocity-limits'
                        },
                        {
                            title: {
                                en_EN: 'Schedule',
                                fr_FR: 'Schedule'
                            },
                            path: '/routing/schedule'
                        }
                    ]
                }]
            },
            {
                title: {
                    en_EN: 'Monitoring',
                    fr_FR: 'Monitoring'
                },
                mobileDisplaying: true,
                path: '/monitoring',
                icon: '<svg width="24px" height="24px" viewBox="0 0 24 24"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="monitoring" fill-rule="nonzero" fill="#CBCFDA"> <path d="M3.57670008,15.0553777 L6.40183912,10.5008511 C6.14627937,10.0593988 6,9.54678208 6,9 C6,7.34314575 7.34314575,6 9,6 C10.6568542,6 12,7.34314575 12,9 C12,9.56877973 11.8417139,10.1005898 11.5667883,10.5537835 L14.5948317,14.0271274 C14.7273386,14.0092382 14.8625905,14 15,14 C15.1939592,14 15.3836192,14.0184067 15.5673287,14.0535685 L18.6674005,7.88668464 C18.2500264,7.37130575 18,6.71485127 18,6 C18,4.34314575 19.3431458,3 21,3 C22.6568542,3 24,4.34314575 24,6 C24,7.52320273 22.8648064,8.78126678 21.3942903,8.97432089 L17.7488525,15.7965241 C17.9103688,16.1649175 18,16.5719915 18,17 C18,18.6568542 16.6568542,20 15,20 C13.3431458,20 12,18.6568542 12,17 C12,16.5796044 12.0864711,16.1794052 12.2425973,15.8162184 L8.93793874,12.103609 L5.85452678,17.0745084 C5.94896758,17.3660036 6,17.6770422 6,18 C6,19.6568542 4.65685425,21 3,21 C1.34314575,21 0,19.6568542 0,18 C0,16.3431458 1.34314575,15 3,15 C3.19725908,15 3.39007151,15.0190383 3.57670008,15.0553777 Z M21,7 C21.5522847,7 22,6.55228475 22,6 C22,5.44771525 21.5522847,5 21,5 C20.4477153,5 20,5.44771525 20,6 C20,6.55228475 20.4477153,7 21,7 Z M15,18 C15.5522847,18 16,17.5522847 16,17 C16,16.4477153 15.5522847,16 15,16 C14.4477153,16 14,16.4477153 14,17 C14,17.5522847 14.4477153,18 15,18 Z M9,10 C9.55228475,10 10,9.55228475 10,9 C10,8.44771525 9.55228475,8 9,8 C8.44771525,8 8,8.44771525 8,9 C8,9.55228475 8.44771525,10 9,10 Z M3,19 C3.55228475,19 4,18.5522847 4,18 C4,17.4477153 3.55228475,17 3,17 C2.44771525,17 2,17.4477153 2,18 C2,18.5522847 2.44771525,19 3,19 Z" id="Combined-Shape"></path> </g> </g> </svg>'
            },
            {
                title: {
                    en_EN: 'Settings',
                    fr_FR: 'Settings'
                },
                mobileDisplaying: true,
                path: '/settings',
                icon: '<svg width="24px" height="24px" viewBox="0 0 24 24" > <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="settings" fill-rule="nonzero" fill="#CBCFDA"> <path d="M22,13 C21.9749862,12.739357 22,12.3718808 22,12 C22,11.6269 21.9749862,11.2594239 22,11 L19,10 C19.0449875,9.37827156 18.8287124,8.8570642 19,8 L20,6 C19.3387032,5.17978567 18.8162055,4.65731983 18,4 L16,5 C15.1374442,5.168538 14.6149465,4.95353456 14,5 L13,2 C12.7400117,2.02375381 12.3725131,2 12,2 C11.6275262,2 11.2600276,2.02375381 11,2 L10,5 C9.37876068,4.95361321 8.85626299,5.16857733 8,5 L6,4 C5.18001884,4.65735916 4.65748182,5.17982499 4,6 L5,8 C5.16877049,8.85584505 4.95375394,9.37831088 5,10 L2,11 C2.02375526,11.2594239 2,11.6269 2,12 C2,12.3718415 2.02375526,12.7393177 2,13 L5,14 C4.9550125,14.62047 5.16873116,15.1404188 5,16 L4,18 C4.65874038,18.8189559 5.18123807,19.3426802 6,20 L8,19 C8.85748222,18.8302035 9.3799799,19.045207 10,19 L11,22C11.2599883,21.9749877 11.6274869,22 12,22 C12.3725525,22 12.7400117,21.9749877 13,22 L14,19 C14.6212787,19.0439092 15.1412592,18.8302035 16,19 L18,20 C18.8200205,19.3401632 19.3437767,18.8176974 20,18 L19,16 C18.8312688,15.1379019 19.0462854,14.615436 19,14 L22,13 Z M12.0000098,16.999705 C9.23874624,16.9991151 7.00000983,14.7605152 7.00000983,11.999705 C7.00000983,9.23830498 9.23874624,6.99970504 12.0000098,6.99970504 C14.7612931,6.99970504 17.0000295,9.23830498 17.0000098,11.999705 C17.0000295,14.7605152 14.7612538,16.9991151 12.0000098,16.999705 Z M12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 Z" id="Settings"></path> </g> </g> </svg>',
                submenu: [
                    {
                        groupTitle: {
                            en_EN: 'RIPPS Users',
                            fr_FR: 'RIPPS Users'
                        },
                        items: [
                            {
                                title: {
                                    en_EN: 'Users',
                                    fr_FR: 'Users'
                                },
                                path: '/settings/users'
                            },
                            {
                                title: {
                                    en_EN: 'User Roles',
                                    fr_FR: 'User Roles'
                                },
                                path: '/settings/user-roles'
                            }
                        ]
                    },
                    {
                        groupTitle: {
                            en_EN: 'Institution Parameters',
                            fr_FR: 'Institution Parameters'
                        },
                        items: [
                            {
                                title: {
                                    en_EN: 'Countries',
                                    fr_FR: 'Countries'
                                },
                                path: '/settings/countries'
                            },
                            {
                                title: {
                                    en_EN: 'Country States',
                                    fr_FR: 'Country States'
                                },
                                path: '/settings/country-states'
                            },
                            {
                                title: {
                                    en_EN: 'Currencies',
                                    fr_FR: 'Currencies'
                                },
                                path: '/settings/currencies'
                            },
                            {
                                title: {
                                    en_EN: 'Device Types',
                                    fr_FR: 'Device Types'
                                },
                                path: '/settings/device-types'
                            }
                        ]
                    },
                    {
                        groupTitle: {
                            en_EN: 'Other',
                            fr_FR: 'Other'
                        },
                        items: [
                            {
                                title: {
                                    en_EN: 'Viewing Settings',
                                    fr_FR: 'Viewing Settings'
                                },
                                path: '/settings/viewing-settings'
                            }
                        ]
                    }
                ]
            }
        ],
        profile: {
            path: '/profile',
            icon: '<svg width="24px" height="24px" viewBox="0 0 24 24"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="user" fill="#CBCFDA"> <path d="M7.18630005,12.0821764 C5.36735093,12.456869 4,14.0685723 4,16 L4,18.0018986 C4,19.1132936 4.8927712,20 5.99406028,20 L18.0059397,20 C19.1054862,20 20,19.1054196 20,18.0018986 L20,16 C20,14.072473 18.6323547,12.4578079 16.8135214,12.0823456 C15.5589631,13.2709472 13.8646212,14 12,14 C10.1352903,14 8.44087622,13.270878 7.18630005,12.0821764 Z M12,12 C14.209139,12 16,10.209139 16,8 C16,5.790861 14.209139,4 12,4 C9.790861,4 8,5.790861 8,8 C8,10.209139 9.790861,12 12,12 Z"> </path> </g> </g> </svg>'
        }
    },
};

