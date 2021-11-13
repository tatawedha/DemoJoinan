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
              name: "Data Master",
              icon: "cil-layers",
              items: [
                {
                  _name: "CSidebarNavItem",
                  name: "Pasien",
                  to: "/pasien",
                  icon: "cil-layers"
                },
                {
                  _name: "CSidebarNavItem",
                  name: "Dokter",
                  to: "/dokter",
                  icon: "cil-layers"
                }
              ]
            },
            {
              _name: "CSidebarNavItem",
              name: "Jadwal",
              to: "/jadwal",
              icon: "cil-layers"
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
