<script>
export default {
  name: "nav",
  computed: {
    sidebarItems() {
      return [
        {
          _name: "CSidebarNav",
          _children: [
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.dashboard"),
              to: "/dashboard",
              icon: "cil-speedometer"
            },
            {
              _name: "CSidebarNavDivider"
            },
            {
              _name: "CSidebarNavDropdown",
              name: "DATA MASTER",
              icon: "cil-layers",
              items: [
                {
                  _name: "CSidebarNavItem",
                  name: "Users",
                  to: "/Users",
                  icon: "cil-layers"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "Tags",
                  to: "/tags",
                  icon: "cil-layers"
                }
              ]
            },
            {
              _name: "CSidebarNavDropdown",
              name: "CONTENT",
              icon: "cil-layers",
              items: [
                {
                  _name: "CSidebarNavItem",
                  name: "Create",
                  to: "/Create",
                  icon: "cil-layers"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "New",
                  to: "/tags",
                  icon: "cil-layers"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "Popular",
                  to: "/tags",
                  icon: "cil-layers"
                }
              ]
            },
            // {
            //   _name: "CSidebarNavItem",
            //   name: "Jadwal",
            //   to: "/jadwal",
            //   icon: "cil-layers"
            // },
            {
              _name: "CSidebarNavDivider"
            },
            {
              _name: "CSidebarNavItem",
              name: "Logout",
              to: "/logout",
              icon: "cil-warning"
            }
          ]
        }
      ];
    }
  }
};
</script>
