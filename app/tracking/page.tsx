import AuthLayout from "../components/AuthLayout/AuthLayout";
import TrackingPage from "./TrackingPage";

export default async function Page() {
    return (
        <AuthLayout>
            <TrackingPage />
        </AuthLayout>
    );
}
