import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    
    route('signin/*', 'routes/signin.tsx'),
    route('signup/*', 'routes/signup.tsx'),
    route('dashboard/*', 'routes/dashboard.tsx'),
    ...prefix("trips", [
        index("./trips/trips.tsx"),
        route(":trip", "./trips/trip.tsx"),
        route('new_trip', 'trips/new_trip.tsx'),
    ]),
] satisfies RouteConfig;
