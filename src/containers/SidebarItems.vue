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
                  name: "USERS",
                  to: "/Users",
                  icon: "cil-user"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "TAGS",
                  to: "/tags",
                  icon: "cil-tags"
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
                  icon: "cil-notes"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "New",
                  to: "/new",
                  icon: "cil-list-rich"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "Popular",
                  to: "/tags",
                  icon: "cil-star"
                }
              ]
            },
            {
              _name: "CSidebarNavItem",
              name: "LOG",
              to: "/log",
              icon: "cil-applications-settings"
            },
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
