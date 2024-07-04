export const adminMenu = [
    {
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.manage-admin",
                link: "/system/admin-manage",
            },
            {
                name: "menu.admin.manage-staff",
                link: "/system/staff-manage",
            },
            {
                name: "menu.admin.manage-customer",
                link: "/system/customer-manage",
            },
        ],
    },
    {
        
        name: "menu.admin.product",
        menus: [
            {
                name: "menu.admin.manage-category-phone",
                link: "/system/manage-category-phone",
            },
            {
                name: "menu.admin.manage-category-tablet",
                link: "/system/manage-category-tablet",
            },
            {
                name: "menu.admin.manage-category-laptop",
                link: "/system/manage-category-laptop",
            },
            {
                name: "menu.admin.manage-category-accessory",
                subMenus: [
                    { name: "menu.admin.manage-category-smartwatch", link: "/system/manage-category-smartwatch" },
                    { name: "menu.admin.manage-category-bluetooth", link: "/system/manage-category-bluetooth" },
                    { name: "menu.admin.manage-category-keyboard", link: "/system/manage-category-keyboard" },
                    { name: "menu.admin.manage-category-mouse", link: "/system/manage-category-mouse" },
                    { name: "menu.admin.manage-category-screen", link: "/system/manage-category-screen" },
                ],
            },
        ],
    },
    {
        
        name: "menu.admin.order",
        menus: [
            {
                name: "menu.admin.manage-order",
                link: "/system/manage-order",
            },
        ],
    },
];
