"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const Home_vue_1 = require("../views/Home.vue");
vue_1.default.use(vue_router_1.default);
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home_vue_1.default
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => Promise.resolve().then(() => require(/* webpackChunkName: "about" */ "../views/About.vue"))
    }
];
const router = new vue_router_1.default({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFzQjtBQUN0QiwyQ0FBb0Q7QUFDcEQsZ0RBQXFDO0FBRXJDLGFBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQVMsQ0FBQyxDQUFDO0FBRW5CLE1BQU0sTUFBTSxHQUF1QjtJQUNqQztRQUNFLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsa0JBQUk7S0FDaEI7SUFDRDtRQUNFLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLE9BQU87UUFDYiw2QkFBNkI7UUFDN0IsbUVBQW1FO1FBQ25FLGtEQUFrRDtRQUNsRCxTQUFTLEVBQUUsR0FBRyxFQUFFLHNDQUNQLCtCQUErQixDQUFDLG9CQUFvQixFQUFDO0tBQy9EO0NBQ0YsQ0FBQztBQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksb0JBQVMsQ0FBQztJQUMzQixJQUFJLEVBQUUsU0FBUztJQUNmLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7SUFDMUIsTUFBTTtDQUNQLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZVJvdXRlciwgeyBSb3V0ZUNvbmZpZyB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgSG9tZSBmcm9tIFwiLi4vdmlld3MvSG9tZS52dWVcIjtcblxuVnVlLnVzZShWdWVSb3V0ZXIpO1xuXG5jb25zdCByb3V0ZXM6IEFycmF5PFJvdXRlQ29uZmlnPiA9IFtcbiAge1xuICAgIHBhdGg6IFwiL1wiLFxuICAgIG5hbWU6IFwiSG9tZVwiLFxuICAgIGNvbXBvbmVudDogSG9tZVxuICB9LFxuICB7XG4gICAgcGF0aDogXCIvYWJvdXRcIixcbiAgICBuYW1lOiBcIkFib3V0XCIsXG4gICAgLy8gcm91dGUgbGV2ZWwgY29kZS1zcGxpdHRpbmdcbiAgICAvLyB0aGlzIGdlbmVyYXRlcyBhIHNlcGFyYXRlIGNodW5rIChhYm91dC5baGFzaF0uanMpIGZvciB0aGlzIHJvdXRlXG4gICAgLy8gd2hpY2ggaXMgbGF6eS1sb2FkZWQgd2hlbiB0aGUgcm91dGUgaXMgdmlzaXRlZC5cbiAgICBjb21wb25lbnQ6ICgpID0+XG4gICAgICBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJhYm91dFwiICovIFwiLi4vdmlld3MvQWJvdXQudnVlXCIpXG4gIH1cbl07XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBWdWVSb3V0ZXIoe1xuICBtb2RlOiBcImhpc3RvcnlcIixcbiAgYmFzZTogcHJvY2Vzcy5lbnYuQkFTRV9VUkwsXG4gIHJvdXRlc1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==