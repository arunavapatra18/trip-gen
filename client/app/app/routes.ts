import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    
    route('signin/*', 'routes/signin.tsx'),
    route('signup/*', 'routes/signup.tsx'),
    route('dashboard/*', 'routes/dashboard.tsx'),
] satisfies RouteConfig;
